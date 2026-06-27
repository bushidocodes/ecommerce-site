// Tiny wrappers around the native `fetch` API for same-origin JSON requests.

async function toError(res: Response): Promise<Error> {
  let message = `HTTP ${res.status}`;
  try {
    const data = await res.clone().json();
    if (data?.message) message = data.message;
  } catch {
    /* response had no JSON body */
  }
  return new Error(message);
}

export async function getJSON<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw await toError(res);
  return res.json();
}

export async function postJSON(url: string, body?: unknown): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw await toError(res);
}
