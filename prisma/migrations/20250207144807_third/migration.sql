/*
  Warnings:

  - The `horoscopeLength` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `timeOfBirth` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `emailTime` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "HoroscopeLength" AS ENUM ('short', 'medium', 'long');

-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('T00_00', 'T01_00', 'T02_00', 'T03_00', 'T04_00', 'T05_00', 'T06_00', 'T07_00', 'T08_00', 'T09_00', 'T10_00', 'T11_00', 'T12_00', 'T13_00', 'T14_00', 'T15_00', 'T16_00', 'T17_00', 'T18_00', 'T19_00', 'T20_00', 'T21_00', 'T22_00', 'T23_00');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "countryOfBirth" DROP NOT NULL,
ALTER COLUMN "dateOfBirth" DROP NOT NULL,
DROP COLUMN "horoscopeLength",
ADD COLUMN     "horoscopeLength" "HoroscopeLength" NOT NULL DEFAULT 'short',
DROP COLUMN "timeOfBirth",
ADD COLUMN     "timeOfBirth" "TimeOfDay",
DROP COLUMN "emailTime",
ADD COLUMN     "emailTime" "TimeOfDay";
