/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ use the new plugin
    autoprefixer: {},           // ✅ still needed
  },
};

export default config;
