-- CreateTable
CREATE TABLE `Movie` (
    `id_vd` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_vd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
