// used for retrieving and setting data in web and framework through a consistent api surface
export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key))
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = key => {
  localStorage.removeItem(key);
};

