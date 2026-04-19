import { spawn } from "child_process";

const args  = process.argv.slice(2);
const get   = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };

const map      = get("--map");
const bookings = get("--bookings");

const backendArgs = [
  "run", "dev", "--prefix", "backend",
  ...(map      ? ["--", "--map",      map]      : []),
  ...(bookings ? ["--", "--bookings", bookings] : []),
];

const backend  = spawn("npm", backendArgs,                          { stdio: "inherit", shell: true });
const frontend = spawn("npm", ["run", "dev", "--prefix", "frontend"], { stdio: "inherit", shell: true });

const cleanup = () => { backend.kill(); frontend.kill(); };
process.on("SIGINT",  cleanup);
process.on("SIGTERM", cleanup);