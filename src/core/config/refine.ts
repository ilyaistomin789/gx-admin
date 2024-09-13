import { RefineProps } from '@refinedev/core';

export const resources: RefineProps['resources'] = [
  {
    name: 'sizes',
  },
  {
    name: 'size-categories',
    list: '/size-categories',
    create: '/size-categories/create',
    edit: '/size-categories/edit/:id',
    show: '/size-categories/show/:id',
    meta: {
      canDelete: true,
      parent: 'sizes',
    },
  },
  {
    name: 'size-options',
    list: '/size-options',
    create: '/size-options/create',
    edit: '/size-options/edit/:id',
    show: '/size-options/show/:id',
    meta: {
      canDelete: true,
      parent: 'sizes',
    },
  },
  {
    name: 'attributes',
  },
  {
    name: 'attribute-types',
    list: '/attribute-types',
    create: '/attribute-types/create',
    edit: '/attribute-types/edit/:id',
    show: '/attribute-types/show/:id',
    meta: {
      canDelete: true,
      parent: 'attributes',
    },
  },
  {
    name: 'attribute-options',
    list: '/attribute-options',
    create: '/attribute-options/create',
    edit: '/attribute-options/edit/:id',
    show: '/attribute-options/show/:id',
    meta: {
      canDelete: true,
      parent: 'attributes',
    },
  },
  {
    name: 'colors',
    list: '/colors',
    create: '/colors/create',
    edit: '/colors/edit/:id',
    show: '/colors/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    name: 'promo-codes',
    list: '/promo-codes',
    create: '/promo-codes/create',
    edit: '/promo-codes/edit/:id',
    show: '/promo-codes/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    name: 'places',
  },
  {
    name: 'placements',
    list: '/placements',
    create: '/placements/create',
    edit: '/placements/edit/:id',
    show: '/placements/show/:id',
    meta: {
      canDelete: true,
      parent: 'places',
    },
  },
  {
    name: 'placement-working-times',
    list: '/placement-working-times',
    create: '/placement-working-times/create',
    edit: '/placement-working-times/edit/:id',
    show: '/placement-working-times/show/:id',
    meta: {
      canDelete: true,
      parent: 'places',
    },
  },
  {
    name: 'product-entities',
  },
  {
    name: 'products',
    list: '/products',
    create: '/products/create',
    edit: '/products/edit/:id',
    show: '/products/show/:id',
    meta: {
      canDelete: true,
      parent: 'products-entity',
    },
  },
];
