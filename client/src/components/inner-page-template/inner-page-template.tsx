import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
interface innerPageTemplateProps {
  sideBarComponent: React.FC;
  contentComponent: React.FC;
}
export const InnerPageTemplate: React.FC<innerPageTemplateProps> = ({
  sideBarComponent: SideBarComponent,
  contentComponent: ContentComponent,
}) => {
  return (
    <PanelGroup direction={"horizontal"} className="max-w-[calc(100vw-56px)]">
      <Panel defaultSize={20} maxSize={90}>
        <div className="flex flex-col h-full border-r border-border-color bg-secondary py-4">
          <SideBarComponent />
        </div>
      </Panel>
      <div className="relative w-[1px] h-full  hover:bg-blue-300">
        <PanelResizeHandle
          className={`absolute w-[30px] h-full left-[-15px] top-0 `}
        />
      </div>
      <Panel maxSize={90}>
        <div className="flex flex-col p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-96px)] ">
          <ContentComponent />
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default InnerPageTemplate;
