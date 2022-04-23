<template>
  <v-container class="container">
    <v-card
      class="mx-auto my-12 px-10 py-10 light-blue lighten-4"
      max-width="550"
      style="border-radius: 10px"
    >
      <v-row class="text-center mb-2" justify="center">
        <h1>WEATHER</h1>
      </v-row>
      <v-row class="text-center" justify="center">
        <v-col class="">
          <v-row>
            <v-text-field
              outlined
              v-model="city"
              placeholder="City"
              @keyup.enter="getWeather"
              style="border-radius: 10px"
            ></v-text-field>
          </v-row>
        </v-col>
      </v-row>

      <div
        v-if="$store.state.error"
        class="text-center"
        style="height: 100%"
        justify="center"
      >
        <v-icon x-large color="darken-2"> mdi-wifi-strength-2-alert </v-icon>
        <div class="body-1">Something Wrong</div>
        <v-btn depressed @click="getWeather"> Retry </v-btn>
      </div>

      <div
        v-if="$store.state.loading"
        class="text-center"
        style="height: 500px"
      >
        <v-row class="text-center" style="height: 100%" justify="center">
          <v-progress-circular
            class="my-auto"
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </div>

      <v-row v-else class="text-center" justify="center">
        <v-col class="mb-1" cols="12">
          <h2 class="font-weight-bold mb-3">{{ weather.name }}</h2>
          <div class="mb-3">
            {{ Date(1650629001).toString("MMM dd") }}
          </div>
        </v-col>

        <v-col class="mb-1" cols="12">
          <v-img
            class="mx-auto"
            :src="
              'http://openweathermap.org/img/w/' +
              weather.weather[0].icon +
              '.png'
            "
            width="100"
          />
        </v-col>

        <v-col class="mb-5" cols="12">
          <h1 class="display-2 font-weight-bold mb-1">
            {{ weather.weather[0].main }}
          </h1>
          <h2 class="headline mb-3">
            {{ weather.weather[0].description }}
          </h2>
        </v-col>

        <v-col class="mb-5" cols="12">
          <h2 class="headline font-weight-bold mb-3">
            {{ weather.main.temp }} &#8451;
          </h2>
          <v-row justify="center">
            <div>
              <span class="mr-2">{{ weather.main.temp_min }} &#8451;</span>
              /
              <span class="ml-2">{{ weather.main.temp_max }} &#8451;</span>
            </div>
          </v-row>
        </v-col>

        <v-col class="mb-5" cols="12">
          <v-row justify="center">
            <v-col cols="5">
              {{ weather.main.humidity }} % <br />Humidity
            </v-col>
            <v-col cols="5">
              {{ weather.clouds.all }} % <br />Cloudiness
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <i>openweathermap.org</i>
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbar"> Something Wrong </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      city: "",
    };
  },
  created() {
    // get default weather data of Yangon
    this.$store.dispatch("getWeather", "Yangon");
  },
  computed: {
    weather() {
      return this.$store.state.weatherData;
    },
    snackbar() {
      return this.$store.state.error;
    },
  },
  mounted() {
    this.$store.dispatch("getWeather", this.city == "" ? "Yangon" : this.city);
  },

  methods: {
    // search by city
    getWeather() {
      this.$store.dispatch(
        "getWeather",
        this.city == "" ? "Yangon" : this.city
      );
    },
  },
};
</script>

<style scoped>
.container {
  background: url("../assets/background.png");
  background-size: contain;
}
</style>
