CREATE TABLE "user"(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR ,
    "email" VARCHAR UNIQUE NOT NULL,
    "email_verified" BOOLEAN
); 
-- // "date_created" DATE,
--     "last_login" DATE