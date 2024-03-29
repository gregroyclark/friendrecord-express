CREATE TABLE IF NOT EXISTS users (
  "id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "hashedPassword" VARCHAR(255) NOT NULL,
  "userId" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS friends (
  "id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "email" VARCHAR(255),
  "phoneNumber" VARCHAR(255),
  "notes" TEXT,
  "userId" VARCHAR(255) NOT NULL
);