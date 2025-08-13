import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(username: string): Promise<{
        id: string;
        phone: string | null;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        password: string;
        username: string;
        companyId: string;
        branchId: string | null;
        pin: string | null;
        firstName: string;
        lastName: string;
        avatar: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
        employeeCode: string | null;
        hireDate: Date | null;
        birthDate: Date | null;
        nationalId: string | null;
        vehicleType: string | null;
        vehiclePlate: string | null;
        active: boolean;
        lastLoginAt: Date | null;
        refreshToken: string | null;
        failedLoginCount: number;
        lockedUntil: Date | null;
        version: number;
    } | null>;
}
