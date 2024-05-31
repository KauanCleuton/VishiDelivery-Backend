import { Response, Request } from "express";
import categoryModel from '../models/category.model';
import path from "path";
import fs from 'fs'
const createCategoryController = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(401).json({ message: "Valor vazio! Adicione um valor para o nome" });
        }
        const category = await categoryModel.createCategoryModel({ name });
        const dir = path.join(__dirname, "../../src/private", name)
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true})
        }
        return res.status(201).json({ message: `Categoria ${name} criada!`, category });
    } catch (error) {
        console.error("Erro ao criar categoria", error);
        return res.status(500).json({ message: "Erro ao criar categoria" });
    }
};

const getCategories = async (req: Request, res: Response) => {  // Correct order of req and res
    try {
        const categories = await categoryModel.getCategories();
        return res.status(200).json({ categories });
    } catch (error) {
        console.error("Erro ao mostrar todas as categorias!", error);
        return res.status(500).json({ message: 'Erro ao mostrar todas as categorias!' });
    }
};

export default {
    createCategoryController,
    getCategories
};
