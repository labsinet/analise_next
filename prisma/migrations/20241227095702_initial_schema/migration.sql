
-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `role` VARCHAR(10) DEFAULT 'user',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) DEFAULT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `Analysis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER(4)  DEFAULT NULL,
    `semester` INTEGER(2) DEFAULT NULL,
    `subject` VARCHAR(191) DEFAULT NULL,
    `id_group` VARCHAR(191) DEFAULT NULL,
    `id_department` VARCHAR(191) DEFAULT NULL,
    `count_stud` INTEGER(4) DEFAULT NULL,
    `count5` INTEGER(3) DEFAULT NULL,
    `count4` INTEGER(3) DEFAULT NULL,
    `count3` INTEGER(3) DEFAULT NULL,
    `count2` INTEGER(3) DEFAULT NULL,
    `count_passed` INTEGER(3) DEFAULT NULL,
    `count_released` INTEGER(3) DEFAULT NULL,
    `count_not_cert` INTEGER(3) DEFAULT NULL,
    `count_acad_leave` INTEGER(3) DEFAULT NULL,
    `count_expelled` INTEGER(3) DEFAULT NULL,
    `id_user` INTEGER DEFAULT NULL,
    `quality` DECIMAL(6, 2) DEFAULT NULL,
    `overall` DECIMAL(6, 2) DEFAULT NULL,
    `average` DECIMAL(6, 2) DEFAULT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) DEFAULT NULL,

    INDEX `Analysis_year_semester_idx`(`year`, `semester`),
    INDEX `Analysis_subject_idx`(`subject`),
    INDEX `Analysis_id_department_idx`(`id_department`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- AddForeignKey
ALTER TABLE `Analysis` ADD CONSTRAINT `Analysis_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert default admin user
-- Password is 'admin1234' hashed with bcrypt (you can change this)
INSERT INTO `User` (
    `username`,
    `email`,
    `password`,
    `department`,
    `category`,
    `role`,
    `created_at`,
    `updated_at`
) VALUES (
    'admin',
    'admin@example.com',
    '$2b$10$mewuYirziaQksCReLe/aB.RaXBUK7z.EaWi/5HiZtnwU06tqKG0wG',
    'Administration',
    '1 категорія',
    'admin',
    CURRENT_TIMESTAMP(3),
    CURRENT_TIMESTAMP(3)
);

