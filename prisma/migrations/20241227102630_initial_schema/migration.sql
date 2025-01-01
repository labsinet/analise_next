/*
  Warnings:

  - You are about to alter the column `overall` on the `analysis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `average` on the `analysis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `analysis` DROP FOREIGN KEY `Analysis_id_user_fkey`;

-- DropIndex
DROP INDEX `Analysis_id_department_idx` ON `analysis`;

-- DropIndex
DROP INDEX `Analysis_id_user_fkey` ON `analysis`;

-- DropIndex
DROP INDEX `Analysis_subject_idx` ON `analysis`;

-- DropIndex
DROP INDEX `Analysis_year_semester_idx` ON `analysis`;

-- AlterTable
ALTER TABLE `analysis` MODIFY `overall` DOUBLE NOT NULL,
    MODIFY `average` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AddForeignKey
ALTER TABLE `Analysis` ADD CONSTRAINT `Analysis_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
