//COMPONENT SUGGESTION DISPLAY
import { useMemo } from 'react';
import useBudget from "../hooks/useBudget"
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css' 
import { formatCurrency } from "../helpers";

function SuggestionDisplay() {
    //State
    const { state } = useBudget();

    const budget50 = useMemo(() => +(state.budget * 0.5).toFixed(2), [state.budget]);
    const budget30 = useMemo(() => +(state.budget * 0.3).toFixed(2), [state.budget]);
    const budget20 = useMemo(() => +(state.budget * 0.2).toFixed(2), [state.budget]); 

    //---VIEW---//
    return (
        <div className="w-full p-2 text-center">
            <h1 className="py-2 uppercase text-xl font-bold border-b-4 border-blue-500 sm:text-2xl">
                Aplica la Regla <span className="text-blue-600 font-black">50-30-20</span> {''}
                en tu <span className="text-blue-600 font-black">Presupuesto Personal</span>
            </h1>

            <div className="mb-4 flex justify-center items-center flex-col md:flex-row md:mb-0">
                <p className="m-3 text-4xl text-blue-600 font-bold uppercase">
                    { formatCurrency(state.budget) } 
                </p>
                <p className="text-xl text-blue-800">Presupuesto Base</p>
            </div>

            <div className="flex justify-center items-center">
                <CircularProgressbarWithChildren
                    value={80}
                    styles={buildStyles({
                      pathColor: "#3b82f6",
                      trailColor: "#0353A4",
                      strokeLinecap: "butt"
                    })}
                >
                    <img
                    className="w-24 -mt-36 position: absolute"
                    src="https://i.imgur.com/b9NyUGm.png"
                    alt="doge"
                    />

                    <div className="text-lg mt-5 position: absolute">
                        <p className="font-bold">
                            <strong className="text-blue-400">50% Básicos:</strong> { formatCurrency(budget50) }
                        </p>

                        <p className="font-bold">
                            <strong className="text-blue-600">30% Deseos:</strong> { formatCurrency(budget30) }
                        </p>

                        <p className="font-bold">
                            <strong className="text-blue-800">20% Ahorro:</strong> { formatCurrency(budget20) }
                        </p>
                    </div>

                    <CircularProgressbar
                    value={50}
                    styles={buildStyles({
                        pathColor: "#46b3f3",
                        trailColor: "transparent",
                        strokeLinecap: "butt",
                    })}
                    />
                </CircularProgressbarWithChildren>
            </div>

            <div className="mt-2 text-slate-400 font-normal text-right text-xs xs:mt-0">
                <p>*Básicos: Alquiler, Servicos Públicos, Alimentos</p>
                <p>*Deseos: Restaurante, Entretenimiento, Vestimenta</p>
                <p>*Ahorro: Fondo de Pensión, Fondo de Emergencia</p>
            </div>
        </div>
    )
}

export default SuggestionDisplay