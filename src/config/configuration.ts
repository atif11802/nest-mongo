export default () => ({
  port: parseInt(process.env.PORT) || 8000,
  DB_URI: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
});
