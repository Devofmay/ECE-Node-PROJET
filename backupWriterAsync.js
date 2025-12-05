// backupWriterAsync.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Compatibilité ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossier /data à la racine du projet
const DATA_DIR = path.join(__dirname, "data");

export async function writeBackupAsync(filename, jsonObject) {
  try {
    // Crée automatiquement /data si nécessaire
    await fs.mkdir(DATA_DIR, { recursive: true });

    const filePath = path.join(DATA_DIR, filename);

    // Écriture ASYNCHRONE
    await fs.writeFile(
      filePath,
      JSON.stringify(jsonObject, null, 2),
      "utf8"
    );

    return { success: true, file: filePath };

  } catch (error) {
    return { success: false, error: error.message };
  }
}
