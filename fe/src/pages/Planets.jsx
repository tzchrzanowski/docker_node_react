import React, { useState, useEffect} from 'react';
import { fetchPlanets } from '../services/planetsApi';
import { CircularProgress, Typography, List, ListItem, ListItemText,  } from '@mui/material';

function Planets() {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const load = async() => {
            try {
                const data = await fetchPlanets();
                setPlanets(data);
            } catch (error) {
                console.error("Failed to fetch /planets: ", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <>
            <Typography variant="h4" gutterBottom>Planets</Typography>
            <List>
                {planets.map((p)=> {
                    return(
                        <ListItem key={p.id} disablepadding>
                            <ListItemText primary={p.name} secondary={`${p.climate} ${p.terrain}`} />
                        </ListItem>                
                    )
                })}
            </List>
        </>
    )
}

export default Planets;