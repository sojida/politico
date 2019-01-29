const seperateNames = (name) => {
  const names = name.trim().split(' ').filter(item => item !== '');
  if (names.length <= 1) {
    return undefined;
  }
  return names;
};


export default {
  seperateNames,
};
