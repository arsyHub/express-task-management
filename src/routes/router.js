import express from "express";

const router = express.Router();

//task
router.get("/", (req, res) => {
  res.send("Welcome to task manager by @arsyHub 2024asdfsad");
});
router.get("/boards", (req, res) => {
  const boards = [
    {
      id: "1e5f1d4c-45b3-4f4e-8354-d6c8b0705a9b",
      name: "Project A",
      user_id: "12345678-1234-5678-1234-567812345678",
      created_at: "2024-12-02T08:00:00.000Z",
    },
    {
      id: "2a7f3b8d-56c4-4e9d-9a6f-98e7b0705b9a",
      name: "Team Tasks",
      user_id: "12345678-1234-5678-1234-567812345678",
      created_at: "2024-12-01T12:30:00.000Z",
    },
    {
      id: "3c8f4d9e-67d5-4f5f-8b7f-19d8c0705c8c",
      name: "Personal Goals",
      user_id: "12345678-1234-5678-1234-567812345678",
      created_at: "2024-11-25T10:15:00.000Z",
    },
    {
      id: "3c8f4d9e-67d5-4f5f-8b7f-19d8c0705cgc",
      name: "Test CI/CD lagi",
      user_id: "12345678-1234-5678-1234-567812345678",
      created_at: "2024-11-25T10:15:00.000Z",
    },
  ];

  res.status(200).json({ message: "Get all boards.", data: boards });
});

export default router;
