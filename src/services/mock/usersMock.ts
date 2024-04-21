import { IParams } from '../../types';

const following = [
  {
    id: '1',
    username: 'Flo.Monahan',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/robertoachar',
  },
  {
    id: '2',
    username: 'Pedro.c0',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/lucasborgesdev',
  },
];

const followers = [
  {
    id: '3',
    username: 'Damien13',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/ChristianLempa',
  },
  {
    id: '4',
    username: 'Louisa.Johnston68',
    full_name: 'John Doe',
    profile_pic_url: 'https://avatars.githubusercontent.com/ViniciusLibarino',
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
    }, 2 * 1000);
  });
}
