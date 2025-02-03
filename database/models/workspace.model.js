import { DataTypes } from "@sequelize/core";
import { sequelize } from "../sequelizeConnection.js";

const Workspace = sequelize.define("workspace", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workspaceAuthor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  docId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "document",
      key: "id",
    },
  },
  parentWorkspace: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "workspace",
      key: "id",
    },
  },
});

export default Workspace;