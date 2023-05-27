-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "memo" TEXT NOT NULL,
    "type" BOOLEAN NOT NULL,
    "create_date" TIMESTAMP(3),

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");


INSERT INTO "user" (id, name, email, password)
VALUES
(1, 'demo', 'hogehoge@gmail.com', 'demo');
INSERT INTO "inventory" (id, name, category)
VALUES
(1, '人参', '野菜'),
(2, '白菜', '野菜'),
(3, '牛乳', '乳製品'),
(4, '芋', '野菜'),
(5, '卵', '乳製品'),
(6, '豚肉', '肉');
INSERT INTO "store" (id, user_id, inventory_id, amount, create_date, end_date)
VALUES
(1, 1, 1, 1, Now(), Now()),
(2, 1, 2, 1, Now(), Now());