/*
  Warnings:

  - Added the required column `user_id` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 200,
    "strength" INTEGER NOT NULL DEFAULT 5,
    "defense" INTEGER NOT NULL DEFAULT 5,
    "agility" INTEGER NOT NULL DEFAULT 5,
    "intelligence" INTEGER NOT NULL DEFAULT 5,
    CONSTRAINT "Character_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("agility", "category_id", "defense", "hp", "id", "intelligence", "name", "strength") SELECT "agility", "category_id", "defense", "hp", "id", "intelligence", "name", "strength" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
