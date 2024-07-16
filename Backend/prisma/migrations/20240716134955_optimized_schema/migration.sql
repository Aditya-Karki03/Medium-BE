/*
  Warnings:

  - A unique constraint covering the columns `[LikedById,PostId]` on the table `LikedPost` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "NumberOfLikes" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "LikedPost_LikedById_PostId_key" ON "LikedPost"("LikedById", "PostId");
