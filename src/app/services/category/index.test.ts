import { CategoryRepository } from "@/app/repositories/Category";
import { Category } from "@prisma/client";
import { CategoryService } from ".";

describe('given CategoryService', () => {
    const categoryService = new CategoryService()

    const mockCategory: Category = {
        name: 'testColor',
        color: '#000',
        id: 'test'
    }

    jest.spyOn(CategoryRepository.prototype, 'find').mockResolvedValue([mockCategory])
    const mockFindOne = jest.spyOn(CategoryRepository.prototype, 'findOne').mockResolvedValue(mockCategory)
    const mockSaveCategory = jest.spyOn(CategoryRepository.prototype, 'save').mockResolvedValue(mockCategory)

    it('should find all categories', async () => {
        const transactions = await categoryService.find({})
        expect(transactions).toStrictEqual([mockCategory])
    });

    it('should find one category', async () => {
        const transaction = await categoryService.findOne({})

        expect(transaction).toStrictEqual(mockCategory)
    });

    it('should fail to save category due to incorrect hex color', async () => {
        try {
            await categoryService.save({
                name: 'test',
                color: 'test'
            })
        } catch (e) {
            expect(e.message).toBe("Invalid color");
        }
    });

    it('should fail to save category due to category already existing', async () => {
        try {
            await categoryService.save({
                name: 'test',
                color: '#000'
            })
        } catch (e) {
            expect(e.message).toBe("Category already exists");
        }
    });

    it('should sucessfully save a category', async () => {
        mockFindOne.mockImplementationOnce(null)
        await categoryService.save({
            name: 'test',
            color: '#000'
        })
        
        expect(mockSaveCategory).toBeCalledWith({
            name: 'test',
            color: '000'
        })
    });
});
