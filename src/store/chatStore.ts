import { create } from "zustand";

type ChatStore = {
  triggerRefresh: boolean;
  selectedConversationId: string | null;
  refreshUserList: () => void;
  setSelectedConversationId: (id: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  triggerRefresh: false,
  selectedConversationId: null,
  refreshUserList: () =>
    set((state) => ({ triggerRefresh: !state.triggerRefresh })),
  setSelectedConversationId: (id) => set({ selectedConversationId: id }),
}));
