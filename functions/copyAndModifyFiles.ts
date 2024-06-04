import { join } from 'https://deno.land/std/path/mod.ts';
import { modifyFileContent } from './modifyFileContent.ts';
import { ensureDir, walkDir } from '../utils/fileUtils.ts';

// Функция для копирования и модификации файлов, включая изменение формата на .webp
export async function copyAndModifyFiles(
	srcDir: string,
	destDir: string,
): Promise<void> {
	await ensureDir(destDir);
	for await (const dirEntry of walkDir(srcDir)) {
		const srcPath: string = join(srcDir, dirEntry.name);
		const destPath: string = join(destDir, dirEntry.name);
		if (dirEntry.isDirectory) {
			await copyAndModifyFiles(srcPath, destPath);
		} else if (dirEntry.isFile) {
			await modifyFileContent(srcPath, destPath);
		}
	}
}
