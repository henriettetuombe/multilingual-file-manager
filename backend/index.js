import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { expressjwt } from "express-jwt";

// Routes
import userRoutes from "./routes/users.js";
import fileRoutes from "./routes/files.js";
import authRoutes from "./routes/user-auth.js";

// Models (for user fetching middleware)
import { getUserByIdModel } from "./models/users.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
app.use(
  expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
  }).unless({ path: [/^\/auth/, "/"] }) // Exclude auth routes and the home route
);

// Attach user to request (middleware)
app.use(async (req, res, next) => {
  if (req.auth?.id) {
    try {
      const user = await getUserByIdModel(req.auth.id);
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user; // Attach user to the request
    } catch (error) {
      console.error(error);
      return next(new Error("Authentication failed"));
    }
  }
  next();
});

// Routes
app.use("/users", userRoutes); // User management routes
app.use("/files", fileRoutes); // File management routes
app.use("/auth", authRoutes); // Authentication routes

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to our multilingual file manager platform!");
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
