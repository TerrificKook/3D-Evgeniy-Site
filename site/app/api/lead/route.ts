const allowedTaskTypes = new Set(['detal-po-obraztsu', 'korpusa-dlya-elektroniki', 'osnastka-i-konduktory', 'drugoe']);

const requiredFields: Record<string, string> = {
  taskType: 'Выберите тип задачи.',
  description: 'Кратко опишите задачу.',
  usage: 'Укажите, где используется изделие.',
  failureConsequences: 'Опишите последствия отказа.',
  inputData: 'Укажите доступные исходные данные.',
  dimensions: 'Укажите основные размеры или напишите, что их пока нет.',
  quantityNow: 'Укажите количество сейчас.',
  conditions: 'Опишите условия эксплуатации.',
  desiredDeadline: 'Укажите желаемый срок или его отсутствие.',
  acceptanceMethod: 'Опишите, как будете проверять результат.',
  customerStatus: 'Укажите компанию или статус физлица.',
  name: 'Укажите имя.',
  contact: 'Укажите телефон, email или мессенджер.',
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, mode: 'mock', stored: false, message: 'Не удалось прочитать данные формы.' }, { status: 400 });
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    return Response.json({ ok: false, mode: 'mock', stored: false, message: 'Форма отклонена защитой от спама.' }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  for (const [field, message] of Object.entries(requiredFields)) {
    if (typeof body[field] !== 'string' || !body[field].trim()) errors[field] = message;
  }
  if (typeof body.taskType === 'string' && !allowedTaskTypes.has(body.taskType)) errors.taskType = 'Выберите допустимый тип задачи.';
  if (body.consent !== 'true') errors.consent = 'Нужно подтвердить ознакомление со staging-режимом обработки.';
  if (typeof body.description === 'string' && body.description.length > 3000) errors.description = 'Описание должно быть короче 3000 символов.';

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, mode: 'mock', stored: false, message: 'Проверьте обязательные поля.', errors }, { status: 422 });
  }

  return Response.json({
    ok: true,
    mode: 'mock',
    stored: false,
    message: 'Проверка пройдена. Данные не отправлены и не сохранены на сервере; черновик остаётся только в этом браузере.',
  });
}
