//CUSTOM HOOK - BUDGET
/*
Un Custom Hook en React es una función JavaScript que permite 
reutilizar lógica de estado y efectos entre componentes funcionales. 
Los hooks personalizados son una forma de abstraer y encapsular la lógica 
que se puede compartir entre múltiples componentes sin necesidad de duplicar 
código. Esto mejora la reutilización de código y hace que la lógica esté más organizada.

En React, los hooks como useState, useEffect o useContext son funciones especiales 
que permiten usar características de React (como el estado o el contexto) dentro 
de componentes funcionales. Los custom hooks son simplemente funciones que usan 
estos hooks de React, pero encapsulan esa lógica en un lugar central para poder 
reutilizarla en diferentes componentes.
*/
import { useContext } from "react"
import BudgetContext from "../context/BudgetContext"

//useContext(): Hook de React que se utiliza para acceder al valor de un Contexto
const useBudget = () => {
    return useContext(BudgetContext);
}

export default useBudget;