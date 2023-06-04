/*
  Warnings:

  - Added the required column `basetemplate` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgurl` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "basetemplate" TEXT NOT NULL,
ADD COLUMN     "imgurl" TEXT NOT NULL;
