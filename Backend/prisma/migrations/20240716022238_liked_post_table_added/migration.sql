-- CreateTable
CREATE TABLE "LikedPost" (
    "id" SERIAL NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "LikedById" INTEGER NOT NULL,
    "PostId" INTEGER NOT NULL,

    CONSTRAINT "LikedPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_LikedById_fkey" FOREIGN KEY ("LikedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
