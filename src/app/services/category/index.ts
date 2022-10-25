import { INewCategory } from "@/app/interfaces/Categories";
import { CategoryRepository } from "@/app/repositories/Category";

export class CategoryService {
    private categoryRepository: CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    public async save(data: INewCategory) {
        const regexValidColor = /^#(?:[0-9a-fA-F]{3}){1,2}$/

        if (!regexValidColor.test(data.color)) {
            throw new Error('Invalid color')
        }

        const category = await this.categoryRepository.findOne({
            name: data.name
        })

        if (category) {
            throw new Error('Category already exists')
        }

        const formattedCategory = {
            ...data,
            color: data.color.substring(1)
        }

        return await this.categoryRepository.save(formattedCategory)
    }
}