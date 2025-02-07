/*
  Warnings:

  - You are about to drop the column `customer_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `p_countryOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `p_dateOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `p_horoscopeLength` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `p_timeOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `price_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_id` on the `User` table. All the data in the column will be lost.
  - The `horoscopeAge` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `countryOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horoscopeLength` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `emailTime` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HoroscopeAge" AS ENUM ('today', 'tomorrow');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "customer_id",
DROP COLUMN "p_countryOfBirth",
DROP COLUMN "p_dateOfBirth",
DROP COLUMN "p_horoscopeLength",
DROP COLUMN "p_timeOfBirth",
DROP COLUMN "price_id",
DROP COLUMN "subscription_id",
ADD COLUMN     "countryOfBirth" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horoscopeLength" TEXT NOT NULL,
ADD COLUMN     "timeOfBirth" TIMESTAMP(3) NOT NULL,
DROP COLUMN "emailTime",
ADD COLUMN     "emailTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "horoscopeAge",
ADD COLUMN     "horoscopeAge" "HoroscopeAge" NOT NULL DEFAULT 'today';
