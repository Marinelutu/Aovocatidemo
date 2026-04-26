import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:       resolve(__dirname, 'index.html'),
        despre:     resolve(__dirname, 'despre.html'),
        practici:   resolve(__dirname, 'practici.html'),
        corporativ: resolve(__dirname, 'practici/corporativ.html'),
        imobiliar:  resolve(__dirname, 'practici/imobiliar.html'),
        munca:      resolve(__dirname, 'practici/munca.html'),
        cazuri:     resolve(__dirname, 'cazuri.html'),
        contact:    resolve(__dirname, 'contact.html'),
      }
    }
  }
});
