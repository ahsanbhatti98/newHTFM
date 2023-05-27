const constant = {
  //App Constants
  socketIP: "192.34.60.217",
  socketPort: "1233",
  baseURL: "http://web.hardtofindmaps.com",
  // applicationToken: "",
  //Services Constants
  login: "/api/login.php",
  location: "/api/locations.php",
  signUp: "api/signup.php",
  updateProfile: "api/profile.php",
  getHistory: "api/history.php",
  setFavorite: "api/add-favourite.php",
  removeFavorite: "api/remove-favourite.php",
  addHistory: "api/add-history.php",
  removeHistory: "api/remove-history.php",
  getFavorite: "api/favourites.php",
  deleteUser: "api/delete.php",

  LOCATION_TIME_OUT: 10000,
  LOCATION_MAX_AGE: 1000,
  LOCATION_HIGH_ACCURACY: false,
};

export default constant;
