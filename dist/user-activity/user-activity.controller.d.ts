import { Request } from 'express';
import { UserActivityService } from './user-activity.service';
export declare class UserActivityController {
    private readonly userActivityService;
    constructor(userActivityService: UserActivityService);
    getLatestUsers(): Promise<{
        online: boolean;
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        userType: string;
        lastActive: Date;
        profileImage: string;
        room: string;
        academicYear: string;
    }[]>;
    heartbeat(req: Request): Promise<{
        message: string;
    }>;
    getRoleUsageStatistics(): Promise<{
        admin: number;
        lecturer: number;
        student: number;
    }>;
}
