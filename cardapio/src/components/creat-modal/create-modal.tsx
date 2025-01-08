import { useEffect, useState } from "react";
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
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

interface ModalProps {
    closeModal(): void;
}

export function CreatModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess } = useFoodDataMutate();

    const submit = (e: React.FormEvent) => {
        e.preventDefault(); // Previna o comportamento padrão do formulário
        const foodData: FoodData = {
            title,
            price,
            image
        };
        mutate(foodData);
    };

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container" onSubmit={submit}>
                    <Input label="Title" value={title} updateValue={setTitle} />
                    <Input label="Price" value={price} updateValue={setPrice} />
                    <Input label="Image" value={image} updateValue={setImage} />
                    <button type="submit" className="btn-secondary">Postar</button>
                </form>
            </div>
        </div>
    );
}