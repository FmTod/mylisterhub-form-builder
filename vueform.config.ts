import { defineConfig } from '@vueform/vueform';
import bootstrap from '@vueform/vueform/dist/bootstrap.vue2';
import en from '@vueform/vueform/locales/en';

export default defineConfig({
    // eslint-disable-next-line ts/no-unsafe-assignment
    theme: bootstrap,
    // eslint-disable-next-line ts/no-unsafe-assignment
    locales: { en },
    locale: 'en',
});
