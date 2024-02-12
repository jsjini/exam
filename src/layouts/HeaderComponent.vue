<template>
    <div class="container">
        <nav class="nav">
            <h3>게시판</h3>
            <router-link class="nav-link active" to="/">Home</router-link>
            <router-link class="nav-link activet" to="/boardList">전체조회</router-link>
            <router-link class="nav-link activet" to="/boardForm">글 등록</router-link>
        </nav>
    </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>