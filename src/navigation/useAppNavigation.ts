import { useRouter } from "expo-router";
import { routes } from "./routes";

export const useAppRouter = () => {
  const router = useRouter();

  return {
    goToPostDetail: (id: string) => router.push(routes.posts.detail(id)),
    back: () => router.back(),
    raw: router,
  };
};
