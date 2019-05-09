<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style>
  body,html,#app{
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
</style>
