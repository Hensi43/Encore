-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentId" TEXT,
    "paymentScreenshot" TEXT,
    "passType" TEXT,
    "securityDeposit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "id", "passType", "paymentId", "paymentScreenshot", "status", "totalAmount", "updatedAt", "userId") SELECT "createdAt", "id", "passType", "paymentId", "paymentScreenshot", "status", "totalAmount", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
