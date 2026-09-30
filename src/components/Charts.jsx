import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

function Charts({
  transactions
}) {
  const expenses =
    transactions.filter(
      (transaction) =>
        transaction.type ===
        "Expense"
    );

  const categoryData =
    Object.values(
      expenses.reduce(
        (result, transaction) => {
          const category =
            transaction.category;

          if (!result[category]) {
            result[category] = {
              name: category,
              value: 0
            };
          }

          result[category].value +=
            Number(
              transaction.amount
            );

          return result;
        },
        {}
      )
    );

  const totalIncome =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "Income"
      )
      .reduce(
        (sum, transaction) =>
          sum +
          Number(
            transaction.amount
          ),
        0
      );

  const totalExpense =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "Expense"
      )
      .reduce(
        (sum, transaction) =>
          sum +
          Number(
            transaction.amount
          ),
        0
      );

  const incomeExpenseData = [
    {
      name: "Income",
      amount: totalIncome
    },
    {
      name: "Expense",
      amount: totalExpense
    }
  ];

  const dailyData =
    Object.values(
      expenses.reduce(
        (result, transaction) => {
          const date =
            transaction.date;

          if (!result[date]) {
            result[date] = {
              date,
              amount: 0
            };
          }

          result[date].amount +=
            Number(
              transaction.amount
            );

          return result;
        },
        {}
      )
    ).sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );

  const pieColors = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
    "#8b5cf6",
    "#14b8a6",
    "#f97316",
    "#64748b"
  ];

  return (
    <div className="charts-container">

      <div className="chart-card">

        <div className="chart-header">

          <div>
            <h3>
              Expenses by Category
            </h3>

            <p>
              Where your money is going
            </p>
          </div>

          <span className="chart-badge">
            PIE
          </span>

        </div>

        {categoryData.length ===
        0 ? (
          <div className="chart-empty">
            No expense data
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
                paddingAngle={3}
              >

                {categoryData.map(
                  (_, index) => (
                    <Cell
                      key={
                        `cell-${index}`
                      }
                      fill={
                        pieColors[
                          index %
                            pieColors.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`
                }
              />

              <Legend />

            </PieChart>

          </ResponsiveContainer>
        )}

      </div>

      <div className="chart-card">

        <div className="chart-header">

          <div>
            <h3>
              Income vs Expense
            </h3>

            <p>
              Monthly comparison
            </p>
          </div>

          <span className="chart-badge">
            BAR
          </span>

        </div>

        <ResponsiveContainer
          width="100%"
          height={280}
        >

          <BarChart
            data={
              incomeExpenseData
            }
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `₹${Number(
                  value
                ).toLocaleString(
                  "en-IN"
                )}`
              }
            />

            <Bar
              dataKey="amount"
              fill="#6366f1"
              radius={[
                6,
                6,
                0,
                0
              ]}
              barSize={55}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card full-chart">

        <div className="chart-header">

          <div>
            <h3>
              Daily Expense Trend
            </h3>

            <p>
              Track your spending over time
            </p>
          </div>

          <span className="chart-badge">
            LINE
          </span>

        </div>

        {dailyData.length ===
        0 ? (
          <div className="chart-empty">
            No daily expense data
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={dailyData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`
                }
              />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />

            </LineChart>

          </ResponsiveContainer>
        )}

      </div>

    </div>
  );
}

export default Charts;