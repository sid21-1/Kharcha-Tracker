// whenever you call this hook it is going to return you an object containing all of the user info containing inside of the localstorage
// also you can access any particular varible also from this hook
export const useGetUserInfo = () => {
  // JSON.parse helps us to convert a strify data into an object
  const { name, profilePhoto, userId, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { name, profilePhoto, userId, isAuth };
};
