module.exports = {
  env: {
    API_KEY: process.env.API_KEY,
    DB_URI: process.env.DB_URI,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  async headers() { return [ { source: '/(.*)', headers: [ { key: 'Cross-Origin-Opener-Policy', value: 'same-origin', }, ], }, ]; },
};
