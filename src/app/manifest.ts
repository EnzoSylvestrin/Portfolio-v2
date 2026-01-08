import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Enzo Sylvestrin - Portfolio',
    short_name: 'Enzo Sylvestrin',
    description: 'Full Stack Software Engineer specialized in TypeScript, React, and Nest.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#a855f7',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
