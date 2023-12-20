import { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useAuthStore } from "../../stores/authStore";
import { useSniffersStore } from "../../stores/sniffersStores";
import { CreateInvocation, SnifferData } from "./SniffersPage/SnifferData";
import { SniffersSideBar } from "./SniffersSideBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import Sniffer from "./SniffersPage/Sniffer";
import InnerPageTemplate from "../../components/inner-page-template/inner-page-template";

interface SnifferPageTemplateProps {
  children?: React.ReactNode;
}
const SnifferPageTemplate: React.FC<SnifferPageTemplateProps> = ({
  children,
}) => {
  const { show: showSnackbar, component: snackBar } = useSnackbar();
  const { loadSniffers } = useSniffersStore();
  const userId = useAuthStore((s) => s.user?.id);

  useEffect(() => {
    if (!userId) return;
    loadSniffers(true).catch(() => {
      showSnackbar("Failed to get sniffers", "error");
    });
  }, [userId]);

  return (
    <InnerPageTemplate
      sideBarComponent={SniffersSideBar}
      contentComponent={() => <>{children}</>}
    />
  );
};

export const SnifferEndpointPage = () => {
  return (
    <SnifferPageTemplate>
      <SnifferData />
    </SnifferPageTemplate>
  );
};

export const CreateInvocationPage = () => {
  return (
    <SnifferPageTemplate>
      <CreateInvocation />
    </SnifferPageTemplate>
  );
};

export const SnifferPage = () => {
  return (
    <SnifferPageTemplate>
      <Sniffer />
    </SnifferPageTemplate>
  );
};

export default SnifferPageTemplate;
