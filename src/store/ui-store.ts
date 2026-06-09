import { create } from 'zustand';

type UIState = {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
};

/**
 * Global Zustand store to manage UI states like sidebars and modals.
 */
export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
