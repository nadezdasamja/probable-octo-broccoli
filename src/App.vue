<template>
  <div class="inner">
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem 0;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #ebd3f1;
  z-index: 20;
}
.nav-links {
  font-size: 2.4rem;
  text-decoration: none;
  font-weight: 300;
  color: #222;
}
.nav-links:after {
  content: "/";
  color: magenta;
  margin: 0 10px;
}
.nav-links:last-child:after {
  content: "";
}

.active {
  color: magenta;
  font-weight: 400;
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
