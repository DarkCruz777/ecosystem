// uno.config.js
import { defineConfig, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
    // Presets
    presets: [
        presetUno(), // Base preset with Tailwind-like utilities
        presetWebFonts({
            fonts: {
                sans: 'Roboto:400,500,600',
            }
        }),
    ],
    // Custom theme
    theme: {
        colors: {
            'dark-blue': '#0f172a',      // Dark background
            'light-gray': '#e2e8f0',     // Light text
            'green': '#22c55e',          // Start button
            'green-dark': '#16a34a',     // Start button hover
            'yellow': '#eab308',         // Pause button
            'yellow-dark': '#ca8a04',    // Pause button hover
            'red': '#ef4444',            // Reset button
            'red-dark': '#dc2626',       // Reset button hover
        },
        animation: {
            keyframes: {
                'fade-in': '{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}',
            },
            durations: {
                'fade-in': '0.5s',
            },
            timingFns: {
                'fade-in': 'ease-out',
            },
        }
    },
    // Custom shortcuts
    shortcuts: {
        'btn': 'py-2 px-4 border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 shadow-sm',
        'btn-start': 'bg-green text-white hover:bg-green-dark hover:shadow-md hover:translate-y--2px',
        'btn-pause': 'bg-yellow text-white hover:bg-yellow-dark hover:shadow-md hover:translate-y--2px',
        'btn-reset': 'bg-red text-white hover:bg-red-dark hover:shadow-md hover:translate-y--2px',
        'glass-panel': 'bg-dark-blue/70 backdrop-blur-md border border-white/10 shadow-lg rounded-lg',
        'fade-in': 'animate-fade-in',
    },
});