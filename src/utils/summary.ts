const MAX_LENGTH = 90;

export function summarize(content: string, maxLength: number = MAX_LENGTH): string {
  const clean = content.replace(/\s+/g, ' ').trim();

  if (clean.length <= maxLength) {
    return clean;
  }

  return `${clean.slice(0, maxLength).trimEnd()}...`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
