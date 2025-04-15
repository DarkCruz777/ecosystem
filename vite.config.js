import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';

export default defineConfig({
    plugins: [
        react(),
        UnoCSS()
    ],
    server: {
        host: true,
        open: true
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
})