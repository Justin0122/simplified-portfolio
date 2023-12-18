import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    server: {
        fs: {
            strict: true,
        },
    }
});
