import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default class UserController {
  static async getAllUsers(req, res) {
    try {
      const { name, email } = req.query;

      const filters = {};
      if (name) {
        filters.name = { contains: name, mode: "insensitive" };
      }
      if (email) {
        filters.email = { contains: email, mode: "insensitive" };
      }

      // Satu kali pemanggilan database dengan kondisi dinamis
      const users = await prisma.users.findMany({
        where: Object.keys(filters).length ? filters : undefined,
      });

      res.status(200).json({ message: "success", data: users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.users.findUnique({ where: { id } });
      res.status(200).json({ message: "success", data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, email } = req.body;

      const user = await prisma.users.create({
        data: {
          name,
          email,
        },
      });
      res.status(201).json({ message: "success", data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await prisma.users.update({
        where: { id },
        data: {
          name,
          email,
        },
      });
      res.status(200).json({ message: "success", data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const userExists = await prisma.users.findUnique({ where: { id } });
      if (!userExists) {
        throw new Error("user not found", 404);
      }

      const user = await prisma.users.delete({
        where: { id },
      });
      res.status(200).json({ message: "success", data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
