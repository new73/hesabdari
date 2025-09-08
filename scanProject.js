// scanProject.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname);
const ignoreDirs = ['node_modules', '.git', 'dist', 'build'];
const showFiles = ['.js', '.jsx', '.json', '.css', '.html', '.ts', '.mjs'];

function scanDir(dir, depth = 0) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
        const fullPath = path.join(dir, item.name);
        const indent = '  '.repeat(depth);

        if (item.isDirectory() && ignoreDirs.includes(item.name)) return;
        if (item.isDirectory()) {
            console.log(`${indent}[DIR]  ${item.name}`);
            scanDir(fullPath, depth + 1);
        } else {
            const ext = path.extname(item.name);
            if (!showFiles.includes(ext)) return;
            console.log(`${indent}[FILE] ${item.name}`);
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                content.split('\n').slice(0, 5).forEach(line => console.log(`${indent}    ${line}`));
            } catch {
                console.log(`${indent}    ⚠️ نمی‌توان فایل را خواند`);
            }
        }
    });
}

console.log(`شروع اسکن پروژه از مسیر: ${projectRoot}\n`);
scanDir(projectRoot);
