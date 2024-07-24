/*
  Warnings:

  - You are about to drop the column `userId` on the `Tecnology` table. All the data in the column will be lost.
  - Added the required column `username` to the `Tecnology` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tecnology" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "studied" BOOLEAN NOT NULL DEFAULT false,
    "deadline" DATETIME NOT NULL,
    "created_at" DATETIME,
    "username" TEXT NOT NULL,
    CONSTRAINT "Tecnology_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tecnology" ("created_at", "deadline", "id", "studied", "title") SELECT "created_at", "deadline", "id", "studied", "title" FROM "Tecnology";
DROP TABLE "Tecnology";
ALTER TABLE "new_Tecnology" RENAME TO "Tecnology";
CREATE UNIQUE INDEX "Tecnology_title_key" ON "Tecnology"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
