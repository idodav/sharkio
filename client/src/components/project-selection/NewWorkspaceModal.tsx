import {
  Button,
  CircularProgress,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useWorkspaceStore } from "../../stores/workspaceStore";
import { openModal } from "./WorkspaceSelector";

interface EditWorkspaceModalProps {
  modalIsOpen: openModal;
  onCancel: () => void;
}
const NewWorkspaceModal: React.FC<EditWorkspaceModalProps> = ({
  modalIsOpen,
  onCancel,
}) => {
  const [newWorkSpaceName, setNewWorkSpaceName] = useState("");
  const { show: showSnackbar, component: snackBar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createWorkspace, getWorkspaces } = useWorkspaceStore();
  const handleNewWorkSpcaeSave = () => {
    if (newWorkSpaceName === "") {
      showSnackbar("Name cannot be empty or already exists", "error");
      return;
    }
    setIsLoading(true);
    createWorkspace(newWorkSpaceName) //api call
      .then(() => {
        onCancel(), showSnackbar("workspace added", "success");
      })
      .catch(() => showSnackbar("Error adding new workspace", "error"))
      .finally(() => {
        setIsLoading(false);
        getWorkspaces();
      });
    setNewWorkSpaceName("");
  };

  return (
    <>
      {snackBar}
      <Modal
        open={modalIsOpen === "create"}
        onClose={onCancel}
        closeAfterTransition
        className="flex justify-center items-center border-0"
      >
        <Paper className="flex flex-col p-4 w-96 rounded-sm">
          <div className="text-2xl font-bold">Add New Project</div>
          <div className="w-full border-b-[0.05px] my-4" />
          <div className="flex flex-col space-y-2">
            <TextField
              label={"Project Name"}
              placeholder="Project Name"
              onChange={(e) => setNewWorkSpaceName(e.target.value)}
              inputProps={{ maxLength: 25 }}
            />
          </div>
          <div className="flex flex-row justify-start  mt-4 space-x-2">
            <Button
              onClick={handleNewWorkSpcaeSave}
              variant="contained"
              color="success"
            >
              {isLoading ? <CircularProgress /> : "Add"}
            </Button>
            <Button onClick={onCancel} variant="outlined">
              Cancel
            </Button>
          </div>
        </Paper>
      </Modal>
    </>
  );
};

export default NewWorkspaceModal;
