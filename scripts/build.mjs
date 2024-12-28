import * as fs from 'fs';
import { fileURLToPath } from "url";
//const __dirname = fileURLToPath(new URL('.', import.meta.url));

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

function copyRequirements() {
    fs.copyFileSync(`${projectRoot}package.json`, `${projectRoot}built/package.json`);
    fs.copyFileSync(`${projectRoot}LICENSE`, `${projectRoot}built/LICENSE`);
}

copyRequirements();