/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assets-shree.s3.ap-south-1.amazonaws.com', 'res.cloudinary.com','api-9vkxs.strapidemo.com', 'localhost:1337', 'localhost','zezoadmin.herokuapp.comhttps'],
    
  },
}
// 'assets-shree.s3.ap-south-1.amazonaws.com',

module.exports = nextConfig
