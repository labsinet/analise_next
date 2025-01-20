I'll create a database migration using Prisma to set up the database schema properly.
Database Migration for Student Performance AnalysisClick to open code
Now, let's create the Prisma migration files:
Prisma Migration FilesClick to open code
To implement these migrations, follow these steps:

First, make sure your MariaDB server is running and you have created the database:
```sh
mysql -u root -p
```
```sh
CREATE DATABASE student_performance;
```
Initialize Prisma in your project if you haven't already:

```sh
npx prisma init
```
Create a new migration:

```sh
npx prisma migrate dev --name initial_schema
```
Apply the migration to your database:
```sh
npx prisma migrate deploy
```
Key features of this migration:

Users table:

Auto-incrementing ID
Unique constraints on username and email
Created_at and updated_at timestamps
All required fields from your specification


Analyses table:

Auto-incrementing ID
Foreign key relationship with Users table
All required fields for student performance analysis
Appropriate indexes for common queries


Indexes for optimization:

Combined index on year and semester for date-based queries
Index on subject for subject-based filtering
Index on department for department-based filtering


Data integrity:

ON DELETE CASCADE for the foreign key relationship
UTF8MB4 character set for full Unicode support
Proper decimal precision for numerical calculations