import { IParams } from '../../types';

const following = [
  {
    id: '1',
    username: 'Flo.Monahan',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/u/167497136?v=4',
  },
  {
    id: '2',
    username: 'Foawretched',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/u/167497136?v=4',
  },
  {
    id: '3',
    username: 'Wretchedstein',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/u/167497136?v=4',
  },
  {
    id: '4',
    username: 'ExultantBernborough',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/u/167497136?v=4',
  },
  {
    id: '5',
    username: 'WreghBered',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/u/167497136?v=4',
  },
  {
    id: '6',
    username: 'DevilishWretched',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/u/167497136?v=4',
  },
  {
    id: '7',
    username: 'Bernboroughoff',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/u/167497136?v=4',
  },
  {
    id: '8',
    username: 'Wretchedchenko',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/u/167497136?v=4',
  },
];

const followers = [
  {
    id: '1',
    username: 'Damien13',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/ChristianLempa',
  },
];

export async function findAllMock({ friendship }: IParams): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          big_list: false,
          users: friendship === 'following' ? following : followers,
          next_max_id: '12',
        },
      });
    }, 3 * 1000);
  });
}
