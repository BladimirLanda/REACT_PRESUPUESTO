//COMPONENTE AMOUNT-DISPLAY
import { formatCurrency } from "../helpers";

//Type
type AmountDisplayProp = {
    label?: string,
    amount: number;
}

function AmountDisplay( {label, amount} : AmountDisplayProp ) {

    //---VIEW---//
    return (
        <div className={`p-1 text-center ${label && 'w-full bg-slate-100 shadow-md'}`}>
            <p className="text-2xl font-bold text-blue-600">
                {label && `${label}: `}
                <span className="font-black text-black">{ formatCurrency(amount) }</span>
            </p>
        </div>
    )
}

export default AmountDisplay