CREATE TABLE "drink" (
    "user_id" INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    "beer" INT,
    "wine" INT,
    "shots" INT,
    "cocktail" INT,
    "date" TIMESTAMP
);




-- drinks
-- ----------
--  user_id | beer | wine | shots | cocktail | date
-- ----------------------------------------------------
--     15   |  3   | 2    |  2     |  1       | 08-13-2020