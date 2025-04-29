import { OFXResponse } from "@/app/types/TransactionType";

interface IDBConfig {
  dbName: string;
  storeName: string;
  version: number;
}

interface ChunkData {
  id: string;
  data: string;
  index: number;
  total: number;
  timestamp: number;
}

const DB_CONFIG: IDBConfig = {
  dbName: 'ofxConverterDB',
  storeName: 'ofxData',
  version: 2
};

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.dbName, DB_CONFIG.version);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(DB_CONFIG.storeName)) {
        const store = db.createObjectStore(DB_CONFIG.storeName, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('index', 'index', { unique: false });
      }
    };
  });
};

const CHUNK_SIZE = 500000; // 500KB por chunk

const salvarDados = async (data: string, key: string): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(DB_CONFIG.storeName, 'readwrite');
    const store = transaction.objectStore(DB_CONFIG.storeName);

    // Divide os dados em chunks
    const chunks = [];
    const totalChunks = Math.ceil(data.length / CHUNK_SIZE);
    
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = start + CHUNK_SIZE;
      const chunkData: ChunkData = {
        id: `${key}_chunk_${i}`,
        data: data.slice(start, end),
        index: i,
        total: totalChunks,
        timestamp: Date.now()
      };
      chunks.push(chunkData);
    }

    // Salva todos os chunks
    await Promise.all(chunks.map(chunk => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put(chunk);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    throw error;
  }
};

const recuperarDados = async (key: string): Promise<string | OFXResponse | null> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(DB_CONFIG.storeName, 'readonly');
    const store = transaction.objectStore(DB_CONFIG.storeName);

    // Recupera todos os chunks do arquivo
    const chunks: ChunkData[] = [];
    let cursor = await new Promise<IDBCursorWithValue | null>((resolve, reject) => {
      const request = store.openCursor();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    while (cursor) {
      const chunk = cursor.value as ChunkData;
      if (chunk.id.startsWith(`${key}_chunk_`)) {
        chunks.push(chunk);
      }
      cursor = await new Promise<IDBCursorWithValue | null>((resolve, reject) => {
        cursor!.continue();
        const request = cursor!.request;
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    if (chunks.length === 0) return null;

    // Ordena os chunks pelo índice e concatena os dados
    chunks.sort((a, b) => a.index - b.index);
    return chunks.map(chunk => chunk.data).join('');
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
    return null;
  }
};

const deletarDados = async (key: string): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(DB_CONFIG.storeName, 'readwrite');
    const store = transaction.objectStore(DB_CONFIG.storeName);

    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erro ao deletar dados:', error);
    throw error;
  }
};

const limparDados = async (): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(DB_CONFIG.storeName, 'readwrite');
    const store = transaction.objectStore(DB_CONFIG.storeName);

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw error;
  }
};

export { salvarDados, recuperarDados, deletarDados, limparDados };