import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: "Budget Control",
      meta: [
        { name: "description", content: "Budget" }
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/koala.png" }
      ]
    }
  }
});
