<template>
  <div class="edit-post">
    <h2 class="edit-post-title">Edit Post</h2>
    <form
      class="form edit-post__form"
      @submit.prevent="createPost"
      @submit="submitForm"
    >
      <div class="about-owner">
        <h3 class="form-box-title">About owner</h3>
        <div class="create-post__form-item">
          <label for="ownerPicture">Upload Owner Picture</label>
          <input type="file" @change="handleFileUpload($event)" />
        </div>
        <div class="create-post__form-item create-post__form-item-radio">
          <input
            type="radio"
            id="miss"
            value="miss"
            v-model="model.post.owner[0].title"
          />
          <label for="one">Miss</label>

          <input
            type="radio"
            id="mrs"
            value="mrs"
            v-model="model.post.owner[0].title"
          />
          <label for="two">Mrs</label>

          <input
            type="radio"
            id="ms"
            value="ms"
            v-model="model.post.owner[0].title"
          />
          <label for="one">Ms</label>

          <input
            type="radio"
            id="mr"
            value="mr"
            v-model="model.post.owner[0].title"
          />
          <label for="two">Mr</label>
        </div>
        <div class="create-post__form-item">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="model.post.owner[0].firstName"
          />
        </div>

        <div class="create-post__form-item">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="model.post.owner[0].lastName"
          />
        </div>
      </div>
      <div class="new-post">
        <h3 class="form-box-title">Add new post</h3>
        <div class="create-post__form-item">
          <label for="postImage">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            @change="onFileSelected"
            id="image"
          />
        </div>
        <div class="create-post__form-item">
          <label for="tags">Tags</label>
          <input type="text" id="tags" v-model="model.post.tags" />
        </div>
        <div class="create-post__form-item">
          <label for="body">Post Text</label>
          <input type="textarea" id="body" v-model="model.post.text" />
        </div>

        <button
          @click="savePost"
          v-on:click="createPost()"
          class="submit-button"
        >
          Save Post
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditPost",
  data() {
    return {
      model: {
        post: {
          image: "",
          file: "",
          tags: "",
          text: "",
          owner: [
            {
              title: "",
              firstName: "",
              lastName: "",
              picture: "",
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.getPostData(this.$route.params.id);
    //console.log(this.$route.params.id);
  },
  methods: {
    getPostData(postId) {
      axios
        .get(`https://dummyapi.io/data/v1/post/${postId}`, {
          headers: {
            "app-id": "63fe31dc0cc213cc29ccff4b",
          },
        })
        .then((response) => (this.posts = response.data))
        .then((response) => console.log(this.posts));

      this.model.post = this.posts;
    },
    createPost() {
      axios
        .post("https://dummyapi.io/data/v1/post", this.model.post)
        .then((response) => console.log(response));
      alert(response.data.message).catch((error) => console.log(error));
      this.model.post = {
        image: "",
        tags: "",
        text: "",
        owner: [
          {
            firstName: "",
            lastName: "",
            picture: "",
          },
        ],
      };
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    onFileSelected(event) {
      console.log(event);
    },
    submitForm() {
      this.$refs.createPost.reset();
    },
  },
};
</script>

<style scoped>
.edit-post {
  background-color: #7c336c;
  color: #fff;
  padding: 4%;
  width: 75%;
  margin: 0 auto;
}

@media only screen and (max-width: 768px) {
  .edit-post {
    width: 100%;
  }
}

.edit-post-title {
  color: #fff;
}

.edit-post-title::before {
  content: "/";
  color: #fff;
  margin-right: 12px;
}

.create-post__form-item {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  margin: 7px 0;
}

.submit-button {
  color: #fff;
  border: 2px solid #fff;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 4px;
  background-color: transparent;
}

.submit-button:hover {
  color: #050c4a;
  border: 2px solid #050c4a;
  cursor: pointer;
}

.edit-post__form {
  justify-content: space-evenly;
}

.create-post__form-item-radio {
  display: flex;
  flex-direction: row;
}
.create-post__form-item-radio label {
  margin-right: 20px;
}

input {
  border: 2px solid #050c4a;
}
</style>
