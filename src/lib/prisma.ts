import { PrismaClient } from '../generated/prisma';

// PrismaClient'in global bir örneğini oluştur
// Bu, development sırasında hot-reload sorunlarını önler
declare global {
  var prisma: PrismaClient | undefined;
}

// Eğer global örnek yoksa yeni bir örnek oluştur
export const prisma = global.prisma || new PrismaClient();

// Development ortamında global değişkeni atayarak hot-reload sorunlarını önle
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}