/*
  Warnings:

  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `name` on the `DeliveryPerson` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `vehicle` on the `DeliveryPerson` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `title` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `file_url` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `road` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `neighborhood` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `city` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `complement` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `name` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `email` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `senha` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(45);

-- AlterTable
ALTER TABLE "DeliveryPerson" ALTER COLUMN "name" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "vehicle" SET DATA TYPE VARCHAR(45);

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "title" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "file_url" SET DATA TYPE VARCHAR(45);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(45);

-- AlterTable
ALTER TABLE "address" ALTER COLUMN "road" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "neighborhood" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "complement" SET DATA TYPE VARCHAR(45);

-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "name" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "senha" SET DATA TYPE VARCHAR(45);
