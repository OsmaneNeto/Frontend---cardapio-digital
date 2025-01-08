import "./card.css"

interface CardProps {
    price: number;
    title: string;
    image: string;
    onClick: () => void; 
    
  }

  export function Card({ price, title, image ,onClick }: CardProps) {
    return (
        <>
          <div className="card" onClick={onClick}>
            
            <img src={image} />
            <h2>{title}</h2>
            <p><b>Valor:</b> R$ {price.toFixed(2)}</p>
          </div>
        </>
      );
    }