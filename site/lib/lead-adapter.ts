export type LeadSubmissionResult = {
  ok: boolean;
  mode: 'mock';
  stored: false;
  message: string;
  errors?: Record<string, string>;
};

export interface LeadAdapter {
  submit(payload: Record<string, string>): Promise<LeadSubmissionResult>;
}

export const mockLeadAdapter: LeadAdapter = {
  async submit(payload) {
    const response = await fetch('/api/lead/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json() as Promise<LeadSubmissionResult>;
  },
};
