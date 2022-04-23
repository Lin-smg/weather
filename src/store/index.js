
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const APIKEY = "b8e3d92fd66604f22006b9e65711969c";

export default new Vuex.Store({
  state: {
    weatherData: {},
    loading: false,
    error: false
  },
  mutations: {
    SET_WEATHER(state, data) {
      state.weatherData = data;
    },
    SET_LOADING(state, data) {
        state.loading = data;
    },
    SET_ERROR(state, data) {
        state.error = data;
    }
  },
  actions: {
    getWeather({ commit }, city) {
        commit("SET_LOADING", true);
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKEY+"&units=metric"
        )
        .then((response) => {
          commit("SET_WEATHER", response.data);
          commit("SET_LOADING", false);
          commit("SET_ERROR", false);
        }).catch(err => {
            console.log("error ..", err)
            commit("SET_ERROR", true);
        }).finally(() => {
            
        //   commit("SET_ERROR", false);
        //   commit("SET_LOADING", false);
        });
    },
  },
  modules: {},
});
