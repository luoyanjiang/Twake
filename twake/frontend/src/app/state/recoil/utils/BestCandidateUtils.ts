import { CompanyType } from 'app/models/Company';
import { UserType } from 'app/models/User';
import { WorkspaceType } from 'app/models/Workspace';
import LocalStorage from 'app/services/LocalStorage';
import RouterService from 'app/services/RouterService';

/**
 * Workspace priority:
 * 1. Router workspace id
 * 2. Local storage workspace id
 * 3. User's workspace with the most total members
 *
 * @param userWorkspaces
 * @returns WorkspaceType | undefined
 */
export function getBestCandidateWorkspace(
  companyId: string,
  userWorkspaces: WorkspaceType[],
): WorkspaceType | undefined {
  const { workspaceId } = RouterService.getStateFromRoute();
  const storageWorkspaceId =
    (LocalStorage.getItem('default_workspace_id_' + companyId) as string) || null;

  return (
    userWorkspaces?.find(w => w.id === workspaceId) ||
    userWorkspaces?.find(w => w.id === storageWorkspaceId) ||
    userWorkspaces?.sort((a, b) => a?.stats?.total_members - b.stats?.total_members)[0] ||
    userWorkspaces[0]
  );
}