import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
  state: () => {
    return {
      msg: 'Hello World'
    };
  },
  getters: {},
  actions: {},
});