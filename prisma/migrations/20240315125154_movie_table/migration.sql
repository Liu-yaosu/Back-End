/*
  Warnings:

  - The primary key for the `movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_vd` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `judul` on the `movie` table. All the data in the column will be lost.
  - Added the required column `kd` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_name` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` DROP PRIMARY KEY,
    DROP COLUMN `id_vd`,
    DROP COLUMN `judul`,
    ADD COLUMN `kd` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `movie_name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`kd`);
