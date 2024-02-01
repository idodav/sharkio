import { useState } from "react";
import { Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Flow, useFlowStore } from "../../stores/flowStore";
import { FlowNameAndSave } from "./FlowNameAndSaveProps";
import { RunsTab } from "./RunsTab";
import { TestsTab } from "./TestsTab";
import { LoadingIcon } from "../sniffers/LoadingIcon";
import { useParams } from "react-router-dom";

export const FlowContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tabNumber, setTabNumber] = useState("1");
  const { flows, isFlowsLoading } = useFlowStore();
  const { flowId } = useParams();
  const flow = flows.find((f) => f.id === flowId);

  const handleTabChange = (_: any, newValue: string) => {
    setTabNumber(newValue);
  };

  const handleFlowNameChange = (name: string) => {
    // setFlow({ ...flow, name });
  };

  const handleSaveClicked = () => {
    setIsLoading(true);
    console.log("save clicked");
    setIsLoading(false);
  };
  if (!flowId) {
    return null;
  }

  return (
    <>
      {isFlowsLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <FlowNameAndSave
            isLoading={isLoading}
            name={flow?.name ?? ""}
            handleNameChange={handleFlowNameChange}
            handleSaveClicked={handleSaveClicked}
          />
          <TabContext value={tabNumber}>
            <TabList
              onChange={handleTabChange}
              className="border-b-[0.1px] border-border-color"
            >
              <Tab label="Tests" value="1" />
              <Tab label="Runs" value="2" />
            </TabList>
            <TestsTab />
            <RunsTab />
          </TabContext>
        </>
      )}
    </>
  );
};
