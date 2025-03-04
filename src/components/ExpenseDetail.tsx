//COMPONENTE EXPENSE-DETAIL
import { useMemo } from "react"
import useBudget from "../hooks/useBudget"
//Desplazamiento React: npm i react-swipeable-list + npm install prop-types (https://www.npmjs.com/package/react-swipeable-list)
import { SwipeableList, SwipeableListItem, LeadingActions, TrailingActions, SwipeAction } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css' //Hoja de Estilos React-Swipeable-List
import { categories } from "../data/categories"
import type { Expense } from "../types"
import { formatDate } from "../helpers"
import AmountDisplay from "./AmountDisplay"

//Type
type ExpenseDetailProps = {
    expense: Expense
}

function ExpenseDetail( { expense } : ExpenseDetailProps ) {
    //State
    const { dispatch } = useBudget();

    const categoryInfo = useMemo(() => categories.filter(category => category.id === expense.category)[0] , [expense]);

    //Funciones
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
            onClick={() => dispatch( {type:'get-expense-by-id', payload: {id: expense.id}} )}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive={true} 
            onClick={() => dispatch( {type:'remove-expense', payload: {id: expense.id}} )}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    //---VIEW---//
    return (
        <SwipeableList>
            {/*maxSwipe: Recorrido (max-1) leadingActions:Izquierdo trailingActions:Derecho*/}
            <SwipeableListItem maxSwipe={1} leadingActions={ leadingActions() } trailingActions={ trailingActions() } >
                <div className="w-full p-10 border-b border-gray-200 shadow-lg bg-white flex gap-5 items-center">
                    <div>
                        <img src={`icono_${categoryInfo.icon}.svg`} alt="icono-gasto" className="w-20"/>
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-sm text-slate-600" >{ formatDate(expense.date!.toString()) }</p>
                    </div>

                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetail