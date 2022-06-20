// import { UserInfo } from './userSlice';

// export function fetchUser(
//   info = {
//     email: '',
//     password: ''
//   }
// ) {
//   return new Promise<{ data: UserInfo }>((resolve) =>
//     setTimeout(() => resolve({ data: info }), 2000)
//   );
// }

export function fetchForgotPass(info = '') {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: info }), 2000)
  );
}
