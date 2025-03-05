//REDUCER BUDGET
import { v4 as uuidv4 } from 'uuid' //Librería IDs: npm i uuid
import { Category, DraftExpense, Expense } from "../types"

//Types
//--Actions
export type BudgetActions = {
    type: 'add-budget',
    payload: {
        budget: number
    }
} | {
    type: 'show-modal'
} | {
    type: 'close-modal'
}  | {
    type: 'show-modal-two'
} | {
    type: 'close-modal-two'
} | {
    type: 'add-expense',
    payload: {
        expense: DraftExpense
    }
} | {
    type: 'remove-expense',
    payload: {
        id: Expense['id']
    }
} | {
    type: 'get-expense-by-id',
    payload: {
        id: Expense['id']
    }
} | {
    type: 'update-expense',
    payload: {
        expense: Expense
    }
} | {
    type: 'reset-app'
} | {
    type: 'add-filter-category',
    payload: {
        id: Category['id']
    }
}

//--State
export type BudgetState = {
    budget: number,
    modal: boolean,
    modalSug: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory: Category['id']
}

//Funciones - Estados Iniciales
const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0;
}

const initialExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses): [];
}

//Estado Inicial
export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    modalSug: false,
    expenses: initialExpenses(),
    editingId: '',
    currentCategory: ''
}

//Funciones
const createExpense = (draftExpense : DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

//Reducer
export const BudgetReducer = (state: BudgetState = initialState, actions: BudgetActions) => {
    if(actions.type === 'add-budget') {
        return {
            ...state,
            budget: actions.payload.budget
        }
    }

    if(actions.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if(actions.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if(actions.type === 'show-modal-two') {
        return {
            ...state,
            modalSug: true
        }
    }

    if(actions.type === 'close-modal-two') {
        return {
            ...state,
            modalSug: false
        }
    }

    if(actions.type === 'add-expense') {
        const newExpense = createExpense(actions.payload.expense);

        return {
            ...state,
            modal: false,
            expenses: [...state.expenses, newExpense]
        }
    }

    if(actions.type === 'remove-expense') {
        const expensesUpdated = state.expenses.filter(expense => expense.id !== actions.payload.id);

        return {
            ...state,
            expenses: expensesUpdated
        }
    }

    if(actions.type === 'get-expense-by-id') {
        return {
            ...state,
            modal: true,
            editingId: actions.payload.id
        }
    }

    if(actions.type === 'update-expense') {
        const expensesUpdated = state.expenses.map(expense => expense.id === actions.payload.expense.id
            ? actions.payload.expense : expense);

        return {
            ...state,
            modal: false,
            expenses: expensesUpdated,
            editingId: ''
        }
    }

    if(actions.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if(actions.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: actions.payload.id
        }
    }

    return state;
}