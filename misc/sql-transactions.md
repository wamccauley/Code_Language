### SQL Transactions

SQL transactions are sequences of operations performed as a single logical unit of work. A transaction ensures that a set of SQL operations either all succeed or all fail, maintaining the consistency of the database.

#### Characteristics of Transactions

1. **Atomicity**: Ensures that all operations within a transaction are completed successfully. If any operation fails, the entire transaction is rolled back, and the database remains unchanged.
2. **Consistency**: Guarantees that a transaction transforms the database from one valid state to another, maintaining database rules such as constraints and triggers.
3. **Isolation**: Ensures that the operations within a transaction are isolated from other transactions. This prevents concurrent transactions from interfering with each other.
4. **Durability**: Once a transaction has been committed, it remains committed even in the event of a system failure. This ensures that the results of the transaction are permanent.

#### Transaction Control Statements

- **BEGIN TRANSACTION**: Marks the start of a transaction.
- **COMMIT**: Saves all the changes made in the transaction. Once committed, the changes are permanent.
- **ROLLBACK**: Reverts the database to its previous state before the transaction began, undoing all changes made during the transaction.
- **SAVEPOINT**: Sets a point within a transaction to which you can roll back without affecting the entire transaction.
- **RELEASE SAVEPOINT**: Removes a savepoint, making it no longer available for a rollback.

```sql
BEGIN TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE account_id = 2;

COMMIT;
```

In this example, money is being transferred from one account to another. Both updates are part of a single transaction, ensuring that either both updates succeed or both fail.

#### Isolation Levels

Isolation levels determine how transaction integrity is maintained with respect to concurrent transactions. The standard isolation levels are:

1. **Read Uncommitted**: Allows transactions to read data from uncommitted transactions. This can lead to dirty reads.
2. **Read Committed**: Ensures that any data read is committed at the moment it is read. This prevents dirty reads but allows non-repeatable reads.
3. **Repeatable Read**: Ensures that if a transaction reads the same data again, it will read the same value. This prevents dirty and non-repeatable reads but can still suffer from phantom reads.
4. **Serializable**: The highest isolation level, ensuring complete isolation from other transactions. It prevents dirty reads, non-repeatable reads, and phantom reads by serializing access to the data.
