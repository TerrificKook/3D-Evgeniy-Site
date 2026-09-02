export const siteConfig = {
  displayName: 'Инженерная мастерская',
  origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  contacts: { phone: '', email: '', telegram: '', whatsapp: '' },
  geography: '',
  responseSla: '',
} as const;
