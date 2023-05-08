<template>
  <div class="comment-block">
    <div
      class="comment-block-single"
      v-for="comment in comments.data"
      v-bind:key="comment.id"
    >
      <div class="owner-info" v-for="owner in comment" v-bind:key="owner.id">
        <img
          class="owner-image"
          :src="owner.picture"
          :alt="owner.firstName"
          :title="owner.firstName"
        />

        <p class="owner-name">
          {{ owner.title }}<br />
          {{ owner.firstName }} <br />
          {{ owner.lastName }}
        </p>
      </div>
      <div class="comment-message">
        <p class="comment-date">
          {{ moment(comment.publishDate).format(" D. MM. YYYY.") }}
        </p>
        {{ comment.message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      comments: [],
    };
  },

  mounted() {
    // console.log(this.$route.params.id);
    this.getPostData(this.$route.params.id);
  },

  methods: {
    getPostData(postId) {
      axios
        .get(`https://dummyapi.io/data/v1/post/${postId}` + `/comment`, {
          headers: {
            "app-id": "63fe31dc0cc213cc29ccff4b",
          },
        })
        .then((response) => (this.comments = response.data))
        .then((response) => console.log(this.comments));
    },
    moment: function (date) {
      return moment(date);
    },
    date: function (date) {
      return moment(date).format("MM Do YYYY, h:mm:ss a");
    },
  },
};
</script>

<style scoped>
.comment-block {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 24px;
  grid-column-gap: 24px;
}

@media only screen and (max-width: 768px) {
  .comment-block {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 24px;
  }
}

.comment-block-single {
  display: flex;
  border: 2px dotted #d7eb;
  padding: 16px;
  border-radius: 1rem;
}

.owner-image {
  border-radius: 50%;
  width: 6rem;
}

.comment-message {
  font-size: 18px;
  border-left: 2px solid #d7eb;
  padding-left: 20px;
}

.comment-date {
  font-size: 12px;
}

.owner-info {
  padding-right: 10px;
}

.owner-name {
  text-align: right;
}
</style>
