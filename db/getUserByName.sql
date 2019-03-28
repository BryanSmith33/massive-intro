select * from users
-- here we use the built in lower function on the first_name and variable we pass in
-- this allows us to make sure that we are comparing the same cased strings
where lower(first_name) = lower($1);