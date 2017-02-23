<style>
.footer {
  font-size: 14px;
  color: #999;
  margin-top: 50px;
}
</style>

<template>
  <footer class="footer">
    <div class="container">
      Copyright &copy; <a v-link="{ path: basePath }">{{ siteName }}</a>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      basePath: wp.base_path,
      siteName: wp.site_name
    }
  }
}
</script>

