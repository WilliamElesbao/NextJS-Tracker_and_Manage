-- CreateTable
CREATE TABLE "Technician_TB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User_TB" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EquipmentManagement_TB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticketNumber" INTEGER NOT NULL,
    "recivedBy_tech_FK" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "patrimonyID" INTEGER NOT NULL,
    "serviceTag" TEXT,
    "serialNumber" TEXT,
    "computerType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "computerStatus" TEXT NOT NULL,
    "broughtBy_user_FK" INTEGER NOT NULL,
    "othersEquipment" TEXT,
    "remarks" TEXT,
    "checkInDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "givenBackBy_tech_FK" TEXT,
    "WhoReceived_user_FK" INTEGER,
    "checkOutDate" DATETIME,
    "checkoutStatus" BOOLEAN,
    CONSTRAINT "EquipmentManagement_TB_broughtBy_user_FK_fkey" FOREIGN KEY ("broughtBy_user_FK") REFERENCES "User_TB" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EquipmentManagement_TB_recivedBy_tech_FK_fkey" FOREIGN KEY ("recivedBy_tech_FK") REFERENCES "Technician_TB" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Technician_TB_username_key" ON "Technician_TB"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Technician_TB_email_key" ON "Technician_TB"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_TB_email_key" ON "User_TB"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentManagement_TB_hostname_key" ON "EquipmentManagement_TB"("hostname");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentManagement_TB_patrimonyID_key" ON "EquipmentManagement_TB"("patrimonyID");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentManagement_TB_serviceTag_key" ON "EquipmentManagement_TB"("serviceTag");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentManagement_TB_serialNumber_key" ON "EquipmentManagement_TB"("serialNumber");
