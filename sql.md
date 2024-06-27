# SQL

## Basic SQL Commands

### Data Definition Language (DDL)

- **CREATE TABLE**: Creates a new table.

  ```sql
  CREATE TABLE table_name (
      column1 datatype PRIMARY KEY,
      column2 datatype,
      column3 datatype,
      ...
  );
  ```

- **DROP TABLE**: Deletes a table.

  ```sql
  DROP TABLE table_name;
  ```

- **ALTER TABLE**: Adds, deletes, or modifies columns in a table.

  ```sql
  ALTER TABLE table_name
  ADD column_name datatype;

  ALTER TABLE table_name
  DROP COLUMN column_name;

  ALTER TABLE table_name
  MODIFY COLUMN column_name datatype;
  ```

### Data Manipulation Language (DML)

- **SELECT**: Retrieves data from a database.

  ```sql
  SELECT column1, column2, ...
  FROM table_name;
  ```

- **INSERT INTO**: Inserts new data into a table.

  ```sql
  INSERT INTO table_name (column1, column2, ...)
  VALUES (value1, value2, ...);
  ```

- **UPDATE**: Modifies existing data in a table.

  ```sql
  UPDATE table_name
  SET column1 = value1, column2 = value2, ...
  WHERE condition;
  ```

- **DELETE**: Deletes data from a table.
  ```sql
  DELETE FROM table_name
  WHERE condition;
  ```

### Data Control Language (DCL)

- **GRANT**: Gives a user permission to access the database.

  ```sql
  GRANT ALL PRIVILEGES ON database_name.*
  TO 'username'@'host';
  ```

- **REVOKE**: Removes user access rights or privileges.
  ```sql
  REVOKE ALL PRIVILEGES ON database_name.*
  FROM 'username'@'host';
  ```

### Transaction Control Language (TCL)

- **COMMIT**: Saves all transactions to the database.

  ```sql
  COMMIT;
  ```

- **ROLLBACK**: Restores the database to the last committed state.

  ```sql
  ROLLBACK;
  ```

- **SAVEPOINT**: Sets a point within a transaction to which you can later roll back.

  ```sql
  SAVEPOINT savepoint_name;
  ```

- **RELEASE SAVEPOINT**: Removes a savepoint.

  ```sql
  RELEASE SAVEPOINT savepoint_name;
  ```

- **SET TRANSACTION**: Sets the properties of the current transaction.
  ```sql
  SET TRANSACTION READ ONLY;
  ```

## Advanced SQL

### Joins

- **INNER JOIN**: Returns records that have matching values in both tables.

  ```sql
  SELECT columns
  FROM table1
  INNER JOIN table2
  ON table1.column = table2.column;
  ```

- **LEFT JOIN (or LEFT OUTER JOIN)**: Returns all records from the left table, and the matched records from the right table.

  ```sql
  SELECT columns
  FROM table1
  LEFT JOIN table2
  ON table1.column = table2.column;
  ```

- **RIGHT JOIN (or RIGHT OUTER JOIN)**: Returns all records from the right table, and the matched records from the left table.

  ```sql
  SELECT columns
  FROM table1
  RIGHT JOIN table2
  ON table1.column = table2.column;
  ```

- **FULL JOIN (or FULL OUTER JOIN)**: Returns all records when there is a match in either left or right table.
  ```sql
  SELECT columns
  FROM table1
  FULL OUTER JOIN table2
  ON table1.column = table2.column;
  ```

### Subqueries

- **Subquery in SELECT**:

  ```sql
  SELECT column1,
      (SELECT column_name
       FROM table_name
       WHERE condition) AS alias_name
  FROM table_name;
  ```

- **Subquery in WHERE**:
  ```sql
  SELECT column_name
  FROM table_name
  WHERE column_name = (SELECT column_name
                       FROM table_name
                       WHERE condition);
  ```

### Common Table Expressions (CTE)

- **WITH CTE**:
  ```sql
  WITH cte_name AS (
      SELECT column1, column2, ...
      FROM table_name
      WHERE condition
  )
  SELECT column1, column2, ...
  FROM cte_name;
  ```

### Window Functions

- **ROW_NUMBER()**: Assigns a unique number to each row.

  ```sql
  SELECT column1,
         ROW_NUMBER() OVER (PARTITION BY column2 ORDER BY column3) AS row_num
  FROM table_name;
  ```

- **RANK()**: Assigns a rank to each row within the partition of a result set.

  ```sql
  SELECT column1,
         RANK() OVER (PARTITION BY column2 ORDER BY column3) AS rank
  FROM table_name;
  ```

- **DENSE_RANK()**: Similar to RANK(), but without gaps in the ranking.

  ```sql
  SELECT column1,
         DENSE_RANK() OVER (PARTITION BY column2 ORDER BY column3) AS dense_rank
  FROM table_name;
  ```

- **NTILE(n)**: Divides the result set into `n` number of roughly equal groups.
  ```sql
  SELECT column1,
         NTILE(4) OVER (ORDER BY column2) AS quartile
  FROM table_name;
  ```

### Aggregate Functions

- **COUNT()**: Returns the number of rows that matches a specified criterion.

  ```sql
  SELECT COUNT(column_name)
  FROM table_name
  WHERE condition;
  ```

- **SUM()**: Returns the total sum of a numeric column.

  ```sql
  SELECT SUM(column_name)
  FROM table_name
  WHERE condition;
  ```

- **AVG()**: Returns the average value of a numeric column.

  ```sql
  SELECT AVG(column_name)
  FROM table_name
  WHERE condition;
  ```

- **MIN()**: Returns the smallest value of the selected column.

  ```sql
  SELECT MIN(column_name)
  FROM table_name
  WHERE condition;
  ```

- **MAX()**: Returns the largest value of the selected column.
  ```sql
  SELECT MAX(column_name)
  FROM table_name
  WHERE condition;
  ```

### String Functions

- **CONCAT()**: Concatenates two or more strings.

  ```sql
  SELECT CONCAT(string1, string2, ...)
  FROM table_name;
  ```

- **SUBSTRING()**: Extracts characters from a string.

  ```sql
  SELECT SUBSTRING(column_name, start, length)
  FROM table_name;
  ```

- **LENGTH()**: Returns the length of a string.

  ```sql
  SELECT LENGTH(column_name)
  FROM table_name;
  ```

- **UPPER()**: Converts a string to uppercase.

  ```sql
  SELECT UPPER(column_name)
  FROM table_name;
  ```

- **LOWER()**: Converts a string to lowercase.
  ```sql
  SELECT LOWER(column_name)
  FROM table_name;
  ```

### Date Functions

- **CURRENT_DATE**: Returns the current date.

  ```sql
  SELECT CURRENT_DATE;
  ```

- **CURRENT_TIME**: Returns the current time.

  ```sql
  SELECT CURRENT_TIME;
  ```

- **DATEDIFF()**: Returns the difference between two dates.

  ```sql
  SELECT DATEDIFF(date1, date2);
  ```

- **DATE_ADD()**: Adds a time/date interval to a date.

  ```sql
  SELECT DATE_ADD(date, INTERVAL value unit);
  ```

- **DATE_SUB()**: Subtracts a time/date interval from a date.
  ```sql
  SELECT DATE_SUB(date, INTERVAL value unit);
  ```

### Indexes

- **CREATE INDEX**: Creates an index on a table.

  ```sql
  CREATE INDEX index_name
  ON table_name (column1, column2, ...);
  ```

- **DROP INDEX**: Deletes an index from a table.
  ```sql
  DROP INDEX index_name;
  ```

### Views

- **CREATE VIEW**: Creates a virtual table based on the result set of an SQL query.

  ```sql
  CREATE VIEW view_name AS
  SELECT column1, column2, ...
  FROM table_name
  WHERE condition;
  ```

- **DROP VIEW**: Deletes a view.
  ```sql
  DROP VIEW view_name;
  ```

### Constraints

- **NOT NULL**: Ensures that a column cannot have a NULL value.

  ```sql
  CREATE TABLE table_name (
      column1 datatype NOT NULL,
      column2 datatype,
      ...
  );
  ```

- **UNIQUE**: Ensures that all values in a column are unique.

  ```sql
  CREATE TABLE table_name (
      column1 datatype UNIQUE,
      column2 datatype,
      ...
  );
  ```

- **PRIMARY KEY**: Uniquely identifies each record in a table.

  ```sql
  CREATE TABLE table_name (
      column1 datatype PRIMARY KEY,
      column2 datatype,
      ...
  );
  ```

- **FOREIGN KEY**: Uniquely identifies a row/record in another table.

  ```sql
  CREATE TABLE table_name (
      column1 datatype,
      column2 datatype,
      FOREIGN KEY (column1) REFERENCES other_table(column)


  );
  ```

- **CHECK**: Ensures that all values in a column satisfy a specific condition.

  ```sql
  CREATE TABLE table_name (
      column1 datatype,
      column2 datatype,
      CHECK (condition)
  );
  ```

- **DEFAULT**: Sets a default value for a column if no value is specified.
  ```sql
  CREATE TABLE table_name (
      column1 datatype DEFAULT default_value,
      column2 datatype,
      ...
  );
  ```
