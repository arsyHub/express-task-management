import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default class TaskController {
  static async getAllTasks(req, res) {
    try {
      const { title, tag, status, due_date, user_id, project_id } = req.query;

      const filters = {};
      if (title) {
        filters.title = { contains: title, mode: "insensitive" };
      }
      if (tag) {
        filters.tag = { contains: tag, mode: "insensitive" };
      }
      if (status) {
        filters.status = { equals: status };
      }
      if (due_date) {
        const isValidDate = new Date(due_date).toString() !== "Invalid Date";
        if (!isValidDate) {
          throw new Error("Invalid due_date format. Please use YYYY-MM-DD.");
        }
        filters.due_date = { equals: new Date(due_date) };
      }
      if (user_id) {
        filters.users = {
          some: { id: user_id }, // Filter berdasarkan user_id yang terhubung
        };
      }
      if (project_id) {
        filters.project_id = { equals: project_id };
      }

      // Query ke database dengan filter dinamis
      const tasks = await prisma.tasks.findMany({
        where: Object.keys(filters).length ? filters : undefined,
        include: {
          users: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          }, // Preload data users yang terhubung
        },
      });

      res.status(200).json({ message: "success", data: tasks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await prisma.tasks.findUnique({
        where: { id },
        include: { users: { select: { id: true, name: true, email: true } } },
      });
      res.status(200).json({ message: "success", data: task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createTask(req, res) {
    try {
      const {
        project_id,
        title,
        description,
        status,
        tag,
        order,
        due_date,
        user_ids = [],
      } = req.body;

      const dueDate = due_date
        ? new Date(`${req.body.due_date}T00:00:00Z`).toISOString()
        : null;

      const task = await prisma.tasks.create({
        data: {
          project_id,
          title,
          description,
          status,
          tag,
          order,
          due_date: dueDate,
          users: {
            connect: user_ids.map((id) => ({ id })), // Menghubungkan task dengan user_ids
          },
        },
        include: {
          users: true,
        },
      });

      res.status(201).json({ message: "success", data: task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateTask(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        status,
        tag,
        order,
        due_date,
        user_ids = [],
      } = req.body;

      const dueDate = due_date
        ? new Date(`${req.body.due_date}T00:00:00Z`).toISOString()
        : null;

      await prisma.tasks.update({
        where: { id },
        data: {
          title,
          description,
          status,
          tag,
          order,
          due_date: dueDate,
          //**note: jika ada 2 user, dan payload hanya mengirim 1 user maka user lama tidak akan hilang */
          //   users: {
          //     connect: user_ids.map((userId) => ({ id: userId })), // Hubungkan user_ids ke task
          //   },
          //**note: jika ada 2 user, dan payload mengirim 1 user maka user lama akan hilang */
          users: {
            set: user_ids.map((userId) => ({ id: userId })), // Mengganti relasi dengan user_ids baru
          },
        },
      });

      const taskWithUsers = await prisma.tasks.findUnique({
        where: { id },
        include: {
          users: true, // Sertakan relasi users
        },
      });

      res.status(200).json({ message: "success", data: taskWithUsers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("param id is required");
      }
      const task = await prisma.tasks.delete({ where: { id } });
      res.status(200).json({ message: "success", data: task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
