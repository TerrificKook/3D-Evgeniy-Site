export type CaseStatus = 'client' | 'demo';

export type WorkshopCase = {
  title: string;
  slug: string;
  status: CaseStatus;
  industry: string;
  taskType: string;
  problem: string;
  inputData: string[];
  engineeringWork: string[];
  material: string;
  equipment: string;
  quantity: string;
  iterations: string;
  leadTime: string;
  acceptanceMethod: string[];
  result: string;
  repeatPotential: string;
  images: string[];
  confidentialityNote: string;
  verifiedFields: (keyof WorkshopCase)[];
  draftFields: Partial<Record<keyof WorkshopCase, string | string[]>>;
};

export type PublicCase = Omit<WorkshopCase, 'draftFields' | 'material' | 'equipment' | 'quantity' | 'iterations' | 'leadTime' | 'result'> & {
  verifiedFacts: { label: string; value: string }[];
};

export const cases: WorkshopCase[] = [
  {
    title: 'Шаблон кейса: функциональная деталь',
    slug: 'shablon-funktsionalnoy-detali',
    status: 'demo',
    industry: 'Демонстрационный сценарий',
    taskType: 'Структура будущего кейса',
    problem: 'Этот материал показывает, какие факты нужно собрать после реальной работы. Он не является выполненным заказом мастерской.',
    inputData: ['назначение изделия;', 'исходный файл, чертёж или физический образец;', 'размеры и условия эксплуатации;', 'критерий проверки.'],
    engineeringWork: ['квалификация задачи;', 'подготовка или проверка модели;', 'согласование пилота;', 'фиксация принятой ревизии.'],
    material: '',
    equipment: '',
    quantity: '',
    iterations: '',
    leadTime: '',
    acceptanceMethod: ['измеримый критерий, согласованный до изготовления;', 'безопасная проверка функции или посадки.'],
    result: '',
    repeatPotential: 'После реального пилота здесь фиксируется основание для партии, новой ревизии или повтора.',
    images: [],
    confidentialityNote: 'Демонстрационный шаблон. Клиент, изделие и результат не существуют.',
    verifiedFields: ['title', 'slug', 'status', 'industry', 'taskType', 'problem', 'inputData', 'engineeringWork', 'acceptanceMethod', 'repeatPotential', 'confidentialityNote'],
    draftFields: {
      material: 'Заполнить только по производственной карточке.',
      equipment: 'Заполнить после подтверждения Евгения.',
      quantity: 'Подтвердить документом или карточкой заказа.',
      iterations: 'Указать фактическое число ревизий.',
      leadTime: 'Указать фактический срок без рекламного округления.',
      result: 'Подтвердить измеримым результатом и разрешением на публикацию.',
    },
  },
];

const factLabels: Partial<Record<keyof WorkshopCase, string>> = {
  material: 'Материал',
  equipment: 'Оборудование',
  quantity: 'Количество',
  iterations: 'Итерации',
  leadTime: 'Срок',
  result: 'Результат',
};

export function toPublicCase(item: WorkshopCase): PublicCase {
  const verifiedFacts = item.verifiedFields.flatMap((field) => {
    const label = factLabels[field];
    const value = item[field];
    return label && typeof value === 'string' && value ? [{ label, value }] : [];
  });

  const { draftFields: _draftFields, material: _material, equipment: _equipment, quantity: _quantity, iterations: _iterations, leadTime: _leadTime, result: _result, ...safe } = item;
  return { ...safe, verifiedFacts };
}

export const publicCases = cases.map(toPublicCase);
