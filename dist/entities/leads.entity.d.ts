import { BaseEntity } from 'typeorm';
export declare class Leads extends BaseEntity {
    name: string;
    phone: string;
    isFollowedUp: boolean;
    createdAt: Date;
}
