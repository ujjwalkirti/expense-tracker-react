declare module "my-module" {
  type Expense = {
    name: string;
    cost: number;
    type: string;
    description?: string;
    month: string;
    year?: number;
  };

  type MonthlyExpenses = {
    monthly_expense: Expense[];
    month_name: string;
  };

  type User = {
    name: string;
    email: string;
    id: string;
  };
}
