export interface IEnvVarService {
    readonly nodeEnv: "development" | "production";
}

// Incapsulates access to process.env.* variables.
export class EnvVarService implements IEnvVarService {
    public readonly nodeEnv: IEnvVarService["nodeEnv"];

    constructor() {
        this.nodeEnv = (process.env.NODE_ENV as IEnvVarService["nodeEnv"]) || "development";
    }
}
