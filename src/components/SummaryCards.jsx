function SummaryCards({
  income,
  expense,
  balance,
  count
}) {
  return (
    <section className="summary-grid">

      <div className="summary-card income-card">

        <div className="summary-icon">
          ↗
        </div>

        <div>

          <span>
            Total Income
          </span>

          <h2>
            ₹
            {income.toLocaleString(
              "en-IN"
            )}
          </h2>

          <small>
            This month
          </small>

        </div>

      </div>

      <div className="summary-card expense-card">

        <div className="summary-icon">
          ↘
        </div>

        <div>

          <span>
            Total Expenses
          </span>

          <h2>
            ₹
            {expense.toLocaleString(
              "en-IN"
            )}
          </h2>

          <small>
            This month
          </small>

        </div>

      </div>

      <div className="summary-card balance-card">

        <div className="summary-icon">
          ₹
        </div>

        <div>

          <span>
            Net Balance
          </span>

          <h2>
            ₹
            {balance.toLocaleString(
              "en-IN"
            )}
          </h2>

          <small>
            Income − Expenses
          </small>

        </div>

      </div>

      <div className="summary-card count-card">

        <div className="summary-icon">
          #
        </div>

        <div>

          <span>
            Transactions
          </span>

          <h2>
            {count}
          </h2>

          <small>
            This month
          </small>

        </div>

      </div>

    </section>
  );
}

export default SummaryCards;