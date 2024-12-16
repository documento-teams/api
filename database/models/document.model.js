import { DataTypes } from "sequelize";
import { sequelize } from "../sequelizeConnection.js";
import User from "./user.model.js";

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
  doc_author: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

export default Document;
