import api from './api';
import { getCookie } from '../utils';
import { IUser } from '../components/types';
import { AxiosResponse } from 'axios';

interface IParams {
  ds_user_id?: string | undefined;
  max_id?: string;
  friendship: 'following' | 'followers';
}

interface IResponseData {
  big_list: boolean;
  next_max_id: string;
  users: IUser[];
}

function urlGenerator(params: IParams) {
  const { ds_user_id, max_id, friendship } = params;

  return `/api/v1/friendships/${ds_user_id}/${friendship}/?count=12${
    max_id ? `&max_id=${max_id}` : ''
  }`;
}

export async function findAll(params: IParams): Promise<IResponseData> {
  const ds_user_id = getCookie('ds_user_id');
  const url = urlGenerator({ ...params, ds_user_id });
  const { data } = await api.get<IResponseData>(url);

  return data;
}
