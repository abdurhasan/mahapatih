import { AppService } from "./app.service";
import { SubmitInput } from "./types/submit.input";
export declare class AppController {
    private readonly service;
    constructor(service: AppService);
    submit({ name, phone }: SubmitInput): {
        success: boolean;
    };
    list(): {
        data: Promise<import("./entities").Leads[]>;
    };
}
