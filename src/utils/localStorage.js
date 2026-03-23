const PROFILE_KEY = '9lives_profile';
const FRIENDS_KEY = '9lives_friends';

export function loadProfile() {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearProfile() {
  localStorage.removeItem(PROFILE_KEY);
}

export function loadFriends() {
  try {
    const data = localStorage.getItem(FRIENDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveFriends(friends) {
  localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
}
