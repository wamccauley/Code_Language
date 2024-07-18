
To duplicated a table in SQL:

```sql
CREATE TABLE new_table AS SELECT * FROM original_table;
```

To duplicated a column in SQL:

```sql
ALTER TABLE table_name
ADD COLUMN new_column_name column_definition AFTER existing_column_name;

UPDATE table_name
SET new_column_name = existing_column_name;

```