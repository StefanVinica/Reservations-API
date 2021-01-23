module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL
    || 'postgres://ggihauagphmmyf:d0c0dd99cabb1b820e2a53ee13ecc99ad76c6933597165180e684ef4e683ed0a@ec2-54-85-13-135.compute-1.amazonaws.com:5432/d2umas7h8uro3p',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}
