import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react() as PluginOption],
    base: '/farkle-sc/',
    resolve: {
        alias: {
            '@fsc/types': path.resolve(__dirname, '../../packages/types'),
            '@fsc/state': path.resolve(__dirname, '../../packages/state'),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
    },
});
