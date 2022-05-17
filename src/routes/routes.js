const routes = {
  home: "/",
  dashboard: "/dashboard",
  dashboardArtist: "/dashboardartist",
  login: "/login",
  signup: "/signup",
  signupArtist: "signupartist",
  welcome: "/welcome",
  profile: "/profile",
  profileArtist: "/profileartist",
  suartist: "/suartist",
  bookArtist: "/bookartist",
  balanceArtist: "/balanceartist",
  balance: "/balance",
  search: "/search",
  artist: {
    static: "artist/:name",
    dynamic: (name) => `/artist/${name}`,
  },
};

export default routes;
