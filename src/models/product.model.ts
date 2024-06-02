import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IProductData {
  category_id?: number;
  title?: string;
  description?: string;
  price: number;
  file_url?: string;
}

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createProductModel = async (data: IProductData) => {
  try {
    const existsProduct = await prisma.products.findMany({
      where: {
        title: data.title,
      },
    });

    if (existsProduct.length > 0) {
      throw new CustomError('Produto já existe', 400);
    }

    const categoryRecord = data.category_id
      ? await prisma.category.findUnique({
          where: {
            idCategory: data.category_id,
          },
        })
      : null;

    const productData: any = {
      title: data.title || "",
      description: data.description || "",
      price: parseFloat(String(data.price)),
      file_url: data.file_url || "",
    };

    if (data.category_id && categoryRecord) {
      productData.Category = {
        connect: { idCategory: categoryRecord.idCategory },
      };
    }

    const createProduct = await prisma.products.create({
      data: productData,
    });

    return createProduct;
  } catch (error) {
    console.error('Erro ao criar um produto:', error);
    throw new CustomError('Erro ao criar um produto', 500);
  }
};

const getProductsModel = async () => {
  try {
    const products = await prisma.products.findMany({
      include: {
        Category: true,
        OrderItems: true,
      },
    });

    return products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new CustomError('Erro ao buscar produtos', 500);
  }
};

const getNameCategory = async (categoryId: number) => {
  try {
    const category = await prisma.category.findMany({
      where: {
        idCategory: categoryId
      }
    })
    return category
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    throw new CustomError('Erro ao buscar categoria', 500);
  }
}

export default { createProductModel, getProductsModel, getNameCategory };
