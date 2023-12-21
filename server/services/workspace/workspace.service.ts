import { WorkspaceRepository } from "../../model/workSpace/workSpace.model";

export class WorkspaceService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async getUserWorkspaces(userId: string) {
    const allWorkspaces =
      await this.workspaceRepository.getUserWorkspaces(userId);
    return allWorkspaces;
  }

  async createWorkspace(workspaceName: string, userId: string) {
    const createdWorkspace = await this.workspaceRepository.createNewWorkspace(
      workspaceName,
      userId,
    );
    return createdWorkspace;
  }

  async deleteWorkspace(userId: string, workspaceId: string) {
    return this.workspaceRepository.deleteWorkspaceToUser(userId, workspaceId);
  }

  async changeWorkspaceName(workspaceId: string, newWorkspaceName: string) {
    return this.workspaceRepository.changeWorkspaceName(
      workspaceId,
      newWorkspaceName,
    );
  }
}
