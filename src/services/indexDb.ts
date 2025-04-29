import { openDB } from 'idb';
import { OFXResponse } from '@/app/types/TransactionType';

interface DBSchema {
  ofxData: {
    key: string;
    value: {
      data: string;
      timestamp: number;
    };
  };
}

const DB_CONFIG = {
  name: 'ofxConverterDB',
  version: 1,
  store: 'ofxData'
} as const;

const initDB = async () => {
  return await openDB<DBSchema>(DB_CONFIG.name, DB_CONFIG.version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(DB_CONFIG.store)) {
        const store = db.createObjectStore(DB_CONFIG.store, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp');
      }
    },
  });
};

export const salvarDados = async <T extends object>(data: T, key: string): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction(DB_CONFIG.store, 'readwrite');
    const store = tx.objectStore(DB_CONFIG.store);

    const dadosParaSalvar = {
      id: key,
      data: JSON.stringify(data),
      timestamp: Date.now()
    };

    await store.put(dadosParaSalvar);
    await tx.done;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    throw new Error('Falha ao salvar os dados no IndexedDB');
  }
};

export const recuperarDados = async (key: string): Promise<OFXResponse | null> => {
  try {
    const db = await initDB();
    const tx = db.transaction(DB_CONFIG.store, 'readonly');
    const store = tx.objectStore(DB_CONFIG.store);

    const resultado = await store.get(key);
    if (!resultado) return null;

    return JSON.parse(resultado.data);
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
    return null;
  }
};

export const limparDados = async (key: string): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction(DB_CONFIG.store, 'readwrite');
    const store = tx.objectStore(DB_CONFIG.store);

    await store.delete(key);
    await tx.done;
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw new Error('Falha ao limpar os dados do IndexedDB');
  }
};