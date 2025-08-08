import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

// Function to start the server
const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("✅ Database connected successfully!");

    // Starting the server
    server = app.listen(5000, () => {
      console.log(`✅ Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    // Logging errors if there's an issue with database connection or server startup
    console.error("❌ Error while connecting to DB or starting server:", error);
  }
};

// Call the function to start the server
startServer();

// Handling SIGTERM signal (usually for server shutdown during deployment)
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... Server shutting down...");

  if (server) {
    // Closing the server and exiting the process
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handling SIGINT signal (Ctrl+C pressed)
process.on("SIGINT", () => {
  console.log("SIGINT signal received... Server shutting down...");

  if (server) {
    // Closing the server and exiting the process
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handling unhandled promise rejections
process.on("unhandledRejection", err => {
  console.log("Unhandled Rejection detected... Server shutting down...", err);

  if (server) {
    // Closing the server and exiting the process
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handling uncaught exceptions
process.on("uncaughtException", err => {
  console.log("Uncaught Exception detected... Server shutting down...", err);

  if (server) {
    // Closing the server and exiting the process
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Example of intentional error for demonstration
// Promise.reject(new Error("I forgot to catch this promise"));
// throw new Error("I forgot to handle this local error");
// startServer();
