import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";

import { VueQueryPlugin } from "vue-query";

import Comments from "./components/Comments.vue";

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
app.component("post-comments", Comments);
