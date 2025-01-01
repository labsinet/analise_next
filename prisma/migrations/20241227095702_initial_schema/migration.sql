
-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `Analysis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `id_group` VARCHAR(191) NOT NULL,
    `id_department` VARCHAR(191) NOT NULL,
    `count_stud` INTEGER NOT NULL,
    `count5` INTEGER NOT NULL,
    `count4` INTEGER NOT NULL,
    `count3` INTEGER NOT NULL,
    `count2` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `overall` DECIMAL(65, 2) NOT NULL,
    `average` DECIMAL(65, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Analysis_year_semester_idx`(`year`, `semester`),
    INDEX `Analysis_subject_idx`(`subject`),
    INDEX `Analysis_id_department_idx`(`id_department`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- AddForeignKey
ALTER TABLE `Analysis` ADD CONSTRAINT `Analysis_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert default admin user
-- Password is 'admin123' hashed with bcrypt (you can change this)
INSERT INTO `User` (
    `username`,
    `email`,
    `password`,
    `department`,
    `category`,
    `created_at`,
    `updated_at`
) VALUES (
    'admin',
    'admin@example.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewE4B3gM1hR5/0Uu',
    'Administration',
    'admin',
    CURRENT_TIMESTAMP(3),
    CURRENT_TIMESTAMP(3)
);

