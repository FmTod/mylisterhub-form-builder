import type { Component } from 'vue';
import { createInertiaApp } from '@inertiajs/vue2';
import Vueform from '@vueform/vueform';
import Vue from 'vue';
import vueformConfig from '../../vueform.config';
import 'iconify-icon';
import '../sass/main.scss';

void createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<Component>('./pages/**/*.vue', { eager: true });

        return pages[`./pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
        Vue.use(plugin);
        Vue.use(Vueform, vueformConfig);

        new Vue({
            // eslint-disable-next-line ts/ban-ts-comment
            // @ts-expect-error
            render: h => h(App, props),
        }).$mount(el);
    },
});
