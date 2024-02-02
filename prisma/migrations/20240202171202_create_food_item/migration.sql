-- CreateTable
CREATE TABLE `FoodItem` (
    `id` VARCHAR(191) NOT NULL,
    `calories` INTEGER NOT NULL,
    `cooking_method` VARCHAR(191) NOT NULL,
    `protein` INTEGER NOT NULL,
    `carbs` INTEGER NOT NULL,
    `fibers` INTEGER NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    INDEX `FoodItem_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodCategory` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
