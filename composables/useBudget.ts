import { ref } from "vue";

interface Expense {
  name: string;
  amount: number;
}

export const useBudget = () => {
  const budget = ref<number>(0);
  const expenses = ref<Expense[]>([]);

  if (typeof window !== "undefined") {
    const storedBudget = localStorage.getItem("budget");
    const storedExpenses = localStorage.getItem("expenses");

    if (storedBudget) {
      budget.value = Number(storedBudget);
    }
    if (storedExpenses) {
      expenses.value = JSON.parse(storedExpenses).map((item: any) => ({
        name: item.name,
        amount: Number(item.amount),
      }));
    }
  }

  const addExpense = (expense: Expense) => {
    expenses.value.push(expense);

    if (typeof window !== "undefined") {
      localStorage.setItem("expenses", JSON.stringify(expenses.value));
    }
  };

  const totalSpent = () => {
    return expenses.value.reduce((sum, item) => sum + item.amount, 0);
  };

  const removeExpense = (index: number) => {
    expenses.value.splice(index, 1);

    if (typeof window !== "undefined") {
      localStorage.setItem("expenses", JSON.stringify(expenses.value));
    }
  };

  const setBudget = (newBudget: number) => {
    budget.value = newBudget;

  
    if (typeof window !== "undefined") {
      localStorage.setItem("budget", newBudget.toString());
    }
  };

  const resetAll = () => {
    budget.value = 0;
    expenses.value = [];
    
    if (typeof window !== "undefined") {
      localStorage.removeItem("budget");
      localStorage.removeItem("expenses");
    }
  };

  return { budget, expenses, addExpense, totalSpent, removeExpense, setBudget, resetAll };
};