/// <reference types="node" />
export declare class ConfigService {
    private processEnv;
    constructor(processEnv?: NodeJS.ProcessEnv);
    private env;
    readonly PORT: number;
    readonly DB_HOST: string;
    readonly DB_PORT: number;
    readonly DB_NAME: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly WA_URL: string;
}
