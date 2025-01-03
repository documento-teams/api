import { DataTypes } from "sequelize";
import { sequelize } from "../sequelizeConnection.js";
import User from "./user.model.js";
import Document from "./document.model.js";

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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  workspace_owner: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  documents: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    references: {
      model: Document,
      key: "id",
    },
  },
  parent_workspace: {
    type: DataTypes.INTEGER,
    references: {
      model: Workspace,
      key: "id",
    },
  },
});

export default Workspace;