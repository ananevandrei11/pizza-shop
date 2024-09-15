import { User } from '@prisma/client';
import { AXIOS } from './instances';

export const getMe = async () => {
  const { data } = await AXIOS.get<User>('/me');

  return data;
};
