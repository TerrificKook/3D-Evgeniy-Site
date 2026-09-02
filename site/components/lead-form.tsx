'use client';

import { ChangeEvent, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, FileText, ShieldAlert } from 'lucide-react';
import { mockLeadAdapter, type LeadSubmissionResult } from '@/lib/lead-adapter';
import { trackEvent } from '@/lib/analytics';

type LeadDraft = {
  taskType: string;
  description: string;
  usage: string;
  failureConsequences: string;
  inputData: string;
  dimensions: string;
  quantityNow: string;
  annualQuantity: string;
  conditions: string;
  desiredDeadline: string;
  acceptanceMethod: string;
  customerStatus: string;
  name: string;
  contact: string;
  website: string;
  consent: boolean;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
};

const emptyDraft: LeadDraft = {
  taskType: '', description: '', usage: '', failureConsequences: '', inputData: '', dimensions: '',
  quantityNow: '', annualQuantity: '', conditions: '', desiredDeadline: '', acceptanceMethod: '',
  customerStatus: '', name: '', contact: '', website: '', consent: false,
  utmSource: '', utmMedium: '', utmCampaign: '', referrer: '',
};

const stepFields: (keyof LeadDraft)[][] = [
  ['taskType', 'description', 'usage', 'failureConsequences'],
  ['inputData', 'dimensions', 'quantityNow', 'conditions', 'desiredDeadline', 'acceptanceMethod'],
  ['customerStatus', 'name', 'contact', 'consent'],
];

const labels: Partial<Record<keyof LeadDraft, string>> = {
  taskType: 'Выберите тип задачи.', description: 'Опишите задачу.', usage: 'Укажите применение.',
  failureConsequences: 'Опишите последствия отказа.', inputData: 'Укажите исходные данные.',
  dimensions: 'Укажите размеры или их отсутствие.', quantityNow: 'Укажите количество.',
  conditions: 'Опишите условия.', desiredDeadline: 'Укажите желаемый срок.',
  acceptanceMethod: 'Опишите проверку.', customerStatus: 'Укажите статус.',
  name: 'Укажите имя.', contact: 'Укажите способ связи.',
  consent: 'Подтвердите ознакомление со staging-режимом.',
};

export function LeadForm() {
  const [draft, setDraft] = useState<LeadDraft>(emptyDraft);
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<LeadSubmissionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem('workshop-lead-draft');
      const params = new URLSearchParams(window.location.search);
      const fromStorage = stored ? JSON.parse(stored) as Partial<LeadDraft> : {};
      setDraft({
        ...emptyDraft,
        ...fromStorage,
        taskType: params.get('service') || fromStorage.taskType || '',
        utmSource: params.get('utm_source') || fromStorage.utmSource || '',
        utmMedium: params.get('utm_medium') || fromStorage.utmMedium || '',
        utmCampaign: params.get('utm_campaign') || fromStorage.utmCampaign || '',
        referrer: fromStorage.referrer || document.referrer,
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('workshop-lead-draft', JSON.stringify(draft));
  }, [draft]);

  const progress = useMemo(() => Math.round(((step + 1) / 3) * 100), [step]);

  function update(field: keyof LeadDraft, value: string | boolean) {
    if (!started) { setStarted(true); trackEvent('lead_form_start'); }
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    if (field === 'taskType') trackEvent('service_select', { service: value });
  }

  function validateStep(index: number) {
    const nextErrors: Record<string, string> = {};
    for (const field of stepFields[index]) {
      const value = draft[field];
      if ((typeof value === 'string' && !value.trim()) || value === false) nextErrors[field] = labels[field] || 'Заполните поле.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    trackEvent('lead_form_step_complete', { step: step + 1 });
    setStep((current) => Math.min(2, current + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || []).slice(0, 5);
    setFiles(selected);
    if (selected.length) trackEvent('file_attach', { count: selected.length });
  }

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    setResult(null);
    const payload = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, String(value)]));
    payload.fileNames = files.map((file) => file.name).join(', ');
    try {
      const response = await mockLeadAdapter.submit(payload);
      setResult(response);
      setErrors(response.errors || {});
      trackEvent(response.ok ? 'lead_form_submit_success' : 'lead_form_submit_error', { mode: 'mock' });
    } catch {
      const response: LeadSubmissionResult = { ok: false, mode: 'mock', stored: false, message: 'Локальная проверка сейчас недоступна. Черновик сохранён в браузере.' };
      setResult(response);
      trackEvent('lead_form_submit_error', { mode: 'mock', reason: 'network' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div className="form-progress" aria-label={`Шаг ${step + 1} из 3`}>
        <div><span>Шаг {step + 1} из 3</span><span>{progress}%</span></div>
        <progress max="100" value={progress}>{progress}%</progress>
      </div>

      {step === 0 && (
        <fieldset>
          <legend>Задача и риск</legend>
          <FormField label="Тип задачи" error={errors.taskType}>
            <select value={draft.taskType} onChange={(event) => update('taskType', event.target.value)}>
              <option value="">Выберите вариант</option>
              <option value="detal-po-obraztsu">Деталь по образцу</option>
              <option value="korpusa-dlya-elektroniki">Корпус электроники</option>
              <option value="osnastka-i-konduktory">Оснастка или кондуктор</option>
              <option value="drugoe">Другое</option>
            </select>
          </FormField>
          <FormField label="Кратко опишите задачу" error={errors.description}>
            <textarea rows={5} value={draft.description} onChange={(event) => update('description', event.target.value)} maxLength={3000} />
          </FormField>
          <div className="form-two-columns">
            <FormField label="Где используется изделие" error={errors.usage}>
              <textarea rows={4} value={draft.usage} onChange={(event) => update('usage', event.target.value)} />
            </FormField>
            <FormField label="Что произойдёт при отказе" error={errors.failureConsequences}>
              <textarea rows={4} value={draft.failureConsequences} onChange={(event) => update('failureConsequences', event.target.value)} />
            </FormField>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend>Исходные данные и проверка</legend>
          <FormField label="Что уже есть: STL/STEP, чертёж, эскиз, фото, образец или ничего" error={errors.inputData}>
            <input value={draft.inputData} onChange={(event) => update('inputData', event.target.value)} />
          </FormField>
          <div className="form-two-columns">
            <FormField label="Основные размеры" error={errors.dimensions}>
              <input value={draft.dimensions} onChange={(event) => update('dimensions', event.target.value)} />
            </FormField>
            <FormField label="Количество сейчас" error={errors.quantityNow}>
              <input value={draft.quantityNow} onChange={(event) => update('quantityNow', event.target.value)} />
            </FormField>
          </div>
          <FormField label="Возможное количество в год или повторяемость">
            <input value={draft.annualQuantity} onChange={(event) => update('annualQuantity', event.target.value)} />
          </FormField>
          <FormField label="Условия: помещение/улица, температура, влага, химия, нагрузка, цикличность" error={errors.conditions}>
            <textarea rows={4} value={draft.conditions} onChange={(event) => update('conditions', event.target.value)} />
          </FormField>
          <div className="form-two-columns">
            <FormField label="Желаемый срок" error={errors.desiredDeadline}>
              <input value={draft.desiredDeadline} onChange={(event) => update('desiredDeadline', event.target.value)} />
            </FormField>
            <FormField label="Как будете проверять результат" error={errors.acceptanceMethod}>
              <textarea rows={3} value={draft.acceptanceMethod} onChange={(event) => update('acceptanceMethod', event.target.value)} />
            </FormField>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>Контакт и локальный черновик</legend>
          <div className="mock-alert"><ShieldAlert aria-hidden="true" size={22} /><p><strong>Форма не отправляет заявку.</strong> Сервер только проверит поля, а черновик останется в вашем браузере.</p></div>
          <div className="form-two-columns">
            <FormField label="Компания или статус физлица" error={errors.customerStatus}>
              <input value={draft.customerStatus} onChange={(event) => update('customerStatus', event.target.value)} />
            </FormField>
            <FormField label="Имя" error={errors.name}>
              <input autoComplete="name" value={draft.name} onChange={(event) => update('name', event.target.value)} />
            </FormField>
          </div>
          <FormField label="Телефон, email или мессенджер" error={errors.contact}>
            <input value={draft.contact} onChange={(event) => update('contact', event.target.value)} />
          </FormField>
          <FormField label="Файлы для будущей отправки (до 5; сейчас сохраняются только названия)">
            <input type="file" multiple onChange={selectFiles} />
          </FormField>
          {files.length > 0 && <ul className="file-list">{files.map((file) => <li key={file.name + file.lastModified}><FileText aria-hidden="true" size={16} />{file.name}</li>)}</ul>}
          <div className="honeypot" aria-hidden="true">
            <label>Ваш сайт<input tabIndex={-1} autoComplete="off" value={draft.website} onChange={(event) => update('website', event.target.value)} /></label>
          </div>
          <label className="consent-row">
            <input type="checkbox" checked={draft.consent} onChange={(event) => update('consent', event.target.checked)} />
            <span>Я понимаю, что это staging: данные не отправляются получателю и не сохраняются на сервере.</span>
          </label>
          {errors.consent && <p className="field-error">{errors.consent}</p>}
        </fieldset>
      )}

      {result && (
        <output className={`form-result ${result.ok ? 'success' : 'error'}`}>
          {result.ok && <Check aria-hidden="true" size={22} />}<p>{result.message}</p>
        </output>
      )}

      <div className="form-actions">
        {step > 0 && <button className="button button-secondary" type="button" onClick={() => setStep((current) => current - 1)}><ChevronLeft size={18} />Назад</button>}
        {step < 2
          ? <button className="button button-primary" type="button" onClick={nextStep}>Продолжить<ChevronRight size={18} /></button>
          : <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Проверяем…' : 'Проверить mock-заявку'}</button>}
      </div>
    </form>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
