CREATE TABLE "drink" (
    "user_id" INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    "beer" INT,
    "seltzer" INT,
    "craft_beer" INT,
    "wine" INT,
    "shots" INT,
    "cocktail" INT,
    "date" DATE
);
-- DATE - format YYYY-MM-DD



-- drinks
-- ----------
--  user_id | beer | wine | shots | cocktail | date
-- ----------------------------------------------------
--     15   |  3   | 2    |  2     |  1       | 08-13-2020