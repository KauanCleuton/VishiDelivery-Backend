import { Request, response, Response } from 'express';
import productModel from '../models/product.model';
import saveDirFile from '../utils/saveDirFile';

const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productModel.getProductsModel();

    if (products.length === 0) {
      return res.status(404).json({ message: 'Não existe nenhum produto!' }); // 404 Not Found
    }
    console.log(products)

    return res.status(200).json({ products });
  } catch (error) {
    console.error('Server Internal Error', error);
    return res.status(500).json({ message: 'Server Internal Error' });
  }
};

const createProductController = async (req: Request, res: Response) => {
  try {
    const { category_id, categoryName, title, description, price, file_url } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: 'Título e preço são obrigatórios!' }); // 400 Bad Request
    }

    const category = await productModel.getNameCategory(category_id)
    if(category.length === 0) {
      return res.status(404).json({message: 'Categoria não existe!'})
    }
    // const saveDirFileUrl = await saveDirFile(file_url, categoryName)
    const productData = {
      category_id,
      title,
      description,
      price,
      // file_url: saveDirFileUrl,
      file_url
    };

    const newProduct = await productModel.createProductModel(productData);
    return res.status(201).json({ newProduct }); // 201 Created
  } catch (error) {
    console.error('Erro ao criar um produto', error);
    return res.status(500).json({ message: 'Erro ao criar um produto' });
  }
};

export default { getProductsController, createProductController };
