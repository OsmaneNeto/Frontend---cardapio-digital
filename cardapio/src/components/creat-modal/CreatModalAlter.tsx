import { useEffect, useState } from "react";
import { useFoodDataAlter } from '../../hooks/useFoodDataAlter';
import { FoodData } from "../../interface/FoodData";
import "./modal.css";

interface InputProps {
    label: string;
    value: string | number;
    updateValue: (value: any) => void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <div>
            <label>{label}</label>
            <input 
                className="input-field" 
                value={value} 
                onChange={e => updateValue(label === "Price" ? parseFloat(e.target.value) : e.target.value)} 
                type={label === "Price" ? "number" : "text"} // Define tipo baseado no label
            />
        </div>
    );
};

interface CreatModalAlterProps {
    closeModal(): void;
    foodData: FoodData; // Adicionando foodData como prop
}

export function CreatModalAlter({ closeModal, foodData }: CreatModalAlterProps) {
    const [title, setTitle] = useState(foodData.title);
    const [price, setPrice] = useState(foodData.price);
    const [image, setImage] = useState(foodData.image);
    const { updateMutate } = useFoodDataAlter(); // Utilize updateMutate

    const submit = (e: React.FormEvent) => {
        e.preventDefault(); // Previna o comportamento padrão do formulário
        const updatedFoodData: FoodData = {
            title,
            price,
            image
        };

        // Use a asserção de não nulo (se você tiver certeza de que id não é undefined)
        updateMutate.mutate({ id: foodData.id!, data: updatedFoodData }); // Chamada para atualizar
    };

    useEffect(() => {
        if (updateMutate.isSuccess) {
            closeModal();
        }
    }, [updateMutate.isSuccess]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Alterar item no cardápio</h2>
                <form className="input-container" onSubmit={submit}>
                    <Input label="Title" value={title} updateValue={setTitle} />
                    <Input label="Price" value={price} updateValue={setPrice} />
                    <Input label="Image" value={image} updateValue={setImage} />
                    <button type="submit" className="btn-secondary">Alterar</button>
                </form>
            </div>
        </div>
    );
}