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
        consultatie: resolve(__dirname, 'consultatie.html'),
        caz_restructurare: resolve(__dirname, 'cazuri/restructurare-grup.html'),
        caz_due_diligence: resolve(__dirname, 'cazuri/due-diligence-complex.html'),
        caz_concediere: resolve(__dirname, 'cazuri/concediere-colectiva.html'),
        caz_contract: resolve(__dirname, 'cazuri/negociere-contract-distributie.html'),
        caz_hr_gdpr: resolve(__dirname, 'cazuri/implementare-hr-gdpr.html'),
        caz_litigiu: resolve(__dirname, 'cazuri/litigiu-vicii-ascunse.html')
      }
    }
  }
});
