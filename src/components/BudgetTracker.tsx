//COMPONENTE BUDGET-TRACKER
import { useMemo } from 'react';
import useBudget from "../hooks/useBudget"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar' //Circulo-Progreso React: npm i react-circular-progressbar
import 'react-circular-progressbar/dist/styles.css' //Hoja de Estilos Circulo-Progreso React
import AmountDisplay from "./AmountDisplay"

function BudgetTracker() {
    //State
    const { state, dispatch, remainingBudget, totalExpenses } = useBudget();

    const percentage = useMemo(() => +( (totalExpenses / state.budget) * 100 ).toFixed(2), [state.expenses]);

    console.log(percentage);
    
    //---VIEW---//
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center items-center">
                <CircularProgressbar 
                value={ percentage }
                styles={buildStyles({
                    pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
                    trailColor: '#F5F5F5',
                    textSize: 8,
                    textColor: '#3b82f6'
                })}
                text={`${percentage}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-7">
                <button
                type="button"
                className="w-full p-2 uppercase font-bold rounded-lg text-white bg-pink-600 hover:bg-pink-700"
                onClick={() => dispatch({type:'reset-app'}) }
                >
                    Resetear App
                </button>

                <AmountDisplay label="Presupuesto" amount={state.budget} />
                <AmountDisplay label="Disponible" amount={ remainingBudget } />
                <AmountDisplay label="Gastado" amount={ totalExpenses } />
            </div>
        </div>
    )
}

export default BudgetTracker