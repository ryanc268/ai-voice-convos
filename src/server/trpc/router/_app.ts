import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { audioRouter } from "./audioRouter";

export const appRouter = router({
  example: exampleRouter,
  audio: audioRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
