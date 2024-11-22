import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Ensure the path is correct

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// Add the `getUserByIdModel` function
export const getUserByIdModel = async (id) => {
  return await User.findByPk(id);
};

export default User;
