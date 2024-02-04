/*
  Warnings:

  - You are about to drop the column `status` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `inclusions` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `rent` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Room` table. All the data in the column will be lost.
  - Added the required column `cancelled` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status",
ADD COLUMN     "cancelled" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "inclusions",
DROP COLUMN "rent";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "description",
ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "guests" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deviceId" TEXT NOT NULL;
