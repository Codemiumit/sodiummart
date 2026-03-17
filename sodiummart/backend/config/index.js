module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/sodiummart',
  JWT_SECRET: process.env.JWT_SECRET || 'sodiummart_secret_key_2024',
  JWT_EXPIRE: '7d'
};
