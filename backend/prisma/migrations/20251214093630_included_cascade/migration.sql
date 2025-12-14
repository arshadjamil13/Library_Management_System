-- DropForeignKey
ALTER TABLE "BorrowedBook" DROP CONSTRAINT "BorrowedBook_bookId_fkey";

-- AddForeignKey
ALTER TABLE "BorrowedBook" ADD CONSTRAINT "BorrowedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
