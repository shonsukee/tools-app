/*
  Warnings:

  - You are about to drop the `shopplist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "shopplist";

-- CreateTable
CREATE TABLE "shoplist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,

    CONSTRAINT "shoplist_pkey" PRIMARY KEY ("id")
);
