import { Pool } from '../pool/pool';

export class Cycle {
    public id: number;
    public cycleStartDate: number;
    public cyclePool: Pool;
    public cycleStatus: boolean;
    public cycleSowingDate: number;
    public cyclePrevSowingDate?: number;
    public cycleHarvestDate?: number;
}
