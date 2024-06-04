import { convert } from 'https://deno.land/x/deno_webp_converter@0.0.4/mod.ts';
import {
	ImageMagick,
	initialize,
} from 'https://deno.land/x/imagemagick_deno@0.0.26/mod.ts';
import { logError } from '../utils/errorHandling.ts';

// Инициализация ImageMagick
await initialize();

// Функция для модификации содержимого файла изображения
export async function modifyFileContent(
	srcPath: string,
	outputFilePath: string,
): Promise<void> {
	try {
		// Читаем исходное изображение для получения его размеров
		const imageContent: Uint8Array = await Deno.readFile(srcPath);
		// Получаем ширину и высоту изображения
		const [width, height]: number[] = ImageMagick.read(
			imageContent,
			(img) => [img.width, img.height],
		);

		// Вычисляем размеры для обрезки, чтобы получить квадратное изображение
		// Определяем меньшую сторону для квадратного изображения
		const cropSize: number = Math.min(width, height);
		// Вычисляем начальную точку обрезки по оси X
		const cropX: number = (width - cropSize) / 2;
		// Вычисляем начальную точку обрезки по оси Y
		const cropY: number = (height - cropSize) / 2;
		// Конвертируем и обрабатываем изображение в формат .webp с заданными параметрами
		// Опции: -q 80 (качество 80%), -crop (обрезка), -resize 900 900 (изменение размера до 900x900)
		await convert(
			srcPath,
			outputFilePath.replace(/.[^.]+$/, '.webp'),
			`-q 80 -crop ${cropX} ${cropY} ${cropSize} ${cropSize} -resize 900 900`,
			// '-v',
		);
	} catch (error) {
		logError(error);
	}
}
