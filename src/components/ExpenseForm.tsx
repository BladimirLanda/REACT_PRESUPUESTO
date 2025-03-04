//COMPONENTE EXPENSE-FORM
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import useBudget from '../hooks/useBudget';
import { categories } from "../data/categories"
import type { DraftExpense, Value } from '../types';
import DatePicker from 'react-date-picker'; //Fechas React: npm i react-date-picker
import 'react-date-picker/dist/DatePicker.css' //Hoja de Estilos React-Date-Picker
import 'react-calendar/dist/Calendar.css' //Calendario React: npm i react-calendar //Hoja de Estilos React-Calender
import ErrorMessage from './modals/ErrorMessage';

function ExpenseForm() {
    //State
    const [ expense, setExpense ] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    });

    const [ error, setError ] = useState('');
    const [ previousAmount, setPreviousAmount ] = useState(0);
    const { state, dispatch, remainingBudget } = useBudget();

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(expense => expense.id === state.editingId)[0];

            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount);
        }
    }, [state.editingId]);

    //Eventos
    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);

        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        });
    }

    const handleChangeDate = ( value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSumbit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Object.values(expense).includes('')) {
            setError("Todos los Campos son Obligatorios");
            return;
        }

        if( (expense.amount - previousAmount) > remainingBudget ) {
            setError("El Gato Superó el Presupuesto");
            return;
        }

        if(state.editingId) {
            dispatch( {type: 'update-expense', payload: { expense: {...expense, id: state.editingId} }} );
        } else {
            dispatch( {type: 'add-expense', payload: { expense }} );
        }

        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        });
        setPreviousAmount(0);
    }

    //---VIEW---//
    return (
        <form className="space-y-5" onSubmit={ handleSumbit }>
            <legend className="py-2 uppercase text-center text-2xl font-black border-b-4 border-blue-500">
                {state.editingId  ? 'Actualizar Gasto' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage error={error} />}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre Gasto:
                </label>

                <input 
                type="text" 
                id="expenseName"
                name="expenseName"
                placeholder="Añade el Nombre del Gasto (ej. Medicina)"
                className="p-2 bg-slate-100"
                value={expense.expenseName}
                onChange={ handleChange }
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>

                <input 
                type="number" 
                min="0"
                id="amount"
                name="amount"
                placeholder="Añade la Cantidad del Gasto (ej. 300)"
                className="p-2 bg-slate-100"
                value={expense.amount}
                onChange={ handleChange }
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Categoría:
                </label>

                <select 
                id="category"
                name="category"
                className="p-2 bg-slate-100"
                value={expense.category}
                onChange={ handleChange }
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Fecha Gasto:
                </label>

                {/*DatePicker: Comportamiento como Input-En eventos el 'value' es directo*/}
                <DatePicker 
                className= "p-2 bg-slate-200" 
                value={expense.date}
                onChange={ handleChangeDate }
                />
            </div>
            
            <input 
            type="submit"
            className="w-full p-2 text-white uppercase font-bold rounded-lg bg-blue-600 cursor-pointer
            hover:bg-blue-700" 
            value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    )
}

export default ExpenseForm