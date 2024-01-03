/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
// const withTM = require('next-transpile-modules')(['react-hook-speech-to-text']);

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  nextConfig
})
