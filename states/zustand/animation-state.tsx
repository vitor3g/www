import { create } from "zustand";

export type Presence = "presence" | undefined;

type StoreShape = {
  presence: Presence;
  setPresenceState: (presence: "presence") => void;
};

export const usePresenceState = create<StoreShape>((set) => ({
  presence: undefined,
  setPresenceState: (presence) => set({ presence }),
}));
