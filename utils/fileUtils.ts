// Функция для проверки существования файла или директории
export async function exists(path: string): Promise<boolean> {
	try {
		await Deno.stat(path);
		return true;
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			return false;
		}
		throw error;
	}
}

// Функция для рекурсивного создания директорий
export async function ensureDir(path: string): Promise<void> {
	if (!await exists(path)) {
		await Deno.mkdir(path, { recursive: true });
	}
}

// Функция для рекурсивного обхода директорий
export async function* walkDir(
	path: string,
): AsyncIterableIterator<Deno.DirEntry> {
	for await (const dirEntry of Deno.readDir(path)) {
		yield dirEntry;
	}
}
