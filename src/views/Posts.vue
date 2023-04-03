<template>
  <div class="posts">
    <ul>
      <li
        @click="viewPostDetail(post.id)"
        v-bind:id="post.id"
        v-for="post in posts.data"
        :key="post.id"
      >
        <div class="post-image-holder">
          <p class="published-date">
            {{ moment(post.publishDate).format("MMMM Do YYYY, h:mm:ss a") }}
          </p>
          <div class="post-tags-likes-holder">
            <div class="likes">
              <span class="like">
                <span class="like-num">{{ post.likes }}</span>
              </span>
            </div>
            <div>
              <span class="tags" v-for="tags in post.tags" :key="tags"
                >{{ tags }}
              </span>
            </div>
          </div>

          <img
            class="post-image"
            :src="post.image"
            :alt="post.text"
            :title="post.text"
          />
        </div>
        <div class="post-info">
          <div class="owner">
            <img
              class="owner-img"
              :src="post.owner.picture"
              :alt="post.owner.firstName - post.owner.lastName"
              :title="post.owner.firstName - post.owner.lastName"
            />
            {{ post.owner.title }}
            {{ post.owner.firstName }}
            {{ post.owner.lastName }}
          </div>

          <h2 class="post-title">
            {{ post.text }}
          </h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.posts {
  margin: 0 auto;
}
.post-info {
  padding: 16px;
}
.post-title {
  text-transform: capitalize;
  color: #4e50e6;
}

.published-date {
  border-left: 2px solid #70cd87;
  padding-left: 10px;
  margin-left: 15px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
}

@media only screen and (max-width: 768px) {
  ul {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: auto;
  }

  .post-image {
    height: 350px !important;
  }
}
li:hover {
  background-color: #050c4a;
  color: #42b983;
  transition: 2s all;
}
a {
  color: #42b983;
}
.owner-img {
  width: 35px;
  height: 35px;
  filter: grayscale(100%);
}

.post-image-holder {
  position: relative;
}
.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  filter: grayscale(100%);
  transition: 0.5s all ease-in-out;
  cursor: pointer;
  transform: scale(0.9);
}

.tags {
  color: #4e50e6;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
}

.tags::after {
  content: "/";
  margin: 0 3px;
}

.tags:last-child:after {
  content: "";
}

.likes {
  position: relative;
}

.like {
  font-size: 12px;
}
.like::before,
.like::after {
  content: "";
  position: absolute;
  top: 0;
  width: 10px;
  height: 15px;
  border-radius: 10px 10px 0 0;
  background: #4e50e6;
}

.like::before {
  left: 10px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.like::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

.like-num {
  color: #4e50e6;
  font-size: 14px;
  margin-left: 20px;
}

.post-tags-likes-holder {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.owner {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
