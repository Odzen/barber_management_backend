-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'BARBER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "STATE" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "APPOINTMENTE_STATE" AS ENUM ('CANCELED', 'SCHEDULE', 'DONE');

-- CreateEnum
CREATE TYPE "SERVICE" AS ENUM ('HAIRCUT', 'BEARD');

-- CreateTable
CREATE TABLE "Avocado" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Avocado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "shape" TEXT,
    "hardiness" TEXT,
    "taste" TEXT,
    "avocadoId" TEXT NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" "SERVICE" NOT NULL DEFAULT 'HAIRCUT',
    "price" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "urlImg" TEXT,
    "email" TEXT NOT NULL,
    "state" "STATE" NOT NULL DEFAULT 'ACTIVE',
    "role" "ROLE" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barber" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "urlImg" TEXT,
    "email" TEXT NOT NULL,
    "state" "STATE" NOT NULL DEFAULT 'ACTIVE',
    "role" "ROLE" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "Barber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "urlImg" TEXT,
    "email" TEXT NOT NULL,
    "state" "STATE" NOT NULL DEFAULT 'ACTIVE',
    "role" "ROLE" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engagement" (
    "administratorId" INTEGER NOT NULL,
    "barberId" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("administratorId","barberId")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "customerId" INTEGER NOT NULL,
    "barberId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "state" "APPOINTMENTE_STATE" NOT NULL DEFAULT 'SCHEDULE',

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("customerId","barberId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avocado_sku_key" ON "Avocado"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Attributes_avocadoId_key" ON "Attributes"("avocadoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_documentNumber_key" ON "Administrator"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_phone_key" ON "Administrator"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_email_key" ON "Administrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_documentNumber_key" ON "Barber"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_phone_key" ON "Barber"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_email_key" ON "Barber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_documentNumber_key" ON "Customer"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_avocadoId_fkey" FOREIGN KEY ("avocadoId") REFERENCES "Avocado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "Administrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
