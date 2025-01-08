import { useEffect, useState } from "react";
import { useFoodDataAlter } from '../../hooks/useFoodDataAlter';
import { useFoodDataDelete } from '../../hooks/useFoodDataDelete';
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
                type={label === "Price" ? "number" : "text"}
            />
        </div>
    );
};

interface CreatModalAlterProps {
    closeModal(): void;
    foodData: FoodData;
}

export function CreatModalAlter({ closeModal, foodData }: CreatModalAlterProps) {
    const [title, setTitle] = useState(foodData.title);
    const [price, setPrice] = useState(foodData.price);
    const [image, setImage] = useState(foodData.image);
    const { updateMutate } = useFoodDataAlter();
    const { mutate: deleteMutate, isSuccess: deleteSuccess } = useFoodDataDelete();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedFoodData: FoodData = { title, price, image };
        updateMutate.mutate({ id: foodData.id!, data: updatedFoodData });
    };

    const onDelete = () => {
        if (foodData.id) {
            deleteMutate(foodData.id);
        } else {
            console.error("Food ID is not defined for deletion.");
        }
    };

    useEffect(() => {
        if (updateMutate.isSuccess) {
            closeModal();
        }
    }, [updateMutate.isSuccess, closeModal]);

    // Fechar o modal após a exclusão ser bem-sucedida
    useEffect(() => {
        if (deleteSuccess) {
            closeModal();
        }
    }, [deleteSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <div className="modal-header">
                    <h3>Alterar item no cardápio</h3>
                    {/* Botão de fechar */}
                    <button className="close-button" onClick={closeModal}>Cancelar</button>
                </div>
                <form className="input-container" onSubmit={submit}>
                    <Input label="Title" value={title} updateValue={setTitle} />
                    <Input label="Price" value={price} updateValue={setPrice} />
                    <Input label="Image" value={image} updateValue={setImage} />
                    <div className="button-group">
                        <button 
                            className="btnDelete" 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        >
                            Deletar
                        </button>
                        <button type="submit" className="btn-secondary">Alterar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
