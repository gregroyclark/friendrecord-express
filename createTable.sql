CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phoneNumberVARCHAR(255) NOT NULL,
  notes TEXT,
  userId VARCHAR(255) UNIQUE NOT NULL,
);