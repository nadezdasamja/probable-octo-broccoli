<template>
  <div class="edit-post">
    <div class="inner">
      <div v-for="post in posts.data" :key="post.id">
        <div class="post-detail-view" v-if="postSingle === post.id">
          <div class="post-detail-text">
            <h2 class="edit-post-title">
              Edit Post Id: {{ this.$route.params.id }}
            </h2>

            <form @submit.prevent="submitForm">
              <img class="owner-img" :src="post.owner.picture" />
              <p>
                <label for="title">Edit Title: </label>
                <input type="text" id="title" v-model="post.owner.title" />
              </p>

              <p>
                <label for="firstName">Edit First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  v-model="post.owner.firstName"
                />
              </p>
              <p>
                <label for="lastName">Edit Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  v-model="post.owner.lastName"
                />
              </p>
              <p>
                <label for="postText">Edit Post Text:</label>
                <input type="textarea" id="postText" v-model="post.text" />
              </p>

              <p>
                <label for="likes">Edit Likes:</label>
                <input type="textarea" id="likes" v-model="post.likes" />
              </p>

              <br />
              <RouterLink
                class="post-save-button"
                :to="{ path: '/post/' + post.id }"
              >
                Save
              </RouterLink>
            </form>
          </div>
          <div class="post-detail-image">
            <img :src="post.image" :alt="post.text" :title="post.text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: [],
      postSingle: this.$route.params.id,
      form: {
        ownerFirstName: "",
        ownerLastName: "",
        title: "",
        text: "",
        tags: [],
      },
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
        .then((response) => (this.posts = response.data));
      //.then((response) => console.log(this.posts));
    },
    methods: {
      submitForm() {
        axios
          .put(
            `https://dummyapi.io/data/v1/post/${this.post.id}`,
            {
              owner: {
                title: this.post.owner.title,
                firstName: this.post.owner.firstName,
                lastName: this.post.owner.lastName,
              },
              text: this.post.text,
              likes: this.post.likes,
            },
            {
              headers: {
                "app-id": "63fe31dc0cc213cc29ccff4b",
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
};
</script>

<style scoped>
.edit-post {
  padding: 40px 0;
}
.edit-post-title {
  color: #fff;
}

.edit-post-title::before {
  content: "/";
  color: #fff;
  margin-right: 12px;
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

label {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

@media only screen and (max-width: 768px) {
  .post-detail-view {
    --minthumb: 95vw;
  }
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

.owner-img {
  border-radius: 50%;
  border: 2px solid #d7eb;
  width: 10rem;
  height: 10rem;
}

.post-save-button {
  border: 1px solid #ebd3f1;
  background-color: #b266ff;
  color: #ebd3f1;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 4px;
  text-decoration: none;
  width: 10rem;
  display: block;
  text-align: center;
  cursor: pointer;
}

.post-save-button:hover {
  border: 1px solid #b266ff;
  background-color: #ebd3f1;
  color: #b266ff;
  cursor: pointer;
}
</style>
