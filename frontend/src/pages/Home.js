import { useEffect, useState } from 'react';

//components

import WorkoutCard from '../components/WorkoutCard'

const Home = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json();

            if
                (response.ok) {
                setWorkouts(json);

            }
        }
        fetchWorkouts();
    }, [])
    return (
        
        <div>
            <div className="container">
            <div className="row"> 

                    {workouts && workouts.map((workout) => (

                        <WorkoutCard key={workout._id} workout={workout} />
                    ))}
                </div>

            </div>
        </div>
    )
};

export default Home;