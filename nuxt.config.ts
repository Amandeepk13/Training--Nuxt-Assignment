// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-04-01',
  devtools: false,
  
  modules: [
    '@pinia/nuxt',
    'nuxt-auth-utils',
    'nuxt-google-auth'
  ],

  googleAuth: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    autoLoadScript: true,
    promptOneTap: false
  },

  runtimeConfig: {
    dburl: process.env.DATABASE_URL,
    dbname: process.env.DBNAME,

    session: {
      password: process.env.NUXT_SESSION_PASSWORD || ''
    }
  }
})
