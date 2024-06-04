import { join, parse } from 'https://deno.land/std/path/mod.ts';
import { modifyFileContent } from './modifyFileContent.ts';

// Функция для копирования и модификации файлов, включая изменение формата на .webp
export async function copyAndModifyFiles(
	srcDir: string,
	destDir: string,
): Promise<void> {
	// Рекурсивно проверяем и создаем целевую директорию, если она не существует
	await Deno.mkdir(destDir, { recursive: true });
	// Перебираем все элементы в исходной директории
	for await (const dirEntry of Deno.readDir(srcDir)) {
		// Путь к исходному файлу/директории
		const srcPath: string = join(srcDir, dirEntry.name);
		// Путь к целевому файлу/директории
		const destPath: string = join(destDir, dirEntry.name);

		if (dirEntry.isDirectory) {
			// Рекурсивно обрабатываем директории
			await copyAndModifyFiles(srcPath, destPath);
		} else if (dirEntry.isFile) {
			// Обрабатываем файлы: изменяем формат и размер
			// Получаем имя файла без расширения
			const { name }: { name: string } = parse(dirEntry.name);
			// Путь к файлу в формате .webp
			const outputWebPFilePath: string = join(destDir, `${name}.webp`);

			// Преобразуем содержимое и формат файла
			await modifyFileContent(srcPath, outputWebPFilePath);
		}
	}
}
