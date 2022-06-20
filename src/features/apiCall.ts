import { publicRequest } from '../requestMethod';
export const login = async (user: any) => {
  try {
    const res = await publicRequest.post('/auth/login', user);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
