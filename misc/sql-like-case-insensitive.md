## SQL LIKE Case Insensitive

To make the search case-sensitive in SQL, you typically need to ensure that your database collation or the comparison method used in your query is case-sensitive.

```sql
SELECT stock FROM `nw_product` WHERE BINARY model LIKE 'Wf-%';
```

Here, `BINARY` is used to force a binary (case-sensitive) comparison. This means that the `LIKE` operator will match 'Wf-' but not 'wf-' or any other case variation.

Depending on your database system (like MySQL, PostgreSQL, etc.), you might adjust the collation of the `model` column to a case-sensitive collation (e.g., `utf8_bin` for MySQL).

For MySQL, you can also use `COLLATE` to specify a case-sensitive collation directly in the query:

```sql
SELECT stock FROM `nw_product` WHERE model LIKE 'Wf-%' COLLATE utf8_bin;
```

Replace `utf8_bin` with the appropriate collation for your database if you're not using UTF-8.
