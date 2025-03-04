//COMPONENTE EXPENS-LIST
import { useMemo } from "react";
import useBudget from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {
  //State
  const { state } = useBudget();

  //Funciones
  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => 
    expense.category === state.currentCategory) : state.expenses;
    
  //--State
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [state.expenses, state.currentCategory]);

 //---VIEW---// 
  return (
    <div className="mt-10 p-5 shadow-lg rounded-lg bg-white">
      {isEmpty ? <p className="text-2xl font-bold text-gray-600">No Hay Gastos</p> : (
        <>
          <p className="my-5 text-2xl font-bold text-gray-600">Listado de Gastos</p>
          {filteredExpenses.map(expense => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  )
}

export default ExpenseList