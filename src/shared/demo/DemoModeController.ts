export type DemoMode = 'PRESENTATION_MODE' | 'TRAINING_MODE' | 'OPERATIONAL_MODE';

export class DemoModeController {
  private static activeMode: DemoMode = 'PRESENTATION_MODE';

  public static getActiveMode(): DemoMode {
    return this.activeMode;
  }

  public static setActiveMode(mode: DemoMode): void {
    if (mode === 'PRESENTATION_MODE' || mode === 'TRAINING_MODE' || mode === 'OPERATIONAL_MODE') {
      this.activeMode = mode;
    }
  }

  public static getModeDescription(mode: DemoMode): string {
    switch (mode) {
      case 'PRESENTATION_MODE':
        return 'Fully responsive sandbox loaded with high-fidelity sovereign simulation scenarios for national leadership review.';
      case 'TRAINING_MODE':
        return 'Interactive training environment with step-by-step guides for customs and boundary integrity officers.';
      case 'OPERATIONAL_MODE':
        return 'Encrypted live operational mode. Locks down simulation features and connects exclusively to production secure nodes.';
      default:
        return '';
    }
  }
}
