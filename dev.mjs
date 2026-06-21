// One command to run the whole site in development: `npm run dev`
// Starts the BACKEND (port 4000) and the FRONTEND (port 5173) together,
// installs their packages on first run, and shuts both down on Ctrl+C.
// Zero external dependencies — just Node.js.

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isWin = process.platform === 'win32';
const npm = isWin ? 'npm.cmd' : 'npm';
const C = { blue: '\x1b[36m', green: '\x1b[32m', dim: '\x1b[2m', reset: '\x1b[0m' };

const backendDir = path.join(__dirname, 'backend');
const frontendDir = path.join(__dirname, 'frontend');

// Returns true only if the folder's packages look fully installed.
// (A bare node_modules folder from an interrupted install is NOT enough — we
// check that the key packages actually resolved.)
function isInstalled(dir, mustHave) {
  if (!existsSync(path.join(dir, 'node_modules'))) return false;
  return mustHave.every((pkg) => existsSync(path.join(dir, 'node_modules', pkg)));
}

// Install a folder's packages if they're missing or only partially installed.
function installSync(dir, label, mustHave) {
  if (isInstalled(dir, mustHave)) return;
  console.log(`${C.dim}[setup] Installing ${label} packages (first run or repairing a partial install)…${C.reset}`);
  const r = spawnSync(`${npm} install`, { cwd: dir, stdio: 'inherit', shell: true });
  if (r.status !== 0) {
    console.error(`[setup] Could not install ${label} packages.`);
    process.exit(1);
  }
}

installSync(backendDir, 'backend', ['express', 'better-sqlite3', 'unpipe']);
installSync(frontendDir, 'frontend', ['vite', 'react']);

// Ensure the backend has a .env file.
const envFile = path.join(backendDir, '.env');
if (!existsSync(envFile) && existsSync(path.join(backendDir, '.env.example'))) {
  copyFileSync(path.join(backendDir, '.env.example'), envFile);
}

console.log(`\n${C.green}Starting Canal School…${C.reset}`);
console.log(`${C.blue}  Backend → http://localhost:4000${C.reset}`);
console.log(`${C.blue}  Website → http://localhost:5173${C.reset}`);
console.log(`${C.dim}  Admin   → http://localhost:5173/admin/login  (admin / admin123)${C.reset}`);
console.log(`${C.dim}  Press Ctrl+C to stop both.${C.reset}\n`);

const start = (cmd, cwd) => spawn(cmd, { cwd, stdio: 'inherit', shell: true });
const backend = start(`${npm} start`, backendDir);
const frontend = start(`${npm} run dev`, frontendDir);

let stopping = false;
function shutdown() {
  if (stopping) return;
  stopping = true;
  backend.kill();
  frontend.kill();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
backend.on('exit', shutdown);
frontend.on('exit', shutdown);
