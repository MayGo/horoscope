/*
  Warnings:

  - The values [today,tomorrow] on the enum `HoroscopeAge` will be removed. If these variants are still used in the database, this will fail.
  - The values [short,medium,long] on the enum `HoroscopeLength` will be removed. If these variants are still used in the database, this will fail.
  - The `sign` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "HoroscopeSign" AS ENUM ('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces');

-- AlterEnum
BEGIN;
CREATE TYPE "HoroscopeAge_new" AS ENUM ('Today', 'Tomorrow');
ALTER TABLE "User" ALTER COLUMN "horoscopeAge" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "horoscopeAge" TYPE "HoroscopeAge_new" USING ("horoscopeAge"::text::"HoroscopeAge_new");
ALTER TYPE "HoroscopeAge" RENAME TO "HoroscopeAge_old";
ALTER TYPE "HoroscopeAge_new" RENAME TO "HoroscopeAge";
DROP TYPE "HoroscopeAge_old";
ALTER TABLE "User" ALTER COLUMN "horoscopeAge" SET DEFAULT 'Today';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "HoroscopeLength_new" AS ENUM ('Short', 'Medium', 'Long');
ALTER TABLE "User" ALTER COLUMN "horoscopeLength" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "horoscopeLength" TYPE "HoroscopeLength_new" USING ("horoscopeLength"::text::"HoroscopeLength_new");
ALTER TYPE "HoroscopeLength" RENAME TO "HoroscopeLength_old";
ALTER TYPE "HoroscopeLength_new" RENAME TO "HoroscopeLength";
DROP TYPE "HoroscopeLength_old";
ALTER TABLE "User" ALTER COLUMN "horoscopeLength" SET DEFAULT 'Short';
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sign",
ADD COLUMN     "sign" "HoroscopeSign" NOT NULL DEFAULT 'Aries',
ALTER COLUMN "horoscopeAge" SET DEFAULT 'Today',
ALTER COLUMN "horoscopeLength" SET DEFAULT 'Short';

-- CreateTable
CREATE TABLE "DailyHoroscope" (
    "id" SERIAL NOT NULL,
    "forDate" TIMESTAMP(3) NOT NULL,
    "horoscopeText" TEXT NOT NULL,
    "sign" "HoroscopeSign" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyHoroscope_pkey" PRIMARY KEY ("id")
);
