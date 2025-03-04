//COMPONENTE APP
import { useEffect, useMemo } from "react";
import useBudget from "./hooks/useBudget"
import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/modals/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
  //State
  const { state } = useBudget();

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state]);


  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  //---VIEW---//
  return (
    <>
      <header className="max-h-72 py-8 bg-blue-600">
        <h1 className="text-4xl text-center uppercase font-black text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto mt-10 p-10 bg-white shadow-lg rounded-lg">
        { isValidBudget ? <BudgetTracker /> : <BudgetForm /> }
      </div>

      { isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />

          <ExpenseList />
          
          <ExpenseModal /> 
        </main>
      )}
    </>
  )
}

export default App
