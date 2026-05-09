"use client";

import { createContext, useContext, useState } from "react";

type MenuContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MenuContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
