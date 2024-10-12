import { PrismaClient } from "@prisma/client";

// Tentukan Prisma Client sebagai bagian dari global object agar bisa digunakan ulang
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Cek apakah instance Prisma sudah ada di global
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma; // Hanya set di non-production environment
}

export default prisma;
