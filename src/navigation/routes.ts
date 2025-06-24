export const routes = {
  posts: {
    list: "/posts",
    detail: (id: string) => `/posts/${id}`,
  },
};
