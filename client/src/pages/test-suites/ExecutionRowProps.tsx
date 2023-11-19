import * as React from "react";
import { TableRow } from "@mui/material";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { ExecutionDetails } from "./ExecutionDetailsProps";

type ExecutionRowProps = {
  status: "success" | "failure";
  title: string;
  passed: number;
  failed: number;
  executionDate: string;
  checks: {
    type: "status_code" | "header" | "body";
    isPassed: boolean;
    expectedValue: string;
    actualValue: string;
    targetPath: string;
    comparator: "equals";
  }[];
};

export const ExecutionRow = ({
  status,
  title,
  passed,
  failed,
  checks,
  executionDate,
}: ExecutionRowProps) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <TableRow className="border-t-[1px] border-primary h-10 w-full">
      <div className="flex flex-col items-center w-full p-4 space-y-4">
        <div
          className="flex flex-row items-center justify-between hover:cursor-pointer active:bg-secondary transition-all duration-500 w-full"
          onClick={() => setShow(!show)}
        >
          <div className="flex flex-row items-center space-x-4">
            {status === "failure" ? (
              <AiOutlineCloseCircle className="text-red-400 text-2xl" />
            ) : (
              <AiOutlineCheckCircle className="text-green-400 text-2xl" />
            )}
            <div className="flex flex-col h-full">
              <span className="text-lg font-bold hover:cursor-pointer hover:scale-105">
                {title}
              </span>
              <span className="text-xs">
                {new Date(executionDate).toDateString()}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <div className="flex flex-col h-full">
              <span className="text-xs">Passed: {passed}</span>
              <span className="text-xs">Errors: {failed}</span>
            </div>
            {show ? (
              <FiChevronRight className="text-gray-400 text-2xl transform rotate-90" />
            ) : (
              <FiChevronRight className="text-gray-400 text-2xl" />
            )}
          </div>
        </div>
        {show && (
          <div className="flex flex-col bg-primary rounded-lg w-full transition-all duration-500 border-[1px] border-border-color ">
            {checks.map((check, i) => (
              <ExecutionDetails
                targetPath={check.targetPath}
                status={check.isPassed ? "success" : "failure"}
                type={check.type}
                key={i}
                expectedValue={check.expectedValue}
                actualValue={check.actualValue}
              />
            ))}
          </div>
        )}
      </div>
    </TableRow>
  );
};
