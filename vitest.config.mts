import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      // Next.js implements `server-only` in its compiler; outside Next it is a no-op.
      'server-only': fileURLToPath(
        new URL('./node_modules/next/dist/compiled/server-only/empty.js', import.meta.url),
      ),
    },
  },
  test: {
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', '.next/**'],
    environment: 'node',
  },
});
