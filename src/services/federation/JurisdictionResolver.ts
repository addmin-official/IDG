import { GovernmentContextType, JurisdictionType } from '../../providers/GovernmentProvider';

export class JurisdictionResolver {
  
  /**
   * Translates the UI GovernmentContext into a literal database jurisdiction type
   */
  static resolveContextToJurisdiction(context: GovernmentContextType): JurisdictionType {
    switch (context) {
      case 'FEDERAL_IRAQ':
        return 'federal';
      case 'KURDISTAN_REGION':
        return 'krg';
      case 'JOINT_OPERATIONS':
        return 'joint';
      default:
        return 'federal';
    }
  }

  /**
   * Verifies if a user role operating in the active context has strict access
   * to a resource belonging to a specific jurisdiction.
   */
  static hasAccess({
    userRole,
    activeContext,
    resourceJurisdiction,
    federationMode = 'SEPARATED'
  }: {
    userRole: string;
    activeContext: GovernmentContextType;
    resourceJurisdiction: JurisdictionType;
    federationMode: 'SEPARATED' | 'FEDERATED' | 'UNIFIED';
  }): boolean {
    
    // In UNIFIED mode, all boundaries are dissolved; everyone with access of correct status can view
    if (federationMode === 'UNIFIED') {
      return true;
    }

    const contextJur = this.resolveContextToJurisdiction(activeContext);

    // If we are looking at Joint Operations context, we have bridged visibility (but action rules still apply!)
    if (activeContext === 'JOINT_OPERATIONS') {
      return true;
    }

    // Strict SEPARATED mode: No cross-boundary access under any condition
    if (federationMode === 'SEPARATED') {
      return contextJur === resourceJurisdiction || resourceJurisdiction === 'joint';
    }

    // FEDERATED Mode: Dual handshake allows read access but keeps data logically separate
    if (federationMode === 'FEDERATED') {
      // Allows viewing federal and of course native, but limits deep operational mutations
      return true; 
    }

    return false;
  }

  /**
   * Determines if the active user role can authorize federation actions (approvals, rejections).
   */
  static canMutateFederation({
    userRole,
    activeContext,
    federationMode
  }: {
    userRole: string;
    activeContext: GovernmentContextType;
    federationMode: 'SEPARATED' | 'FEDERATED' | 'UNIFIED';
  }): boolean {
    if (federationMode === 'SEPARATED') {
      return false; // Under absolute separation, federation is deactivated
    }

    // High roles can always approve or coordinate
    const lowerRole = userRole.toLowerCase();
    const isPrimeMinister = lowerRole.includes('prime') || lowerRole.includes('pm') || lowerRole.includes('minister');
    const isDirectorOrCoordinator = lowerRole.includes('director') || lowerRole.includes('coordinator') || lowerRole.includes('authority') || lowerRole.includes('arbitrator');

    return isPrimeMinister || isDirectorOrCoordinator;
  }
}
