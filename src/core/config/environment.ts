export const config = {
  SERVER: {
    PORT: process.env.SERVER_PORT || 4000,
    BASE_URL: process.env.SERVER_BASE_URL || 'http://localhost:4000'
  },
  GITHUB: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES || "1d"
  }

}