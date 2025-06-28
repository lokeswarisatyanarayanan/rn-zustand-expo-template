export function hasErrorMessage(data: unknown): data is { message: string } {
  return typeof data === 'object' && data !== null && 'message' in data;
}
