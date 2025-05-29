export const isValidEmail = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const isStrongPassword = (password) => {
  return password.length >= 6;
};
