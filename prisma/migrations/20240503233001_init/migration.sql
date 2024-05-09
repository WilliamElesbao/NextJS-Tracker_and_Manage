/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `equipmentmanagement_tb` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `equipmentmanagement_tb` table. All the data in the column will be lost.
  - You are about to drop the column `givenbackDate` on the `equipmentmanagement_tb` table. All the data in the column will be lost.
  - You are about to drop the column `handedoverDate` on the `equipmentmanagement_tb` table. All the data in the column will be lost.
  - Added the required column `WhoReceived_user_FK` to the `EquipmentManagement_TB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkInDate` to the `EquipmentManagement_TB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenBackBy_tech_FK` to the `EquipmentManagement_TB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `EquipmentManagement_TB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `equipmentmanagement_tb` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`,
    DROP COLUMN `givenbackDate`,
    DROP COLUMN `handedoverDate`,
    ADD COLUMN `WhoReceived_user_FK` INTEGER NOT NULL,
    ADD COLUMN `checkInDate` DATETIME(3) NOT NULL,
    ADD COLUMN `checkOutDate` DATETIME(3) NULL,
    ADD COLUMN `checkoutStatus` BOOLEAN NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `givenBackBy_tech_FK` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
