import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthWrapper } from "./AuthWrapper";
import { LandingPage } from "./LandingPage";
import { PageTemplate } from "./components/page-template/page-template";
import { routes } from "./constants/routes";
import APIKeys from "./pages/api-keys/api-keys";
import AuthUI from "./pages/auth/Auth";
import { SharkioDocsGettingStartedPage } from "./pages/docs/SharkioDocsGettingStartedPage";
import { SharkioDocsSetupPage } from "./pages/docs/SharkioDocsSetupPage";
import {
  CreateInvocationPage,
  LiveSnifferPage,
  SnifferEndpointPage,
  SnifferPage,
} from "./pages/sniffers/SniffersPage";
import { useAuthStore } from "./stores/authStore";
import { useThemeStore } from "./stores/themeStore";
import { ChatPage } from "./pages/chat/chat";
import TestSuitePage from "./pages/test-suites/testSuitePage";

const MockPage = () => {
  return (
    <div className={`flex h-full flex-row w-[calc(100vw-56px)]`}>
      <div className="flex flex-col h-full min-w-[240px] w-[240px] border-r border-border-color bg-secondary py-4"></div>

      <div className="flex flex-col max-h-[calc(100vh-96px)] w-[calc(100vw-56px-240px)] p-4 space-y-4 overflow-y-auto"></div>
    </div>
  );
};

function App(): React.JSX.Element {
  const { mode } = useThemeStore();
  const { user } = useAuthStore();

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const routesWithAuth = () => {
    const routesWithAuth = [
      { path: routes.API_KEYS, element: <APIKeys /> },
      { path: routes.LIVE, element: <LiveSnifferPage /> },
      { path: routes.SNIFFER, element: <SnifferPage /> },
      { path: routes.SNIFFER_ENDPOINT, element: <SnifferEndpointPage /> },
      {
        path: routes.SNIFFER_ENDPOINT_INVOCATION,
        element: <SnifferEndpointPage />,
      },
      {
        path: routes.SNIFFER_CREATE_INVOCATION,
        element: <CreateInvocationPage />,
      },
      { path: routes.LIVE_INVOCATION, element: <LiveSnifferPage /> },
      { path: routes.CHAT, element: <ChatPage /> },
      { path: routes.TEST_SUITES, element: <TestSuitePage /> },
      { path: routes.TEST_SUITE, element: <TestSuitePage /> },
      { path: routes.TEST_SUITE_TEST, element: <TestSuitePage /> },
      { path: routes.TEST_ENDPOINT, element: <TestSuitePage /> },
      { path: routes.MOCKS, element: <MockPage /> },
    ];

    return routesWithAuth.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={
          <PageTemplate>
            <AuthUI>{element}</AuthUI>
          </PageTemplate>
        }
      />
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthWrapper>
          <Routes>
            {routesWithAuth()}
            <Route
              path={"*"}
              element={
                <PageTemplate>
                  {user ? <LiveSnifferPage /> : <LandingPage />}
                </PageTemplate>
              }
            />
            <Route
              path={routes.DOCS_GETTING_STARTED}
              element={
                <PageTemplate isSideBar={false}>
                  <SharkioDocsGettingStartedPage />
                </PageTemplate>
              }
            />
            <Route
              path={routes.DOCS_SETUP}
              element={
                <PageTemplate isSideBar={false}>
                  <SharkioDocsSetupPage />
                </PageTemplate>
              }
            />
            <Route
              path={routes.LOGIN}
              element={
                <PageTemplate>
                  <AuthUI />
                </PageTemplate>
              }
            />
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
