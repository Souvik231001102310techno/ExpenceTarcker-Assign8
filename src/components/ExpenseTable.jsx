function ExpenseTable({
  transactions,
  onDelete
}) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          ₹
        </div>

        <h3>
          No transactions found
        </h3>

        <p>
          Add a transaction or
          change your filters.
        </p>

      </div>
    );
  }

  return (
    <div className="table-wrapper">

      <table>

        <thead>

          <tr>
            <th>
              Transaction
            </th>

            <th>
              Category
            </th>

            <th>
              Date
            </th>

            <th>
              Type
            </th>

            <th>
              Amount
            </th>

            <th>
              Action
            </th>
          </tr>

        </thead>

        <tbody>

          {transactions.map(
            (transaction) => (
              <tr
                key={
                  transaction.id
                }
              >

                <td>

                  <div className="transaction-name">

                    <div
                      className={`transaction-icon ${
                        transaction.type ===
                        "Income"
                          ? "income-icon"
                          : "expense-icon"
                      }`}
                    >
                      {transaction.type ===
                      "Income"
                        ? "↗"
                        : "↘"}
                    </div>

                    <div>

                      <strong>
                        {
                          transaction.title
                        }
                      </strong>

                      {transaction.note && (
                        <span>
                          {
                            transaction.note
                          }
                        </span>
                      )}

                    </div>

                  </div>

                </td>

                <td>

                  <span className="category-badge">
                    {
                      transaction.category
                    }
                  </span>

                </td>

                <td>
                  {formatDate(
                    transaction.date
                  )}
                </td>

                <td>

                  <span
                    className={
                      transaction.type ===
                      "Income"
                        ? "income-label"
                        : "expense-label"
                    }
                  >
                    {
                      transaction.type
                    }
                  </span>

                </td>

                <td>

                  <strong
                    className={
                      transaction.type ===
                      "Income"
                        ? "amount-income"
                        : "amount-expense"
                    }
                  >

                    {transaction.type ===
                    "Income"
                      ? "+"
                      : "-"}

                    ₹
                    {Number(
                      transaction.amount
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </strong>

                </td>

                <td>

                  <button
                    className="delete-icon"
                    title="Delete transaction"
                    onClick={() =>
                      onDelete(
                        transaction.id
                      )
                    }
                  >
                    🗑
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}

function formatDate(date) {
  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );
}

export default ExpenseTable;