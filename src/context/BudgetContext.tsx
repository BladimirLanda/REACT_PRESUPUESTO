//CONTEXT-API BUDGET
/*
La Context API en React es una herramienta que permite compartir valores o 
estado entre diferentes componentes sin tener que pasar esos valores manualmente a 
través de props en cada nivel del árbol de componentes. Es una forma de "propagar" 
datos a través de la aplicación de manera más eficiente, especialmente cuando esos 
datos necesitan ser accesibles por varios componentes en diferentes niveles de la jerarquía.

La Context API permite crear un "contexto" global, donde puedes almacenar datos o estados y 
hacer que esos elementos estén disponibles para todos los componentes que lo necesiten, 
sin tener que pasarlos explícitamente como props.

-createContext(): Crea un contexto. Este contexto tiene un valor predeterminado que 
puede ser accedido por cualquier componente hijo que lo consuma.

-Provider: El componente Provider es el que provee el valor del contexto a los componentes 
que se encuentran dentro de su árbol. El value del Provider es el valor que quieres compartir en 
el contexto.

-useContext: Para acceder al valor del Contexto en un componente, puedes usar el hook useContext. 
useContext es un hook que facilita el acceso al valor del Contexto en componentes funcionales.
*/
import { createContext, useReducer, useMemo, Dispatch, ReactNode } from 'react'
import { BudgetActions, BudgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

//Type
type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number
}

type BudgetProvideProps = {
    //Representa cualquier cosa que pueda ser renderizada en React (componentes, texto, fragmentos, etc...)
    children: ReactNode 
}

/*
createContext<Tipo>: Aquí se está especificando el tipo de datos que el Contexto va a manejar. 
En este caso, el contexto BudgetContext tendrá un valor de tipo BudgetContextProps, que será
proveído por el BudgetProvider.

null!: Forma de decirle a TypeScript que a pesar de que este valor sea null, no nos dé un 
error sobre el valor (operador de afirmación de no-nulo).
El operador ! es un "non-null assertion operator" que le dice a TypeScript: 
"Confío en que este valor no es null ni undefined en este momento, aunque TypeScript no pueda comprobarlo".

Cuando creas un contexto con createContext, el valor que pasas es el valor inicial que tendrá el Contexto 
antes de que se proporcione un valor real. Al principio, no tenemos un valor real para el Contexto 
(porque el Contexto se va a "proveer" más adelante, en el BudgetProvider).
TypeScript obliga a dar un valor inicial para el Contexto, y si pasas null, TypeScript 
piensa que el tipo debería permitir null. Al poner null!, estamos forzando que TypeScript 
acepte null como valor inicial, pero confiando en que este valor será reemplazado más adelante 
por un valor real cuando el contexto sea proporcionado por el Provider.
*/
//Context
const BudgetContext = createContext<BudgetContextProps>(null!);

const BudgetProvider = ( {children} : BudgetProvideProps ) => {
    //Hooks
    const [ state, dispatch ] = useReducer(BudgetReducer, initialState);

    const totalExpenses = useMemo(() => state.expenses.reduce( (total, expense) => expense.amount + total, 0 ), 
    [state.expenses]);
    
    const remainingBudget = useMemo(() => state.budget - totalExpenses, [state.expenses, state.budget]);

    //-------PROVIDER-------/
    return (
        <BudgetContext.Provider value={ {state, dispatch, totalExpenses, remainingBudget} }>
            { children }
        </BudgetContext.Provider>
    )
}

//Componente Envoltor
export {
    BudgetProvider
}

//Componente Recursos
export default BudgetContext;


