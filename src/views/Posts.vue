<template>
  <div class="posts">
    <div class="hero-intro parallax" ref="parallax">
      <div class="parallax__background" data-depth="0.2">
        <h1 class="logo">dposts<span>...</span></h1>
      </div>
      <div class="parallax__foreground" data-depth="0.8">
        <div class="hero-intro-bottom-text">
          <h1 class="logo-over"><span>...</span>dposts</h1>
        </div>
      </div>
    </div>
    <div class="inner">
      <p class="hero-intro-bottom-text">
        Curated products selected for professionals like you.
      </p>
      <ul class="grid-directory">
        <li
          class="post-preview"
          v-bind:id="post.id"
          v-for="post in posts.data"
          :key="post.id"
        >
          <figure class="post-image-holder" @click="viewPostDetail(post.id)">
            <img
              class="post-image"
              :src="post.image"
              :alt="post.text"
              :title="post.text"
            />
          </figure>

          <div class="post-info-header">
            <span class="tags" v-for="tags in post.tags" :key="tags">
              {{ tags }}
            </span>
            <h2 class="post-title">
              {{ post.text }}
            </h2>
          </div>
          <div class="post-info-details">
            <div class="post-owner">
              by:
              <strong
                >{{ post.owner.title }} {{ post.owner.firstName }}
                {{ post.owner.lastName }}</strong
              >
            </div>
            <div class="likes">
              <span class="like">
                <span class="like-num"
                  >likes: <strong>{{ post.likes }}</strong></span
                >
              </span>
            </div>
          </div>
          <div class="post-info-footer" @click="viewPostDetail(post.id)">
            <strong>View Post</strong>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
              />
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import Parallax from "parallax-js";
const router = useRouter();
const route = useRoute();
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPosts();
    const parallax = new Parallax(this.$refs.parallax, {
      relativeInput: true,
      speed: 0.9,
    });
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
    //open single post on click
    viewPostDetail(postId) {
      let postSingle = postId;
      this.$router.push({ name: "PostDetail", params: { id: postSingle } });
    },
    moment: function (date) {
      return moment(date);
    },
    //format date
    date: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
};
</script>

<style scoped>
.hero-intro-bottom-text {
  font-size: 1.4rem;
  display: flex;
  width: 20rem;
  max-width: 100%;
  font-weight: 300;
  position: sticky;
  top: 1.6rem;
  z-index: 1000;
}
.posts {
  margin: 0 auto;
}

figure {
  margin: 0;
  padding: 0;
}

.logo {
  font-size: 15vw;
  font-weight: 500;
  -webkit-text-stroke: 0.9px #b266ff;
  color: #ebd3f1;
  margin: 0;
  display: flex;
  padding: 8% 0;
}

.logo-over {
  font-size: 25vw;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  display: flex;
  padding: 5% 0;
}

.grid-directory {
  --minthumb: 350px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--minthumb), 1fr));
  grid-auto-flow: row dense;
  grid-gap: 24px;
  padding-bottom: 30px;
  list-style: none;
  padding-left: 0;
}

.post-preview {
  background-color: #fff;
  border-radius: 16px;
}
.post-info-header {
  border-bottom: 2px solid #e9e9e9;
  padding: clamp(20px, 3vw, 30px) clamp(10px, 3vw, 20px);
  min-height: 175px;
}
.post-info-details {
  border-bottom: 2px solid #e9e9e9;
  padding: clamp(20px, 3vw, 30px) clamp(10px, 3vw, 20px);
  display: flex;
  justify-content: space-between;
}
.post-info-footer {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 500;
  padding: clamp(20px, 3vw, 30px) clamp(10px, 3vw, 20px);
}

.post-title {
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 400;
  line-height: 1.5;
}

.post-image-holder {
  position: relative;
}
.post-image {
  width: 100%;
  object-fit: cover;
  transition: 0.5s all ease-in-out;
  cursor: pointer;
  aspect-ratio: 4/3;
  border-radius: 8px;
}

.post-image:hover {
  filter: brightness(75%);
}

.tags {
  font-size: 12px;
  text-transform: capitalize;
  font-weight: 300;
}

.tags::after {
  content: "/";
  margin: 0 3px;
}

.tags:last-child:after {
  content: "";
}

.like-num {
  font-size: 14px;
  margin-left: 20px;
}

.parallax {
  height: 80vh;
  position: relative;
  overflow: hidden;
}

.parallax__background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.parallax__foreground {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

@media only screen and (max-width: 768px) {
  .parallax {
    height: 50vh;
  }
}

@media only screen and (max-width: 1400px) {
  .hero-intro-bottom-text {
    position: static;
  }
}
</style>
