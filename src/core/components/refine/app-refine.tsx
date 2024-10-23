import { AppRoutes } from '@app';
import { useNotificationProvider } from '@refinedev/antd';
import { Refine } from '@refinedev/core';
import { RefineKbar } from '@refinedev/kbar';
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { authProvider, dataProviders } from '@app/providers';
import { resources } from '../../config';
import { AppIcon } from '../app-icon';

export const AppRefine = () => {
  return (
    <Refine
      dataProvider={dataProviders}
      notificationProvider={useNotificationProvider}
      authProvider={authProvider}
      routerProvider={routerBindings}
      resources={resources}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: 'kNoNwd-xUNrU3-DnDQ0A',
        title: { text: 'GX Admin', icon: <AppIcon /> },
      }}
    >
      <AppRoutes />
      <RefineKbar />
      <UnsavedChangesNotifier />
      <DocumentTitleHandler />
    </Refine>
  );
};
