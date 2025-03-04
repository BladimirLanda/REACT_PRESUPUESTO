//COMPONENTE BUDGET FORM
import { useState, useMemo, ChangeEvent, FormEvent } from "react"
import useBudget from "../hooks/useBudget";

function BudgetForm() {
    //State
    const [ budget, setBudget ] = useState(0);
    const { dispatch } = useBudget();

    //Eventos
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value);
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch( {type: 'add-budget', payload: { budget }} )
    }

    //Funciones
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);

    //---VIEW---//
    return (
        <form className="space-y-5" onSubmit={ handleSubmit }>
            <div className="space-y-5 flex flex-col">
                <label htmlFor="budget" className="text-4xl text-center text-blue-600 font-bold">
                    Definir Presupuesto
                </label>

                <input 
                type="number" 
                min="0"
                id="budget" 
                name="budget"
                placeholder="Define tu Presupuesto"
                className="w-full p-2 bg-white border border-gray-200"
                value={budget}
                onChange={ handleChange }
                />
            </div>

            <input 
            type="submit"
            className="w-full p-2 text-white font-black uppercase bg-blue-600 hover:bg-blue-700 
            cursor-pointer disabled:opacity-40 disabled:cursor-default disabled:hover:bg-blue-600"
            value="Definir Presupuesto"
            disabled={ isValid }
            />
        </form>
    )
}

export default BudgetForm