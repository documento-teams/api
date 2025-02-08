import { DataTypes } from "@sequelize/core";
import { sequelize } from "../sequelizeConnection.js";

const Document = sequelize.define("document", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "workspace",
      key: "id"
    }
  }
}, {
  timestamps: true,
});

export default Document;