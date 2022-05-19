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
  user: {
    static: "user/:name",
    dynamic: (name) => `/user/${name}`,
  },
};

export default routes;
