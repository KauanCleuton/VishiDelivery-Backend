import path from 'path';
import fs from 'fs';

const saveDirFile = async (photo: string, category: string) => {
  const photoBuffer = Buffer.from(photo, 'base64');
  const photoFileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.png`; // Gera um nome de arquivo único
  const photoRelativePath = path.join('src', 'private', category, photoFileName); // Caminho relativo
  const photoAbsolutePath = path.join(__dirname, '../../', photoRelativePath);

  try {
    fs.mkdirSync(path.dirname(photoAbsolutePath), { recursive: true });
    fs.writeFileSync(photoAbsolutePath, photoBuffer);
    return photoRelativePath;
  } catch (error) {
    console.error('Erro ao salvar o arquivo:', error);
    throw error;
  }
};

export default saveDirFile;
