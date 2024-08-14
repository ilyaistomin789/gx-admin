import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import { Refine } from "@refinedev/core";
import { RefineKbar } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { authProvider } from "../../../authProvider";
import { resources } from "../../config";
import { AppIcon } from "../app-icon";
import { AppRoutes } from "../../../app";

export const AppRefine = () => {
  const API_URL = "https://api.nestjsx-crud.refine.dev";
  const dataProvider = nestjsxCrudDataProvider(API_URL);
  return (
    <Refine
      dataProvider={dataProvider}
      notificationProvider={useNotificationProvider}
      authProvider={authProvider}
      routerProvider={routerBindings}
      resources={resources}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: "kNoNwd-xUNrU3-DnDQ0A",
        title: { text: "GX Admin", icon: <AppIcon /> },
      }}
    >
      <AppRoutes />
      <RefineKbar />
      <UnsavedChangesNotifier />
      <DocumentTitleHandler />
    </Refine>
  );
};
