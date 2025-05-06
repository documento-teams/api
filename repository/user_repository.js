import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsersList = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullname: true
      }
    });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email
      },
      orderBy: {
        id: 'asc'
      }
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        fullname: true
      }
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const newUser = await prisma.user.create({
      data: user
    });
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedUser = await prisma.user.deleteMany({
      where: {
        id
      }
    });
    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: user,
      select: {
        id: true,
        email: true,
        fullname: true
      }
    });
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};