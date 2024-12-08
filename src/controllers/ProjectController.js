import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ProjectController {
  static async getAllProjects(req, res) {
    try {
      const { title } = req.query;

      const filters = {};
      if (title) {
        filters.title = { contains: title, mode: "insensitive" };
      }

      const projects = await prisma.projects.findMany({
        where: Object.keys(filters || {}).length > 0 ? filters : undefined,
        include: {
          tasks: {
            select: {
              id: true,
              title: true,
              users: {
                select: { id: true, name: true },
              },
            },
          },
        },
      });

      res.status(200).json({ message: "success", data: projects });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProjectById(req, res) {
    try {
      const { id } = req.params;
      const project = await prisma.projects.findUnique({
        where: { id },
        include: {
          tasks: {
            include: {
              users: {
                select: { id: true, name: true, email: true },
              },
            },
          },
        },
      });
      res.status(200).json({ message: "success", data: project });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createProject(req, res) {
    try {
      const { title, description } = req.body;
      const project = await prisma.projects.create({
        data: {
          title,
          description,
        },
      });
      res.status(201).json({ message: "success", data: project });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateProject(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const project = await prisma.projects.update({
        where: { id },
        data: {
          title,
          description,
        },
      });
      res.status(200).json({ message: "success", data: project });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const project = await prisma.projects.delete({ where: { id } });
      res.status(200).json({ message: "success", data: project });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
