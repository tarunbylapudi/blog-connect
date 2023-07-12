const ROUTES = [
  {
    url: "/api/v1/blogsite/user/login",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8000",
    },
  },
  {
    url: "/api/v1/blogsite/user/register",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8000",
    },
  },
  {
    url: "/api/v1/blogsite/user/tarun",
    auth: true,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8000",
    },
  },
];

module.exports = ROUTES;
