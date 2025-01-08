import { useState } from 'react'; 
import './App.css';
import { Card } from './components/card/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';
import { useFoodDataAlter } from './hooks/useFoodDataAlter';
import { CreatModal } from './components/creat-modal/create-modal';
import { CreatModalAlter } from './components/creat-modal/CreatModalAlter'; 

function App() {
  
  const { mutate } = useFoodDataAlter();
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null); // Estado para o alimento selecionado
  
  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
    setSelectedFood(null); // Reseta o alimento selecionado ao abrir o modal
  };

  const handleEditFood = (food: FoodData) => {
    setSelectedFood(food); // Define o alimento selecionado
    setIsModalOpen(true); // Abre o modal de alteração
  };

  return (
    <>
      <div className='container'>
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data?.map(foodData => (
            <Card 
              key={foodData.id} // Adicione uma chave única
              price={foodData.price} 
              title={foodData.title}
              image={foodData.image}
              onClick={() => handleEditFood(foodData)} // Chame a função de edição ao clicar
            />
          ))}
        </div>
        
        {isModalOpen && selectedFood ? (
          <CreatModalAlter 
            closeModal={handleOpenModal} 
            foodData={selectedFood} // Passa o alimento selecionado para o modal de alteração
          />
        ) : (
          isModalOpen && <CreatModal closeModal={handleOpenModal} /> // Modal de criação
        )}

        <button onClick={handleOpenModal}>Cadastrar</button>
      </div>
    </>
  );
}

export default App;