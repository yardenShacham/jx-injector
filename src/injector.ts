export class injector {
    private container: { [key: string]: any }

    constructor() {
        this.container = {};
    }

    public register(dependencyName: string, dependencyValue: any): injector {
        if (dependencyName && dependencyValue) {
            this.container[dependencyName] = dependencyValue;
        }

        return this;
    }

    public registerSingleton(dependencyName: string, dependencyValue: any, onDemand?: boolean): injector {
        if (dependencyName && dependencyValue) {
            if (onDemand) {
                this.container[dependencyName] = {
                    onDemand,
                    dependencyValue
                };
            }
            else {
                this.container[dependencyName] = new dependencyValue();
            }
        }
        return this;
    }

    public mergeContainers(container: any) {
        let keys = Object.keys(container);
        for (let i = 0; i < keys.length; i++) {
            let currentKey = keys[i];
            this.container[currentKey] = container[currentKey];
        }
    }

    public get(dependencyName: string) {
        if (this.container[dependencyName]) {
            if (typeof  this.container[dependencyName] === "function") {
                return new this.container[dependencyName];
            }
            else if (this.container[dependencyName].onDemand
                && this.container[dependencyName].onDemand === true) {
                this.container[dependencyName] = new this.container[dependencyName].dependencyValue;
                return this.container[dependencyName];
            }
            else
                return this.container[dependencyName];
        }
    }
}