import { copyAndModifyFiles } from './functions/copyAndModifyFiles.ts';
import { logError } from './utils/errorHandling.ts';

// Функция для запроса булевого значения у пользователя
// function askBoolean(question: string): boolean | null {
//     const result = prompt(`${question} (y/n)`);
//     return result?.toLowerCase() === 'y';
// }

// const isConvertToWebp = askBoolean("Преобразовать в .webp?");
// const isChangeTheScale = askBoolean("Изменить масштаб?");
// const isChangeTheSize = askBoolean("Изменить размер?");

// Путь к папке с оригинальными изображениями
const originalFolder: string = 'originalFolder';
// Путь к папке для сохранения измененных изображений
const modifiedFolder: string = 'modifiedFolder';

// Запуск процесса копирования и модификации файлов изображений
copyAndModifyFiles(originalFolder, modifiedFolder)
	.then(() => console.log('Файлы успешно скопированы и изменены'))
	.catch((error) => logError(error));
