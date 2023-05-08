<template>
  <div class="post-detail-page">
    <div class="inner">
      <h2 class="post-detail-title">Post In Details</h2>
      <div v-for="post in posts.data" :key="post.id">
        <div class="post-detail-view" v-if="postSingle === post.id">
          <div class="post-detail-text">
            <img
              class="owner-img"
              :src="post.owner.picture"
              :alt="post.owner.firstName - post.owner.lastName"
              :title="post.owner.firstName - post.owner.lastName"
            />

            <p>
              <span class="key-data">Name</span>{{ post.owner.title }}
              {{ post.owner.firstName }} {{ post.owner.lastName }}
            </p>
            <p><span class="key-data">Text</span>{{ post.text }}</p>
            <p>
              <span class="key-data">Tags</span>
              <span v-for="tags in post.tags" :key="tags">{{ tags }} / </span>
            </p>
            <p><span class="key-data">Likes</span>{{ post.likes }}</p>
            <p>
              <span class="key-data">Published</span
              >{{ moment(post.publishDate).format("MMMM Do YYYY, h:mm:ss a") }}
            </p>
            <p><span class="key-data">Owner's ID</span>{{ post.owner.id }}</p>

            <p><span class="key-data">Post ID</span>{{ post.id }}</p>

            <br />
            <RouterLink
              class="post-edit-button"
              :to="{ path: '/post/' + post.id + '/edit' }"
              >Edit Post</RouterLink
            >

            <a class="back" @click="$router.go(-1)"> Back</a>
          </div>

          <div class="post-detail-image">
            <img :src="post.image" :alt="post.text" :title="post.text" />
          </div>
        </div>
      </div>
      <!--comment component-->
      <Comments></Comments>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Comments from "../components/Comments.vue";

export default {
  components: { Comments },
  data() {
    return {
      components: {
        Comments,
      },
      posts: [],
      postSingle: this.$route.params.id,
      title: "PostDetail",
    };
  },

  mounted() {
    this.getPosts();
  },

  methods: {
    getPosts() {
      axios
        .get("https://dummyapi.io/data/v1/post", {
          headers: {
            "app-id": "63fe31dc0cc213cc29ccff4b",
          },
        })
        .then((response) => (this.posts = response.data))
        .then((response) => console.log(this.posts));
    },
    moment: function (date) {
      return moment(date);
    },
    date: function (date) {
      return moment(date).format("MMMM Do YYYY");
    },
  },
};
</script>

<style scoped>
.post-detail-page {
  background-color: #fff;
  padding: 40px 0;
}

.post-detail-title {
  color: #d7eb;
}
.post-detail-title::before {
  content: "/";
  color: #d7eb;
  margin-right: 12px;
}

.back {
  border: 1px solid #ebd3f1;
  background-color: #fff;
  color: #222;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  width: 10rem;
  display: block;
  text-align: center;
  margin-top: 1rem;
}

.back:hover {
  color: #ebd3f1;
}
.post-detail-view {
  --minthumb: 550px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--minthumb), 1fr));
  grid-auto-flow: row dense;
  grid-gap: 24px;
  list-style: none;
  padding-left: 0;
}

.post-detail-image img {
  width: 100%;
  height: auto;
  border-radius: 1rem;
}

.post-detail-text {
  font-size: 1.2rem;
  padding: 24px;
  border-radius: 1rem;
}

.key-data {
  border-bottom: 2px solid #d7eb;
  font-weight: 300;
  color: #333;
  margin-right: 16px;
  width: 10rem;
  display: inline-block;
}

.owner-img {
  border-radius: 50%;
  border: 2px solid #d7eb;
  width: 10rem;
  height: 10rem;
}

.post-edit-button {
  border: 1px solid #ebd3f1;
  background-color: #ebd3f1;
  color: #222;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 4px;
  text-decoration: none;
  width: 10rem;
  display: block;
  text-align: center;
}

.post-edit-button:hover {
  border: 1px solid #b266ff;
  background-color: #ebd3f1;
  color: #b266ff;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .post-detail-view {
    --minthumb: 95vw;
  }
}
</style>
