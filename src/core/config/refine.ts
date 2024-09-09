import { RefineProps } from "@refinedev/core";

export const resources: RefineProps["resources"] = [
  {
    name: "size-categories",
    list: "/size-categories",
    create: "/size-categories/create",
    edit: "/size-categories/edit/:id",
    show: "/size-categories/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "size-options",
    list: "/size-options",
    create: "/size-options/create",
    edit: "/size-options/edit/:id",
    show: "/size-options/show/:id",
    meta: {
      canDelete: true,
    },
  },
];
