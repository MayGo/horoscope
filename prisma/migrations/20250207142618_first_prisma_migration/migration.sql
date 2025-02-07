-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "customer_id" TEXT NOT NULL,
    "emailTime" TEXT NOT NULL DEFAULT '08:00',
    "horoscopeAge" TEXT NOT NULL DEFAULT 'Today''s',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "p_countryOfBirth" TEXT NOT NULL,
    "p_dateOfBirth" TIMESTAMP(3) NOT NULL,
    "p_horoscopeLength" TEXT NOT NULL,
    "p_timeOfBirth" TEXT NOT NULL,
    "price_id" TEXT NOT NULL,
    "sign" TEXT NOT NULL DEFAULT 'Aries',
    "subscription_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
