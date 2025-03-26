import fs from 'fs';
import path from 'path';

const changes = {
  // 1. Service d'email
  'services/email_service.js': `import axios from 'axios';

const MAILER_SERVICE_URL = process.env.MAILER_SERVICE_URL || 'http://localhost:3000';

export const sendResetPasswordEmail = async (email, resetUrl) => {
  const mailOptions = {
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: \`
      <h1>Réinitialisation de votre mot de passe</h1>
      <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
      <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      <a href="\${resetUrl}">\${resetUrl}</a>
      <p>Ce lien expirera dans 1 heure.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
    \`
  };

  try {
    await axios.post(\`\${MAILER_SERVICE_URL}/send-email\`, mailOptions);
  } catch (error) {
    console.error('Erreur lors de l\\'envoi de l\\'email:', error);
    throw new Error('Erreur lors de l\\'envoi de l\\'email');
  }
};`,

  // 2. Modifications du contrôleur d'authentification
  'controllers/auth_controller.js': {
    imports: `import { findUserByEmail, createUser, updateUser } from "../models/user_model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../services/email_service.js";`,
    newFunctions: `
export const forgotPassword = async (req, reply) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return reply.status(404).send({ error: "Utilisateur non trouvé" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

    await updateUser(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpiry,
    });

    const resetUrl = \`\${process.env.FRONTEND_URL}/reset-password/\${resetToken}\`;
    await sendResetPasswordEmail(user.email, resetUrl);

    return reply.send({ message: "Email de réinitialisation envoyé" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return reply.status(500).send({ error: "Erreur serveur interne" });
  }
};

export const resetPassword = async (req, reply) => {
  const { token, newPassword } = req.body;
  try {
    const user = await models.User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (!user) {
      return reply.status(400).send({ error: "Token invalide ou expiré" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUser(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return reply.send({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error("Reset password error:", error);
    return reply.status(500).send({ error: "Erreur serveur interne" });
  }
};`
  },

  // 3. Migration pour ajouter les champs de réinitialisation
  'migrations/add_reset_password_fields.js': `'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "resetPasswordToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "resetPasswordExpires", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "resetPasswordToken");
    await queryInterface.removeColumn("users", "resetPasswordExpires");
  },
};`,

  // 4. Variables d'environnement à ajouter
  'env_variables': `
# Configuration du service d'email
MAILER_SERVICE_URL=http://localhost:3000
FRONTEND_URL=http://votre-frontend-url
`,

  // 5. Dépendances à installer
  'dependencies': `
npm install axios
`,

  // 6. Routes à ajouter
  'routes/auth_routes.js': {
    imports: `import { login, register, forgotPassword, resetPassword } from "../controllers/auth_controller.js";`,
    routes: `
  fastify.post("/forgot-password", forgotPassword);
  fastify.post("/reset-password", resetPassword);`
  }
};

// Fonction pour créer ou mettre à jour un fichier
function updateFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

// Fonction pour mettre à jour les routes
function updateRoutes() {
  const routesPath = 'routes/auth_routes.js';
  let routesContent = fs.readFileSync(routesPath, 'utf8');
  
  // Mettre à jour les imports
  routesContent = routesContent.replace(
    /import {.*} from/,
    changes['routes/auth_routes.js'].imports
  );
  
  // Ajouter les nouvelles routes
  if (!routesContent.includes('/forgot-password')) {
    const insertPosition = routesContent.indexOf('fastify.post("/register"');
    routesContent = routesContent.slice(0, insertPosition) + 
                   changes['routes/auth_routes.js'].routes +
                   routesContent.slice(insertPosition);
  }
  
  fs.writeFileSync(routesPath, routesContent);
}

// Fonction pour mettre à jour le contrôleur
function updateController() {
  const controllerPath = 'controllers/auth_controller.js';
  let controllerContent = fs.readFileSync(controllerPath, 'utf8');
  
  // Mettre à jour les imports
  controllerContent = controllerContent.replace(
    /import {.*} from/,
    changes['controllers/auth_controller.js'].imports
  );
  
  // Ajouter les nouvelles fonctions
  if (!controllerContent.includes('forgotPassword')) {
    controllerContent += changes['controllers/auth_controller.js'].newFunctions;
  }
  
  fs.writeFileSync(controllerPath, controllerContent);
}

// Exécuter les modifications
console.log('Début de l\'implémentation de la fonctionnalité de mot de passe oublié...');

// 1. Créer le service d'email
updateFile('services/email_service.js', changes['services/email_service.js']);

// 2. Mettre à jour le contrôleur
updateController();

// 3. Créer la migration
updateFile('migrations/add_reset_password_fields.js', changes['migrations/add_reset_password_fields.js']);

// 4. Mettre à jour les routes
updateRoutes();

console.log(`
Implémentation terminée ! Voici les étapes suivantes :

1. Ajouter les variables d'environnement suivantes dans votre fichier .env :
${changes['env_variables']}

2. Installer les dépendances :
${changes['dependencies']}

3. Exécuter la migration :
npx sequelize-cli db:migrate

4. Redémarrer le serveur

Les nouvelles routes disponibles sont :
- POST /api/auth/forgot-password : Pour demander une réinitialisation
- POST /api/auth/reset-password : Pour définir un nouveau mot de passe

Note : Assurez-vous que le service mailer est en cours d'exécution sur le port 3000.
`); 