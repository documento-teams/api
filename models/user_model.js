import { models } from "../database/models/index.js";

export const getUsersList = async () => {
  const users = await models.User.findAll({
    attributes: ["id", "email", "fullname"],
  });
  return users;
};

export const findUserByEmail = async (email) => {
  const user = await models.User.findOne({
    where: {
      email,
    },
  });
  return user;
};

export const findUserById = async (id) => {
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
      attributes: ["id", "email", "fullname"],
    });
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (user) => {
  try {
    const newUser = await models.User.create(user);
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedUser = await models.User.destroy({
      where: {
        id,
      },
      returning: true,
    });
    return deletedUser;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const updatedUser = await models.User.update(user, {
      where: {
        id,
      },
      returning: true,
    });
    return updatedUser;
  } catch (error) {
    console.error(error);
  }
};
