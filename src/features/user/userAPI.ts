export function fetchForgotPass(info = '') {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 2000)
  );
}
