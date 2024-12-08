import { ZodError } from "zod";

const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      }));
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }
    next(err);
  }
};

export default validateRequest;
