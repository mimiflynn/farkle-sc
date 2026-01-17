import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
    },
    resolve: {
        alias: {
            '@fsc/types': path.resolve(__dirname, '../../packages/types'),
            '@fsc/state': path.resolve(__dirname, '../../packages/state'),
        },
    },
});
