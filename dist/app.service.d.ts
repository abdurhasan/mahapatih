import { Leads } from 'src/entities';
import { Repository } from 'typeorm';
import { SubmitInput } from './types/submit.input';
import { ConfigService } from './config/config.service';
export declare class AppService {
    private readonly repo;
    private readonly config;
    constructor(repo: Repository<Leads>, config: ConfigService);
    list(): {
        data: Promise<Leads[]>;
    };
    submit({ name, phone }: SubmitInput): Promise<void>;
}
