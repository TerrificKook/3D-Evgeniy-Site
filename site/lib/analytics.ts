export type AnalyticsEvent =
  | 'cta_click'
  | 'service_select'
  | 'lead_form_start'
  | 'lead_form_step_complete'
  | 'file_attach'
  | 'lead_form_submit_success'
  | 'lead_form_submit_error'
  | 'messenger_click'
  | 'phone_click'
  | 'case_view';

declare global {
  interface Window {
    ym?: (counterId: number, method: string, target: string, params?: Record<string, unknown>) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const counterId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  if (Number.isInteger(counterId) && counterId > 0 && window.ym) {
    window.ym(counterId, 'reachGoal', event, params);
  }
  window.dispatchEvent(new CustomEvent('workshop:analytics', { detail: { event, params } }));
}
