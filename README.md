# Massive

### Express
A framework we use to quickly build Node servers

### Postgres
Specific variety of relational database we will use here at DevMountain

### .env
A file at the root of our project. We will keep secure data in here like port numbers, connection string, API keys etc. Works very similar to a regular variable but there **IS NO SPACE BETWEEN THE EQUAL SIGN**

```
  SERVER_PORT=333
  CONNECTION_STRING=asl;fdkjasfl;jsaf;ljasdl;fjas;lfjasl;fjds
```

**Make sure that you put your `.env` file in your .gitignore file.**

### Massive
Data mapper that allows us to connect our express server to our postgres db hosted on heroku.

Massive is a function that takes in a connection string. We generally store this connection string as a variable in our .env file which will be at the root of our project.

Massive looks for a folder called `db` at the root of our project. You cannot call this folder anything else and it must be at the root. The `db` folder is where we will write our sql commands. Remember, our sql commands should end in `.sql`

```sql
select * from users;
```