<template>
  <v-app>
    <v-main>
      <Weather />
    </v-main>
  </v-app>
</template>

<script>
import Weather from "./components/Weather.vue"

export default {
  name: "App",

  components: {
    Weather
  },

  data: () => ({
    //
  }),
};
</script>
