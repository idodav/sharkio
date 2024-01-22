import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { workSpaceType } from "../../stores/workspaceStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Radio } from "@mui/material";

interface projectItemProps {
  workspace: workSpaceType;
  isSelected: boolean;
  isDefault?: boolean;
}
const WorkspaceItem: React.FC<projectItemProps> = ({
  workspace,
  isSelected,
  isDefault = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEditWorkspace = (
    e: React.MouseEvent,
    workSpace: workSpaceType,
  ) => {
    e.stopPropagation();
    const params = new URLSearchParams(location.search);
    params.set("editedWorkspaceId", workSpace.id);
    location.search = params.toString();
    navigate(location);
  };
  const handleDeleteWorkspace = (
    e: React.MouseEvent,
    workSpace: workSpaceType,
  ) => {
    e.stopPropagation();
    const params = new URLSearchParams(location.search);
    params.set("deletedWorkspaceId", workSpace.id);
    location.search = params.toString();
    navigate(location);
  };

  return (
    <div className="flex items-center w-full justify-between gap-6">
      <div className="flex items-center gap-1 hover:text-green-100">
        <Radio checked={isSelected} size="small" />
        {workspace.name}
      </div>
      {!isDefault && (
        <div className="flex items-end space-x-2 ">
          <AiOutlineEdit
            className="text-amber-500 text-lg hover:text-amber-700"
            onClick={(e: React.MouseEvent) => handleEditWorkspace(e, workspace)}
          />
          <AiOutlineDelete
            className="text-red-500 text-lg hover:text-red-700"
            onClick={(e: React.MouseEvent) =>
              handleDeleteWorkspace(e, workspace)
            }
          />
        </div>
      )}
    </div>
  );
};

export default WorkspaceItem;
