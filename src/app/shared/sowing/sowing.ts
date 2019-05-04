import { Pool } from '../pool/pool';

export class Sowing {
    public id: number;
    public sowingNumberOfAnimals: number;
    public sowingInitialWeight: number;
    public sowingDensityOfAnimals: number;
    public sowingDate: number;
    public sowingPool: Pool;
    // optional
    public sowingWaterParameters?: number;
    public sowingPathogens?: number;
    public sowingWaterAnalysis?: number;
    public sowingFoods?: number;
    public sowingFertilizer?: number;
    public sowingOperatingCost?: number;
}
