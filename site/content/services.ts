export type ServiceIcon = 'component' | 'box' | 'gauge';

export type Service = {
  slug: string;
  href: string;
  icon: ServiceIcon;
  cardTitle: string;
  summary: string;
};

export const services: Service[] = [
  {
    slug: 'detal-po-obraztsu',
    href: '/detal-po-obraztsu/',
    icon: 'component',
    cardTitle: 'Есть физическая деталь, но нет модели или поставки',
    summary: 'Проверим, можно ли воспроизвести некритичную деталь, подготовить модель и проверить посадку на пилоте.',
  },
  {
    slug: 'korpusa-dlya-elektroniki',
    href: '/korpusa-dlya-elektroniki/',
    icon: 'box',
    cardTitle: 'Нужен корпус под плату, датчик или прибор',
    summary: 'Разберём компоновку, разъёмы, сборку и способ проверки до обсуждения повторяемой партии.',
  },
  {
    slug: 'osnastka-i-konduktory',
    href: '/osnastka-i-konduktory/',
    icon: 'gauge',
    cardTitle: 'Нужен кондуктор, фиксатор или держатель под операцию',
    summary: 'Опишем рабочую операцию, нагрузки и метод испытания, затем проверим решение на пилоте.',
  },
];
