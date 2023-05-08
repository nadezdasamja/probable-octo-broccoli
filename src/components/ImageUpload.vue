<template>
  <form>
    <label class="image-upload" for="image">Add an image:</label>
    <input type="file" id="image" @change="handleImageUpload" />
  </form>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      axios
        .post("https://dummyapi.io/data/v1/image", formData, {
          headers: {
            "app-id": "63fe31dc0cc213cc29ccff4b",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
input[type="file"] {
  display: none;
}
.image-upload {
  border-bottom: 2px solid #d7eb;
  font-weight: 300;
  color: #333;
  width: 100%;
  display: inline-block;
  cursor: pointer;
  margin: 1rem 0;
}
</style>
