import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';

export default defineConfig({
    plugins: [
        react(),
        UnoCSS(),
    ],
    server: {
        host: true,
        open: true,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    ui: ['p5'],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },

});