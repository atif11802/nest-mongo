export default () => ({
  PORT: parseInt(process.env.PORT) || 9000,
  DB_URI: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
});
