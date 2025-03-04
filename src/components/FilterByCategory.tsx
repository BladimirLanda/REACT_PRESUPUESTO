//COMPONENTE FILTRO POR CATEGORIA
import useBudget from "../hooks/useBudget"
import { categories } from "../data/categories"
import { ChangeEvent } from "react";

function FilterByCategory() {
    //State
    const { dispatch } = useBudget();

    //Eventos
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch( {type:'add-filter-category', payload: {id: e.target.value}} )
    }

    //---VIEW---//
    return (
        <div className="p-10 shadow-lg rounded-lg bg-white">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select 
                    id="category"
                    name="category" 
                    className="flex-1 p-3 rounded bg-slate-100"
                    onChange={ handleChange }
                    >
                        <option value="">-- Todas las Categorias --</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </form>
        </div>  
    )
}

export default FilterByCategory