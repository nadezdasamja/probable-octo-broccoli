import { createRouter, createWebHistory } from "vue-router";
import Posts from "../views/Posts.vue";
import PostDetail from "../views/PostDetail.vue";
import EditPost from "../views/EditPost.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Posts,
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/CreatePost.vue"),
  },
  {
    path: "/post/:id/edit",
    name: "EditPost",
    component: EditPost,
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    component: PostDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router; // tell vue about routes!//
