import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';

type Params = { id: string };

interface Workout {
  _id: string; // Utiliser _id plutôt que id, comme défini dans le modèle
  name: string;
  hp: number;
  cp: number;
  picture: string;
  types: string[];
}

const PokemonsDetail: FunctionComponent = () => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const { id } = useParams<Params>();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`/api/workouts/${id}`);
        setWorkout(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du Pokémon :', error);
      }
    };

    fetchWorkout();
  }, [id]);
  
  return (
    <div>
      {workout ? (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <h2 className="header center">{workout.name}</h2>
            <div className="card hoverable">
              <div className="card-image">
                <img src={workout.picture} alt={workout.name} style={{ width: '250px', margin: '0 auto' }} />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr>
                        <td>Nom</td>
                        <td><strong>{workout.name}</strong></td>
                      </tr>
                      <tr>
                        <td>Points de vie</td>
                        <td><strong>{workout.hp}</strong></td>
                      </tr>
                      <tr>
                        <td>Dégâts</td>
                        <td><strong>{workout.cp}</strong></td>
                      </tr>
                      <tr>
                        <td>Types</td>
                        <td>
                          {workout.types.map(type => (
                            <span key={type} className={formatType(type)}>{type}</span>
                          ))}
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center">Aucun workout à afficher !</h4>
      )}
    </div>
  );
}

export default PokemonsDetail;
