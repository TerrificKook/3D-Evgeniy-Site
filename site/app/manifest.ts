import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Инженерная мастерская',
    short_name: 'Мастерская',
    description: 'Квалификация функциональных пластиковых деталей, корпусов и производственной оснастки.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3f1ec',
    theme_color: '#1d2826',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
