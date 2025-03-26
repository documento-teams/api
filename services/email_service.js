import axios from 'axios';

const MAILER_SERVICE_URL = process.env.MAILER_SERVICE_URL || 'http://localhost:3000';

export const sendResetPasswordEmail = async (email, resetUrl) => {
  const mailOptions = {
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <h1>Réinitialisation de votre mot de passe</h1>
      <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
      <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Ce lien expirera dans 1 heure.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
    `
  };

  try {
    await axios.post(`${MAILER_SERVICE_URL}/send-email`, mailOptions);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
}; 