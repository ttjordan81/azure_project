import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    server: {
        host: 'lively-meadow-0c02fb810.2.azurestaticapps.net',
        port: 80,
    },
})
