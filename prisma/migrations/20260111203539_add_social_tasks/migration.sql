-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "college" TEXT,
    "year" TEXT,
    "accommodation" TEXT,
    "paymentId" TEXT,
    "paymentVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "referralCode" TEXT,
    "referredBy" TEXT,
    "caCoins" INTEGER NOT NULL DEFAULT 0,
    "taskInsta" BOOLEAN NOT NULL DEFAULT false,
    "taskLinkedIn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("accommodation", "caCoins", "college", "createdAt", "email", "id", "name", "paymentId", "paymentVerified", "phone", "referralCode", "referredBy", "role", "year") SELECT "accommodation", "caCoins", "college", "createdAt", "email", "id", "name", "paymentId", "paymentVerified", "phone", "referralCode", "referredBy", "role", "year" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
