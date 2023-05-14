-- CreateTable
CREATE TABLE "shopplist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,

    CONSTRAINT "shopplist_pkey" PRIMARY KEY ("id")
);
