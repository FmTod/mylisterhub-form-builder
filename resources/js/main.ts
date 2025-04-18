import Vue from "vue";
import Vueform from "@vueform/vueform";
import { createInertiaApp } from "@inertiajs/vue2";
import vueformConfig from "../../vueform.config";
import "../css/index.scss";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        return pages[`./Pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
        Vue.use(plugin);
        Vue.use(Vueform, vueformConfig);

        new Vue({
            render: (h) => h(App, props),
        }).$mount(el);
    },
});
