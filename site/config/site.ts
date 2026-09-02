export const siteConfig = {
  displayName: 'EVGENIY 3D WORKSHOP',
  brand: { primary: 'EVGENIY', secondary: '3D WORKSHOP' },
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  contacts: { phone: '', email: '', telegram: '', whatsapp: '' },
  geography: '',
  responseSla: '',
} as const;
