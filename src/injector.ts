export class injector {
    private container: { [key: string]: any }

    constructor() {
        this.container = {};
    }

    public register(dependencyName: string, dependencyValue: any): void {
        if (dependencyName && dependencyValue) {
            this.container[dependencyName] = dependencyValue;
        }
    }

    public registerSingleton(dependencyName: string, dependencyValue: any, onDemand?: boolean): void {
        if (dependencyName && dependencyValue) {
            if (onDemand) {
                this.container[dependencyName] = dependencyValue;
            }
            else {
                this.container[dependencyName] = new dependencyValue();
            }
        }
    }

    public get(dependencyName: string) {
        if (this.container[dependencyName]) {
            if (typeof  this.container[dependencyName] === "function") {
                return new this.container[dependencyName];
            }
            else
                return this.container[dependencyName];
        }
    }
}