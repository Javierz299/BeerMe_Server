






-- friend --
        -- keep decline request and patch values when needed
--user_id-- sent request to -- user accepted request-- user declined request
----------------------------------------------------------------------------------
--15      |   16         |      true       |     null         -- 15 following 16 can see all data
--16      |    15        |                 |    false        -- 16 was declined cant see 15s data
                                                            --can resend again and patch
                                                            --if user accepts this time
                                                            -- patch accepted to true
                                                            -- and declined back to null


-- user 15 sent request to user 16
-- user 16 recieves notifaction that user 15 sent a request
-- user 16 accecpts request => true

-- get friends => get request( by id) => filter user by id, select all row data.
-- if user accepted request is true then find user 16 and return all data

-- get friends => get request( by id) => filter user by id, select all row data.
-- if user declined request => primary user_id gets notifaction that sent request declined.






