/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Insurance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "email" VARCHAR(100) NOT NULL DEFAULT 'example@example.com';

-- CreateIndex
CREATE UNIQUE INDEX "Insurance_name_key" ON "Insurance"("name");
