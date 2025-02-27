import { usePresenceState } from "@/states/zustand/animation-state";
import { useRouter } from "next/navigation";

export const useTransitionRouter = () => {
  const router = useRouter();
  const presenceState = usePresenceState();

  const interceptedPush = async (url: string, as = undefined) => {
    presenceState.setPresenceState("presence");
    return router.push(url, as);
  };

  return { ...router, push: interceptedPush };
};
