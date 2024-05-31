import prisma from "../config/database";

interface ICategoryName {
    name: string;
}

const createCategoryModel = async (data: ICategoryName) => {
    try {
        const existsCategory = await prisma.category.findMany({
            where: {
                name: data.name
            }
        });

        if (existsCategory.length > 0) {
            throw new Error("Categoria já existe");
        }

        const createCategory = await prisma.category.create({
            data: {
                ...data
            }
        });
        return createCategory;
    } catch (error) {
        console.error("Erro ao criar uma categoria:", error);
        throw new Error("Erro ao criar uma categoria");
    }
};


const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        console.log("Erro ao mostrar todas as categorias!");
        throw new Error("Erro ao mostrar todas as categorias!");
    }
};

export default {
    createCategoryModel,
    getCategories
};
