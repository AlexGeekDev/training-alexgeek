const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  welcome: "/welcome",
  profile: "/profile",
  about: "/about",
  policy: "/policy",
  privacy: "/privacy",
  finder: "/finder",
  reset: "/reset",
  artist: {
    static: "artist/:name",
    dynamic: (name) => `/artist/${name}`,
  },
};

export default routes;
