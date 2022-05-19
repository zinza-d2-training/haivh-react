export function fetchUser(info = {}) {
  return new Promise<{ data: object }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 500)
  );
}
