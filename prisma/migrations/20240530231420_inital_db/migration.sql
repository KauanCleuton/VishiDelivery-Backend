-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "name" VARCHAR(45),
    "phone" CHAR(16),

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "idPedidos" SERIAL NOT NULL,
    "quantity" INTEGER,
    "created_at" TIMESTAMP(3),
    "observation" VARCHAR(120) DEFAULT '',
    "title" VARCHAR(160) NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "payment" VARCHAR(20),

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("idPedidos")
);

-- CreateTable
CREATE TABLE "Category" (
    "idCategory" SERIAL NOT NULL,
    "name" VARCHAR(45),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("idCategory")
);

-- CreateTable
CREATE TABLE "Products" (
    "idProducts" SERIAL NOT NULL,
    "category_id" INTEGER,
    "title" VARCHAR(45),
    "description" VARCHAR(120) DEFAULT '',
    "price" DOUBLE PRECISION NOT NULL,
    "file_url" VARCHAR(45) DEFAULT '',

    CONSTRAINT "Products_pkey" PRIMARY KEY ("idProducts")
);

-- CreateTable
CREATE TABLE "address" (
    "idAddress" SERIAL NOT NULL,
    "user_id" INTEGER,
    "road" VARCHAR(45),
    "house_number" CHAR(13),
    "neighborhood" VARCHAR(45),
    "city" VARCHAR(45),
    "complement" VARCHAR(45) DEFAULT '',

    CONSTRAINT "address_pkey" PRIMARY KEY ("idAddress")
);

-- CreateTable
CREATE TABLE "admin" (
    "idAdmin" SERIAL NOT NULL,
    "name" VARCHAR(45),
    "email" VARCHAR(45),
    "senha" VARCHAR(45),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("idAdmin")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "idOrderItems" SERIAL NOT NULL,
    "order_id" INTEGER,
    "product_id" INTEGER,
    "quantity" INTEGER,
    "price" DOUBLE PRECISION,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("idOrderItems")
);

-- CreateTable
CREATE TABLE "DeliveryPerson" (
    "idDeliveryPerson" SERIAL NOT NULL,
    "name" VARCHAR(45),
    "phone" CHAR(16),
    "vehicle" VARCHAR(45) DEFAULT '',

    CONSTRAINT "DeliveryPerson_pkey" PRIMARY KEY ("idDeliveryPerson")
);

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("idCategory") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Pedidos"("idPedidos") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("idProducts") ON DELETE SET NULL ON UPDATE CASCADE;
