import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  dialect: 'sqlite',
  storage: resolve(__dirname, './src/database/db_sistema.sqlite'),
  define: {
    timestamps: true,
    underscored: true,
  },
};

