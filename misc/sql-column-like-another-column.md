To create a new column based on conditions from an old column using a `CASE` statement in SQL:
```sql
UPDATE your_table
SET new_column = 
    CASE
        WHEN old_column > 50 THEN 'Greater than 50'
        WHEN old_column <= 50 THEN 'Less than or equal to 50'
        ELSE 'Unknown'
    END;
```