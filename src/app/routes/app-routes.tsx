import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from '@refinedev/antd';
import { Authenticated } from '@refinedev/core';
import {
  CatchAllNavigate,
  NavigateToResource,
} from '@refinedev/react-router-v6';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Header } from '../../core';
import {
  AttributeOptionCreate,
  AttributeOptionEdit,
  AttributeOptionList,
  AttributeOptionShow,
  AttributeTypeCreate,
  AttributeTypeEdit,
  AttributeTypeList,
  AttributeTypeShow,
  ColorCreate,
  ColorEdit,
  ColorList,
  ColorShow,
  ForgotPassword,
  Login,
  PlacementCreate,
  PlacementEdit,
  PlacementList,
  PlacementShow,
  PlacementWorkingTimeCreate,
  PlacementWorkingTimeEdit,
  PlacementWorkingTimeList,
  PlacementWorkingTimeShow,
  ProductCategoryCreate,
  ProductCategoryEdit,
  ProductCategoryList,
  ProductCategoryShow,
  ProductCreate,
  ProductEdit,
  ProductItemCreate,
  ProductItemEdit,
  ProductItemList,
  ProductItemShow,
  ProductList,
  ProductShow,
  ProductVariationCreate,
  ProductVariationEdit,
  ProductVariationList,
  ProductVariationShow,
  PromoCodeCreate,
  PromoCodeEdit,
  PromoCodeList,
  PromoCodeShow,
  Register,
  SizeCategoryCreate,
  SizeCategoryEdit,
  SizeCategoryList,
  SizeCategoryShow,
  SizeOptionCreate,
  SizeOptionEdit,
  SizeOptionList,
  SizeOptionShow,
} from '../../pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated
            key="authenticated-inner"
            fallback={<CatchAllNavigate to="/login" />}
          >
            <ThemedLayoutV2
              Header={Header}
              Sider={(props) => <ThemedSiderV2 {...props} fixed />}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route
          index
          element={<NavigateToResource resource="size-categories" />}
        />
        <Route path="/size-categories">
          <Route index element={<SizeCategoryList />} />
          <Route path="create" element={<SizeCategoryCreate />} />
          <Route path="edit/:id" element={<SizeCategoryEdit />} />
          <Route path="show/:id" element={<SizeCategoryShow />} />
        </Route>
        <Route path="/size-options">
          <Route index element={<SizeOptionList />} />
          <Route path="create" element={<SizeOptionCreate />} />
          <Route path="edit/:id" element={<SizeOptionEdit />} />
          <Route path="show/:id" element={<SizeOptionShow />} />
        </Route>
        <Route path="/attribute-types">
          <Route index element={<AttributeTypeList />} />
          <Route path="create" element={<AttributeTypeCreate />} />
          <Route path="edit/:id" element={<AttributeTypeEdit />} />
          <Route path="show/:id" element={<AttributeTypeShow />} />
        </Route>
        <Route path="/attribute-options">
          <Route index element={<AttributeOptionList />} />
          <Route path="create" element={<AttributeOptionCreate />} />
          <Route path="edit/:id" element={<AttributeOptionEdit />} />
          <Route path="show/:id" element={<AttributeOptionShow />} />
        </Route>
        <Route path="/colors">
          <Route index element={<ColorList />} />
          <Route path="create" element={<ColorCreate />} />
          <Route path="edit/:id" element={<ColorEdit />} />
          <Route path="show/:id" element={<ColorShow />} />
        </Route>
        <Route path="/promo-codes">
          <Route index element={<PromoCodeList />} />
          <Route path="create" element={<PromoCodeCreate />} />
          <Route path="edit/:id" element={<PromoCodeEdit />} />
          <Route path="show/:id" element={<PromoCodeShow />} />
        </Route>
        <Route path="/placements">
          <Route index element={<PlacementList />} />
          <Route path="create" element={<PlacementCreate />} />
          <Route path="edit/:id" element={<PlacementEdit />} />
          <Route path="show/:id" element={<PlacementShow />} />
        </Route>
        <Route path="/placement-working-times">
          <Route index element={<PlacementWorkingTimeList />} />
          <Route path="create" element={<PlacementWorkingTimeCreate />} />
          <Route path="edit/:id" element={<PlacementWorkingTimeEdit />} />
          <Route path="show/:id" element={<PlacementWorkingTimeShow />} />
        </Route>
        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path="create" element={<ProductCreate />} />
          <Route path="edit/:id" element={<ProductEdit />} />
          <Route path="show/:id" element={<ProductShow />} />
        </Route>
        <Route path="/product-items">
          <Route index element={<ProductItemList />} />
          <Route path="create" element={<ProductItemCreate />} />
          <Route path="edit/:id" element={<ProductItemEdit />} />
          <Route path="show/:id" element={<ProductItemShow />} />
        </Route>
        <Route path="/product-categories">
          <Route index element={<ProductCategoryList />} />
          <Route path="create" element={<ProductCategoryCreate />} />
          <Route path="edit/:id" element={<ProductCategoryEdit />} />
          <Route path="show/:id" element={<ProductCategoryShow />} />
        </Route>
        <Route path="/product-variations">
          <Route index element={<ProductVariationList />} />
          <Route path="create" element={<ProductVariationCreate />} />
          <Route path="edit/:id" element={<ProductVariationEdit />} />
          <Route path="show/:id" element={<ProductVariationShow />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated key="authenticated-outer" fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
};
