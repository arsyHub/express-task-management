-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_user_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
