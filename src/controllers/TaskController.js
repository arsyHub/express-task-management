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
        const userIds = user_id.split(",").map((id) => id.trim());
        filters.users = {
          some: {
            id: { in: userIds }, // Filter dengan user_id yang ada di array userIds
          },
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
      const { title, description, status, tag, order, due_date, user_ids } =
        req.body;

      // Siapkan objek data untuk pembaruan
      const data = {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(tag && { tag }),
        ...(order && { order }),
        ...(due_date && {
          due_date: new Date(`${due_date}T00:00:00Z`).toISOString(),
        }),
        ...(user_ids && {
          users: { set: user_ids.map((userId) => ({ id: userId })) },
        }),
      };

      // Hanya lakukan pembaruan jika ada data untuk diperbarui
      if (Object.keys(data).length) {
        await prisma.tasks.update({
          where: { id },
          data,
        });
      }

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
