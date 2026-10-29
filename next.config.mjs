/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // The resume was renamed; keep the old public URL working with the current file.
      {
        source: '/Ali_Hamza_Full_Stack_Developer.pdf',
        destination: '/Ali_Hamza_Senior_Full_Stack_Engineer.pdf',
        permanent: true,
      },
      // The OG image was regenerated under a new name.
      {
        source: '/images/og-image.jpg',
        destination: '/images/og-senior-engineer.jpg',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
