export interface IUser {
  id: string;
  full_name: string;
  profile_pic_url: string;
  username: string;
}

export interface IParams {
  ds_user_id?: string | undefined;
  max_id?: string;
  friendship: 'following' | 'followers';
}

export interface IUserResponseData {
  big_list: boolean;
  next_max_id: string;
  users: IUser[];
}

export interface IFriendshipsDestroyResponse {
  status: string;
}

export interface IUserDetails {
  data: {
    user: IUser;
    status: string;
  };
}
