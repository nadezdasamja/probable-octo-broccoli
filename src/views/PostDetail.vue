<template>
  <div class="post-detail-page">
    <div v-for="post in posts.data" :key="post.id">
      <div class="post-detail-view" v-if="postSingle === post.id">
        <div class="post-detail-text">
          <!-- {{ post }} -->

          <div class="owner">
            <img
              class="owner-img"
              :src="post.owner.picture"
              :alt="post.owner.firstName - post.owner.lastName"
              :title="post.owner.firstName - post.owner.lastName"
            />

            <p>
              <span class="key-data">Name: </span> {{ post.owner.title }}
              {{ post.owner.firstName }} {{ post.owner.lastName }}
            </p>
            <p><span class="key-data">Owner's ID :</span>{{ post.owner.id }}</p>
          </div>
          <p class="published-date">
            <span class="key-data">Published date: </span>
            {{ moment(post.publishDate).format("MMMM Do YYYY, h:mm:ss a") }}
          </p>
          <p><span class="key-data">Post ID: </span>{{ post.id }}</p>
          <div class="post-tags-likes-holder">
            <div class="likes">
              <span class="key-data">Likes: </span>
              <span class="like">
                <span class="like-num"> {{ post.likes }}</span>
              </span>
            </div>
            <p>
              <span class="key-data">Tags: </span>
              <span class="tags" v-for="tags in post.tags" :key="tags">
                {{ tags }} /
              </span>
            </p>
          </div>
          <p><span class="key-data">Text:</span> {{ post.text }}</p>

          <br />
          <RouterLink
            class="post-edit-button"
            :to="{ path: '/post/' + post.id + '/edit' }"
            >Edit Post</RouterLink
          >
        </div>
        <div class="post-detail-image">
          <img :src="post.image" :alt="post.text" :title="post.text" />
        </div>
      </div>
    </div>
    <!--comment component-->
    <Comments></Comments>
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
.post-detail-view {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  grid-auto-rows: 1fr;
}

@media only screen and (max-width: 768px) {
  .post-detail-view {
    grid-template-columns: repeat(1, 1fr);
  }
}
.post-detail-image img {
  width: 100%;
  height: 100%;
}

.post-detail-text {
  font-size: 18px;
  background-color: #050c4a;
  color: #fff;
  padding: 24px;
}

.key-data {
  font-size: 12px;
  background-color: #70cd87;
  font-weight: 300;
  padding: 5px 10px;
  color: #050c4a;
  margin-right: 16px;
}

.owner-img {
  border-radius: 50%;
  border: 2px solid #d7eb;
}

.post-edit-button {
  color: #fff;
  border: 2px solid #70cd87;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 4px;
  background-color: transparent;
  text-decoration: none;
}

.post-edit-button:hover {
  border: 2px solid #fff;
  color: #70cd87;
}
</style>
