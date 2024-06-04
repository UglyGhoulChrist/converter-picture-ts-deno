// Функция для логирования ошибок
export function logError(error: Error): void {
	console.error('Произошла ошибка:', error.message);
}

// Функция для безопасного выполнения асинхронных операций с обработкой ошибок
export async function safeExecute(asyncFn: () => Promise<void>): Promise<void> {
	try {
		await asyncFn();
	} catch (error) {
		logError(error);
	}
}
