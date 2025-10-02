import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
    server:{
        DATABASE_URL: z.url(),
        DATABASE_TOKEN: z.jwt(),
    },
    runtimeEnv:{
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_TOKEN: process.env.DATABASE_TOKEN,
    }
});