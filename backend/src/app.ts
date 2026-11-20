import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import submissionRoutes, { adminRouter } from "./routes/submissions.js";
import { allowedOrigins } from "./lib/auth.js";

export function createApp() {
  const app = express();
  app.set("trust proxy", 1); // we sit behind the frontend's proxy / a hosting load balancer
  app.disable("x-powered-by");

  app.use(helmet());
  app.use(cors({ origin: allowedOrigins(), credentials: true }));
  app.use(express.json({ limit: "10kb" }));
  app.use(cookieParser());

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api/auth", authRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/submissions", submissionRoutes);
  app.use("/api/admin", adminRouter);

  app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Something went wrong on our side. Please try again." });
  });

  return app;
}
