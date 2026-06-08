import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface LandParcel {
  parcelId: string;
  governorate: string;
  hectares: number;
  cadastralCode: string;
  surveyConfirmed: boolean;
  geographicZonings: string;
}

export class LandRegistryEngine {
  private static parcels: Object & Record<string, LandParcel> = {
    'AST-KIRKUK-NORTHOIL': {
      parcelId: 'AST-KIRKUK-NORTHOIL',
      governorate: 'Kirkuk',
      hectares: 24500,
      cadastralCode: 'CAD-KIK-RAWANDUZ-012',
      surveyConfirmed: true,
      geographicZonings: 'Strategic Carbon Reserve Zone A'
    },
    'AST-GRANDFAW-PORT': {
      parcelId: 'AST-GRANDFAW-PORT',
      governorate: 'Basra',
      hectares: 8500,
      cadastralCode: 'CAD-BAS-FAW-SEASHORE-99',
      surveyConfirmed: true,
      geographicZonings: 'Maritime Custom Commerce Zone'
    }
  };

  public static getLandAssets(): SovereignPhysicalAsset[] {
    return NationalAssetRegistry.getAssets().filter(
      a => a.category === 'LAND'
    );
  }

  public static getParcelDetails(assetId: string): LandParcel | undefined {
    return this.parcels[assetId];
  }

  public static registerParcel(assetId: string, parcel: Omit<LandParcel, 'parcelId'>) {
    this.parcels[assetId] = {
      parcelId: assetId,
      ...parcel
    };
  }
}
