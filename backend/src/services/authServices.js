import prisma from '../utils/prisma.js';
import bcrypt from 'bcryptjs';

export const register = async ({ name, email, password }) => {
  try {
    const existing = await prisma.agent.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: { message: 'Agent already exists', statusCode: 400 } };
    }

    const hashed = await bcrypt.hash(password, 10);
    const agent = await prisma.agent.create({
      data: {
        name,
        email,
        password: hashed,
        recordOrigin: 'manual',
      }
    });

    return { success: true, data: agent };
  } catch (error) {
    return { success: false, error };
  }
};

export const login = async ({ email, password }) => {
  try {
    const agent = await prisma.agent.findUnique({ where: { email } });

    if (!agent) {
      return { success: false, error: { message: 'Invalid email', statusCode: 401 } };
    }

    const match = await bcrypt.compare(password, agent.password);
    if (!match) {
      return { success: false, error: { message: 'Incorrect password', statusCode: 401 } };
    }

    return { success: true, data: agent };
  } catch (error) {
    return { success: false, error };
  }
};


