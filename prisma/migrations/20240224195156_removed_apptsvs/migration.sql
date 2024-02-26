/*
  Warnings:

  - You are about to drop the `AppointmentServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppointmentServices" DROP CONSTRAINT "AppointmentServices_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentServices" DROP CONSTRAINT "AppointmentServices_serviceId_fkey";

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "AppointmentServices";
