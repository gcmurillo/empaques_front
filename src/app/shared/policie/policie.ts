
class Statement {
    public effect: string;
    public action: string;
    public resources: string;
}

export class Policie {
    public id: number;
    public name: string;
    public statements: Statement[];
}
