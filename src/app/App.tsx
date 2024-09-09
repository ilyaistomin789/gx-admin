import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbarProvider } from "@refinedev/kbar";
import "@refinedev/antd/dist/reset.css";
import { App as AntdApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import { AppRefine, ColorModeContextProvider } from "../core";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <AppRefine />
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export { App };
