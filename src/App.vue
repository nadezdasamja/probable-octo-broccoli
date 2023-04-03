<template>
  <div>
    <nav class="navigation">
      <RouterLink to="/" active-class="active" class="nav-links"
        >All Posts</RouterLink
      >

      <RouterLink to="/create" active-class="active" class="nav-links"
        >Create New Post</RouterLink
      >
    </nav>
    <transition name="moveInUp">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.navigation {
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-links {
  font-size: 20px;
  text-decoration: none;
  font-weight: bold;
  color: #050c4a;
}
.nav-links:after {
  content: "/";
  color: #70cd87;
  margin: 0 10px;
}
.nav-links:last-child:after {
  content: "";
}

.active {
  color: #70cd87;
}

.moveInUp-enter-active {
  animation: fadeIn 2s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.moveInUp-leave-active {
  animation: moveInUp 0.3s ease-in;
}
@keyframes moveInUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}
</style>
