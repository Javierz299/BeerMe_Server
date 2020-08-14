CREATE TABLE "date" (
    "user_id" INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    "username" VARCHAR REFERENCES "user"(username)
    "date" DATETIME,
);

--DATETIME - format: YYYY-MM-DD HH:MI:SS