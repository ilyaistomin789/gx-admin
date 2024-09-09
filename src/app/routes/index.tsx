import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Outlet, Route, Routes } from "react-router-dom";
import {
  SizeCategoryCreate,
  SizeCategoryEdit,
  SizeCategoryList,
  SizeCategoryShow,
} from "../../pages/size-category";
import {
  SizeOptionCreate,
  SizeOptionEdit,
  SizeOptionList,
  SizeOptionShow,
} from "../../pages/size-option";
import { Login } from "../../pages/login";
import { Register } from "../../pages/register";
import { ForgotPassword } from "../../pages/forgot-password";
import { Header } from "../../core";

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
