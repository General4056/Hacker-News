const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const getStoriesIds = (typeOfNews: string) => {
  return fetch(`${BASE_URL}/${typeOfNews}.json?print=pretty`);
};

export const getItem = (item: number) => {
  return fetch(`${BASE_URL}/item/${item}.json?print=pretty`);
};

export const getUser = (id: string) => {
  return fetch(`${BASE_URL}/user/${id}.json?print=pretty`);
};
