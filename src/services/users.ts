import api from './api';
import { getCookie } from '../utils';
import {
  IFriendshipsDestroyResponse,
  IParams,
  IUserDetails,
  IUserResponseData,
} from '../types';
import { AxiosResponse } from 'axios';

function urlGenerator(params: IParams) {
  const { ds_user_id, max_id, friendship } = params;

  return `/api/v1/friendships/${ds_user_id}/${friendship}/?count=12${
    max_id ? `&max_id=${max_id}` : ''
  }`;
}

export async function findAll(
  params: IParams
): Promise<AxiosResponse<IUserResponseData>> {
  const ds_user_id = getCookie('ds_user_id');
  const url = urlGenerator({ ...params, ds_user_id });
  return api.get<IUserResponseData>(url);
}

export async function unfollowUser(
  userId: string
): Promise<AxiosResponse<IFriendshipsDestroyResponse>> {
  const url = `/api/v1/friendships/destroy/${userId}/`;
  return api.post<IFriendshipsDestroyResponse>(url);
}

export async function getUserDetails(
  username: string
): Promise<AxiosResponse<IUserDetails>> {
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
  return api.get<IUserDetails>(url);
}
