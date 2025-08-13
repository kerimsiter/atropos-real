"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Start seeding ...');
    const company = await prisma.company.upsert({
        where: { taxNumber: '1234567890' },
        update: {},
        create: {
            name: 'Atropos Bilişim',
            taxNumber: '1234567890',
            taxOffice: 'Maslak',
            address: 'Büyükdere Cad. No:1, İstanbul',
            phone: '02120000000',
            email: 'info@atropos.com',
        },
    });
    console.log(`Created company: ${company.name} (ID: ${company.id})`);
    const saltRounds = 10;
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`Password "password" hashed successfully.`);
    const user = await prisma.user.upsert({
        where: { username: 'superadmin' },
        update: {},
        create: {
            username: 'superadmin',
            password: hashedPassword,
            firstName: 'Süper',
            lastName: 'Admin',
            role: client_1.UserRole.SUPER_ADMIN,
            companyId: company.id,
            email: 'superadmin@atropos.com',
            phone: '05000000000',
        },
    });
    console.log(`Created user: ${user.username} (ID: ${user.id})`);
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map