export async function loadConfig(): Promise<{ backendUrl: string }> {
  const res = await fetch('/config.json');
  if (!res.ok) throw new Error('Konnte config.json nicht laden');
  return await res.json();
}