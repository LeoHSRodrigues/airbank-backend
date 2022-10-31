import { ICategorySearchOptions, INewCategory } from "@/app/interfaces/Categories";
import { CategoryRepository } from "@/app/repositories/Category";

export class CategoryService {
    private categoryRepository: CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    public async save(data: INewCategory) {
        const regexValidColor = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        const regexValidName = /^[\-@&()$#*|\\//A-Za-z0-9\u00C0-\u017F ]+$/

        if (!regexValidColor.test(data.color)) {
            throw new Error('Invalid color')
        }

        if (!regexValidName.test(data.name)) {
            throw new Error('Invalid name')
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

    public async find(args: ICategorySearchOptions) {

        return await this.categoryRepository.find(args)
    }

    public async findOne(args) {

        return await this.categoryRepository.findOne(args)
    }
}