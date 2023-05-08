<template>
  <div class="add-post">
    <div class="inner">
      <h2 class="new-post-title">Add New Post</h2>
      <div class="new-post-intro-text">
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-input">
          <input
            class="post-input"
            type="text"
            id="title"
            v-model="title"
            placeholder="Title"
          />
        </div>
        <div class="form-input">
          <input
            class="post-input"
            type="text"
            id="firstName"
            v-model="firstName"
            placeholder="First Name"
          />
        </div>
        <div class="form-input">
          <input
            class="post-input"
            type="text"
            id="lastName"
            v-model="lastName"
            placeholder="Last Name"
          />
        </div>
        <div class="form-input">
          <input
            class="post-input"
            type="text"
            id="tags"
            v-model="tags"
            placeholder="Tags"
          />
        </div>
        <div class="form-input">
          <textarea
            class="post-textarea"
            id="text"
            v-model="text"
            placeholder="Text"
          ></textarea>
        </div>
        <div class="form-input">
          <ImageUpload></ImageUpload>
        </div>
        <div>
          <button class="post-submit-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ImageUpload from "./ImageUpload.vue";
export default {
  components: { ImageUpload },
  data() {
    return {
      title: "",
      firstName: "",
      lastName: "",
      tags: "",
      text: "",
      image: null,
    };
  },
  methods: {
    handleImageUpload() {
      this.image = this.$refs.image.files[0];
    },
    submitForm() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("firstName", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("tags", this.tags);
      formData.append("text", this.text);
      formData.append("image", this.image);
      axios
        .post("https://dummyapi.io/data/api/post/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "app-id": "63fe31dc0cc213cc29ccff4b",
          },
        })
        .then(() => {
          alert("Post created!");
          this.title = "";
          this.firstName = "";
          this.lastName = "";
          this.tags = "";
          this.text = "";
          this.image = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.add-post {
  width: 50vw;
  margin: 0 auto;
  padding-top: 3%;
}

.new-post-intro-text {
  font-weight: 300;
  margin: 1.2rem 0;
}
.new-post-title {
  color: #d7eb;
}
.new-post-title::before {
  content: "/";
  color: #d7eb;
  margin-right: 12px;
}

.form-input {
  margin: 0.5rem 0;
}

.post-textarea {
  width: 100%;
  border: 1px dotted #333;
  padding: 1rem 1.2rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-family: inherit;
}

.post-submit-button {
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

.post-submit-button:hover {
  border: 1px solid #b266ff;
  background-color: #ebd3f1;
  color: #b266ff;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .add-post {
    width: 80vw;
    margin: 0 auto;
  }
}
</style>
