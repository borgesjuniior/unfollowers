function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function urlGenerator(params) {
  const baseUrl = 'https://www.instagram.com';
  const { ds_user_id, max_id, friendship } = params;

  return `${baseUrl}/api/v1/friendships/${ds_user_id}/${friendship}/?count=12${
    max_id ? `&max_id=${max_id}` : ''
  }`;
}

async function getUsers(friendship) {
  const ds_user_id = getCookie('ds_user_id');
  const csrftoken = getCookie('csrftoken');
  const ig_app_id = '936619743392459';
  let next_max_id = 0;
  let big_list = true;
  const users = [];

  while (big_list === true) {
    const url = urlGenerator({ ds_user_id, friendship, max_id: next_max_id });

    const response = await fetch(url, {
      headers: {
        'x-csrftoken': csrftoken,
        'x-ig-app-id': ig_app_id,
      },
    });

    const data = await response.json();
    big_list = data.big_list;
    next_max_id = data.next_max_id;
    users.push(...data?.users);
  }

  return users;
}

async function getUnfollowers() {
  const [following, followers] = await Promise.all([
    getUsers('following'),
    getUsers('followers'),
  ]);

  if (!followers.length) {
    console.log('You have no followers');
    return;
  }

  const userDetails = following.filter((follower) => {
    return !followers.find((f) => f.username === follower.username);
  });

  const unfollowers = userDetails.map((unfollower) => ({
    username: unfollower.username,
    full_name: unfollower.full_name,
  }));

  console.table(unfollowers);
  return unfollowers;
}

getUnfollowers();
