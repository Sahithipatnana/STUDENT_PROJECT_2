const API_BASE =
  import.meta.env.VITE_API_URL || 'https://student-project-2-xrr8.onrender.com/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const api = {
  listStudents: () => request('/students'),
  createStudent: (payload) =>
    request('/students', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  listAssignments: () => request('/assignments'),
  createAssignment: (payload) =>
    request('/assignments', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  listSubmissions: () => request('/submissions'),
  createSubmission: (payload) =>
    request('/submissions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateSubmissionStatus: (id, status) =>
    request(`/submissions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};
