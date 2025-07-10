import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

// ✅ সার্ভার শুরু করার জন্য ফাংশন
const startServer = async () => {
  try {
    console.log("✅ Database connected successfully!");

    // ✅ সার্ভার শুরু করা হচ্ছে
    server = app.listen(5000, () => {
      console.log(`✅ Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    // ❌ ডাটাবেস সংযোগ বা সার্ভার শুরুতে কোনো ত্রুটি হলে লগ করবে
    console.error("❌ Error while connecting to DB or starting server:", error);
  }
};

// ✅ ফাংশন কল করে সার্ভার চালু করা
startServer();

// ✅ SIGTERM সিগনাল হ্যান্ডল করা (সাধারণত ডিপ্লয়মেন্টে সার্ভার বন্ধের জন্য)
process.on("SIGTERM", () => {
  console.log("SIGTERM signal recived...... Server shutting down,,,,,");

  if (server) {
    // ✅ সার্ভার বন্ধ করে প্রক্রিয়া থেকে বের হওয়া
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// ✅ SIGINT সিগনাল হ্যান্ডল করা (Ctrl+C চাপলে কাজ করে)
process.on("SIGINT", () => {
  console.log("SIGINT signal recived...... Server shutting down,,,,,");

  if (server) {
    // ✅ সার্ভার বন্ধ করে প্রক্রিয়া থেকে বের হওয়া
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// ✅ কোনো প্রমিস ভুলে ক্যাচ না করলে (Unhandled Promise Rejection) হ্যান্ডল করা
process.on("unhandledRejection", err => {
  console.log(
    "unhandled Rejection detected...... Server shutting down,,,,,",
    err
  );

  if (server) {
    // ✅ সার্ভার বন্ধ করে প্রক্রিয়া থেকে বের হওয়া
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// ✅ কোনো কোডে ভুল (Uncaught Exception) হলে হ্যান্ডল করা
process.on("uncaughtException", err => {
  console.log(
    "uncaught Exception detected...... Server shutting down,,,,,",
    err
  );

  if (server) {
    // ✅ সার্ভার বন্ধ করে প্রক্রিয়া থেকে বের হওয়া
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// ✅ উদাহরণস্বরূপ ইচ্ছাকৃত ত্রুটি:
// Promise.reject(new Error("I forgot to catch this promise"));
// throw new Error("I forgot to handle this local error");
