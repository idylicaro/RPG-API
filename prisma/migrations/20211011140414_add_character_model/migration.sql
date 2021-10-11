-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL
);
