// scanFiles.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname);

// فولدرهایی که نباید اسکن بشن
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', 'public'];

// پسوند فایل‌هایی که می‌خوای نمایش داده بشن
const showFiles = ['.js', '.jsx', '.json', '.css', '.html'];

function scanDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
        const fullPath = path.join(dir, item.name);

        // نادیده گرفتن فولدرهای غیرضروری
        if (item.isDirectory() && ignoreDirs.includes(item.name)) return;

        if (item.isDirectory()) {
            scanDir(fullPath);
        } else {
            const ext = path.extname(item.name);
            if (!showFiles.includes(ext)) return;

            console.log(`\n--- FILE: ${fullPath} ---\n`);
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                console.log(content);
            } catch (err) {
                console.log(`⚠️ نمی‌توان فایل را خواند: ${fullPath}`);
            }
        }
    });
}

scanDir(projectRoot);
