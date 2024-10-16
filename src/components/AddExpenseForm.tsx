import { useFetcher } from "react-router-dom";
import { BudgetsModel } from "../models/BudgetsModel";
import { useRef } from "react";

interface AddExpenseFormProps {
    budgets: BudgetsModel[];  // Define props type for budgets
}
  
const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ budgets }) => {
    const fetcher = useFetcher();
    const formRef = useRef<HTMLInputElement | null>(null);;
    const focusRef = useRef<HTMLInputElement | null>(null);;

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Add New{" "}
                <span className="accent">
                    {budgets.length === 1 && budgets[0].name}
                </span>{" "}
                Expense
            </h2>
            <fetcher.Form 
                method="post" 
                className="grid-sm" 
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="e.g, Coffee"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input
                            type="number"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="e.g, 3.50"
                            step={0.01}
                            inputMode="decimal"
                            required
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {budgets.sort((a,b) => a.createdAt - b.createdAt)
                         .map((budget) => {
                            return (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            )
                         })
                        }
                    </select>
                </div>
            </fetcher.Form>
        </div>
    );
};

export default AddExpenseForm;