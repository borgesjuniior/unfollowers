import api from './api';
import { getCookie } from '../utils';
import { IUser } from '../types';
import { AxiosResponse } from 'axios';

interface IParams {
  ds_user_id?: string | undefined;
  max_id?: string;
  friendship: 'following' | 'followers';
}

interface IUserResponseData {
  big_list: boolean;
  next_max_id: string;
  users: IUser[];
}

interface IFriendshipsDestroyResponse {
  status: string;
}

interface IUserDetails {
  data: {
    user: IUser;
    status: string;
  };
}

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

// async function findAllMock(): Promise<any> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         data: {
//           big_list: false,
//           users: [
//             {
//               id: '1',
//               username: 'JohnDoe',
//               full_name: 'John Doe',
//               profile_pic_url:
//                 'https://avatars.githubusercontent.com/borgesjuniior',
//             },
//           ],
//           next_max_id: '12',
//         },
//       });
//     }, 2 * 1000);
//   });
// }
