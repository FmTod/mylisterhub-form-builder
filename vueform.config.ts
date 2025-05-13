/* eslint-disable ts/no-unsafe-assignment */
import { defineConfig } from '@vueform/vueform';
import bootstrap from '@vueform/vueform/dist/bootstrap.vue2';
import en from '@vueform/vueform/locales/en';

export default defineConfig({
    theme: bootstrap,
    locales: { en },
    locale: 'en',
});
