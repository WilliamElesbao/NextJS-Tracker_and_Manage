-- CreateTable
CREATE TABLE `Technician_TB` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Technician_TB_username_key`(`username`),
    UNIQUE INDEX `Technician_TB_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_TB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_TB_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentManagement_TB` (
    `id` VARCHAR(191) NOT NULL,
    `broughtBy_user_FK` INTEGER NOT NULL,
    `handedoverDate` DATETIME(3) NULL,
    `recivedBy_tech_FK` VARCHAR(191) NOT NULL,
    `givenbackDate` DATETIME(3) NULL,
    `ticketNumber` INTEGER NOT NULL,
    `hostname` VARCHAR(191) NOT NULL,
    `patrimonyID` INTEGER NOT NULL,
    `computerType` VARCHAR(191) NOT NULL,
    `serviceTag` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `computerStatus` VARCHAR(191) NOT NULL,
    `othersEquipment` VARCHAR(191) NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EquipmentManagement_TB_hostname_key`(`hostname`),
    UNIQUE INDEX `EquipmentManagement_TB_patrimonyID_key`(`patrimonyID`),
    UNIQUE INDEX `EquipmentManagement_TB_serviceTag_key`(`serviceTag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EquipmentManagement_TB` ADD CONSTRAINT `EquipmentManagement_TB_broughtBy_user_FK_fkey` FOREIGN KEY (`broughtBy_user_FK`) REFERENCES `User_TB`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentManagement_TB` ADD CONSTRAINT `EquipmentManagement_TB_recivedBy_tech_FK_fkey` FOREIGN KEY (`recivedBy_tech_FK`) REFERENCES `Technician_TB`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
