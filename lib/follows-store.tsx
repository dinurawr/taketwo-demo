"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FollowsContextType = {
  following: string[];
  toggle: (brandId: string) => void;
  isFollowing: (brandId: string) => boolean;
  followingCount: number;
};

const FollowsContext = createContext<FollowsContextType | null>(null);

export function FollowsProvider({ children }: { children: React.ReactNode }) {
  const [following, setFollowing] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("taketwo-follows");
      if (stored) setFollowing(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("taketwo-follows", JSON.stringify(following));
    }
  }, [following, hydrated]);

  const toggle = (brandId: string) => {
    setFollowing((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

  const isFollowing = (brandId: string) => following.includes(brandId);

  return (
    <FollowsContext.Provider
      value={{ following, toggle, isFollowing, followingCount: following.length }}
    >
      {children}
    </FollowsContext.Provider>
  );
}

export function useFollows() {
  const ctx = useContext(FollowsContext);
  if (!ctx) throw new Error("useFollows must be used inside FollowsProvider");
  return ctx;
}
