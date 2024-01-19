import formatType from '../helpers/format-type';
import './pokemon-card.css';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  workout: {
    _id: string;
    name: string;
    hp: number;
    cp: number;
    picture: string;
    types: string[]; // Utiliser un tableau de chaînes pour les types
  };
  borderColor?: string;
}

const WorkoutCard: FunctionComponent<Props> = ({ workout, borderColor = '#009688' }) => {
  const [color, setColor] = useState<string | undefined>();
  const history = useNavigate();

  const showBorder = () => {
    setColor(borderColor);
  };

  const hideBorder = () => {
    setColor('#f5f5f5'); // On remet la bordure en gris
  };
  const goToPokemon = (_id: string) => {
    history(`/${_id}`);
  };
  if (!workout) {
    // Afficher un message ou un composant d'erreur si workout est null ou undefined
    return <p>Aucun détail d'entraînement à afficher.</p>;
  }

  return (
    <div
      className="col s6 m4"
      onClick={() => goToPokemon(workout._id)}
      onMouseEnter={showBorder}
      onMouseLeave={hideBorder}>
      <div className="card horizontal">
        <div className="card-image">
          <img src={workout.picture} alt={workout.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{workout.name}</p>
            
            {workout.types.map(type => (
            <span key={type} className={formatType(type)}>{type}</span>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;