import { Home, Settings, SquareStack, Trash2 } from "lucide-react";

export const data = {
  user: {
    name: "Trishank",
    email: "abc@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: SquareStack,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash2,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export const Recent = [
  { id: "1", title: "Recent Advances in Technology and Sciences" },
  { id: "2", title: "Recent Advances in Technology and Sciences" },
  { id: "3", title: "Recent Advances in Technology and Sciences" },
  { id: "4", title: "Recent Advances in Technology and Sciences" },
];
