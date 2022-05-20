export function fetchUser(info = {}) {
  return new Promise<{ data: object }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 2000)
  );
}

export function fetchForgotPass(info = '') {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 2000)
  );
}
