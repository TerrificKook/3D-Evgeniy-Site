'use client';

import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Check, Paperclip } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function HomeLeadForm() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [started, setStarted] = useState(false);

  function noteStart() {
    if (!started) {
      setStarted(true);
      trackEvent('lead_form_start', { placement: 'home' });
    }
    setSaved(false);
  }

  function selectFiles(event: ChangeEvent<HTMLInputElement>) {
    noteStart();
    const names = Array.from(event.target.files || []).slice(0, 5).map((file) => file.name);
    setFileNames(names);
    if (names.length > 0) trackEvent('file_attach', { count: names.length, placement: 'home' });
  }

  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const draft = {
      name: getFormText(data, 'name'),
      contact: getFormText(data, 'contact'),
      description: getFormText(data, 'description'),
      quantity: getFormText(data, 'quantity'),
      fileNames,
      savedAt: new Date().toISOString(),
    };
    window.localStorage.setItem('workshop-home-lead-draft', JSON.stringify(draft));
    setSaved(true);
    trackEvent('lead_form_submit_success', { mode: 'local-draft', placement: 'home' });
  }

  return (
    <form className="home-lead-form" id="task-form" onChange={noteStart} onSubmit={submit}>
      <div className="form-title">
        <span>Короткая форма</span>
        <strong>Расскажите, что нужно сделать</strong>
      </div>
      <div className="form-row">
        <label>
          <span>Имя</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Телефон / Telegram</span>
          <input name="contact" autoComplete="tel" required />
        </label>
      </div>
      <label>
        <span>Описание задачи</span>
        <textarea name="description" rows={4} required />
      </label>
      <div className="form-row form-row-bottom">
        <label>
          <span>Количество</span>
          <input name="quantity" inputMode="numeric" />
        </label>
        <label className="file-control">
          <span>Файл / фото</span>
          <span className="file-button"><Paperclip aria-hidden="true" size={17} />{fileNames.length > 0 ? `Выбрано: ${fileNames.length}` : 'Прикрепить'}</span>
          <input type="file" multiple onChange={selectFiles} />
        </label>
      </div>
      <p className="form-hint">Если файла нет, достаточно фотографии и примерных размеров.</p>
      <button className="button button-primary button-large" type="submit">Сохранить черновик</button>
      <p className="form-mode">Форма пока сохраняет черновик только на этом устройстве и ничего не отправляет.</p>
      {saved && <output className="draft-saved"><Check aria-hidden="true" size={18} />Черновик сохранён в этом браузере.</output>}
    </form>
  );
}

function getFormText(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === 'string' ? value : '';
}
