-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bookmarkedByCurrentUser" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "bookMarkedPost" (
    "id" SERIAL NOT NULL,
    "BookMarkerId" INTEGER NOT NULL,
    "BookMarkedPostId" INTEGER NOT NULL,

    CONSTRAINT "bookMarkedPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookMarkedPost" ADD CONSTRAINT "bookMarkedPost_BookMarkerId_fkey" FOREIGN KEY ("BookMarkerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookMarkedPost" ADD CONSTRAINT "bookMarkedPost_BookMarkedPostId_fkey" FOREIGN KEY ("BookMarkedPostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
