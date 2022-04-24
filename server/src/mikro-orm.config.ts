import { Player } from "./entities/Player";
import { Team } from "./entities/Team";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Player, Team],
  type: "postgresql",
  debug: !__prod__,
  clientUrl: process.env.DATABASE_URL,
} as Parameters<typeof MikroORM.init>[0];
