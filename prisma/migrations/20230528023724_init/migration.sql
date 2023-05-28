/*
  Warnings:

  - You are about to drop the `Attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Avocado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_avocadoId_fkey";

-- DropTable
DROP TABLE "Attributes";

-- DropTable
DROP TABLE "Avocado";
