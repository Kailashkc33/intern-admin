/*
  Warnings:

  - Added the required column `type` to the `Intern` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InternType" AS ENUM ('FULLSTACK', 'BUSINESS_ANALYST', 'CYBER_SECURITY', 'DATA_ANALYST');

-- AlterTable
ALTER TABLE "Intern" ADD COLUMN     "type" "InternType" NOT NULL;
