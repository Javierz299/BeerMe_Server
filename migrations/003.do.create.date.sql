CREATE TABLE "date" (
    "user_id" INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    "date" TIMESTAMP
);

--DATETIME - format: YYYY-MM-DD HH:MI:SS