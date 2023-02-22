/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    'MYSQL_HOST': '127.0.0.1',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': "rrms",
    'MYSQL_USER': "dbuser",
    'MYSQL_PASSWORD': "Batmanisc00l",
  }
}

module.exports = nextConfig
