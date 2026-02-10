import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // CLI commands like 'migrate' MUST use the Session Mode string (Port 5432)
    // This string is IPv4-compatible by default.
    url: env("DIRECT_URL"), 
  },
});
