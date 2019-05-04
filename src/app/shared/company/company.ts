
import { Farm } from '../farm/farm';
import { Warehouse } from '../warehouse/warehouse';

export class Company {
    public _id: string;
    public name: string;
    public detail: string;
    public businessId: string;
    public farms: any[];
    public warehouses: Warehouse[];
    public __v: number;
}
