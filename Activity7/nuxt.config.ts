import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: '5004',
    public: {
      apiBase: 'http://localhost:5004'
    }
  },
  /* runtimeConfig: {
    public: {
      baseURL: 'http://localhost:5004',
      nuxtURL: 'http://localhost:5004',
    },
  },*/
  modules: [
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },

 // buildModules: ['@nuxt/typescript-build'], 
  css: ['~/assets/css/main.css','~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  /*
  antd:{
    // Options
  }*/
})
