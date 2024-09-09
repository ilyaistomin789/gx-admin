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
    name: "categories",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    show: "/categories/show/:id",
    meta: {
      canDelete: true,
    },
  },
];
