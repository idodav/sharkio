import { workSpaceType } from "../stores/workspaceStore";
import { BackendAxios } from "./backendAxios";

export const getUserWorkspaces = async () => {
  return await BackendAxios.get<workSpaceType[]>("/workspace");
};
export const getWorkspaceUsers = async (workspaceId: string) => {
  return await BackendAxios.get<workSpaceType[]>(
    `/workspace/${workspaceId}/users`,
  );
};

export const addWorkspaceUser = async (workspaceId: string, userId: string) => {
  return await BackendAxios.post(`/workspace/${workspaceId}/users`, {
    newUserId: userId,
  });
};

export const checkIsMember = async (workspaceId: string, userId: string) => {
  return await BackendAxios.post(`/workspace/${workspaceId}/users/isMember`, {
    userId,
  });
};

export const removeUserFromWorkspace = async (
  workspaceId: string,
  userId: string,
) => {
  return await BackendAxios.delete(`/workspace/${workspaceId}/users/${userId}`);
};

export const getWorkspace = async (workSpaceId: string) => {
  return await BackendAxios.get<workSpaceType>(`/workspace/${workSpaceId}`);
};

export const deleteWorkSpace = async (workSpaceId: string) => {
  return await BackendAxios.delete(`/workspace/${workSpaceId}`);
};

export const postAddNewWorkspace = async (newWorkSpaceName: string) => {
  return await BackendAxios.post(`/workspace`, {
    newWorkSpaceName,
  });
};

export const putEditWorkSpaceName = async (
  newWorkspaceName: string,
  workspaceId: string,
) => {
  return await BackendAxios.put(`/workspace/${workspaceId}`, {
    newWorkspaceName,
  });
};
