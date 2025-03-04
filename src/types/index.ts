//TYPES

//Type Category
export type Category = {
    id: string,
    name: string,
    icon: string;
}

//Type DatePicker (https://www.npmjs.com/package/react-date-picker)
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

//Type Expense
export type Expense = {
    id: string,
    expenseName: string,
    amount: number,
    category: string,
    date: Value;
}

//Type Draft (Borrador)
export type DraftExpense = Omit<Expense, 'id'>;


