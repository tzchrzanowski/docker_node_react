import React, { useState, useEffect} from 'react';
import { fetchStarships } from '../services/starshipsApi';
import { CircularProgress, Typography, List, ListItem, ListItemText,  } from '@mui/material';

function Starships() {
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const load = async() => {
            try {
                const data = await fetchStarships();
                setStarships(data);
            } catch (error) {
                console.error("Failed to fetch /starships: ", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <>
            <Typography variant="h4" gutterBottom>Starships</Typography>
            <List>
                {starships.map((s)=> {
                    return(
                        <ListItem key={s.id} disablepadding>
                            <ListItemText primary={s.name} secondary={`${s.manufacturer} ${s.starship_class}`} />
                        </ListItem>                
                    )
                })}
            </List>
        </>
    )
}

export default Starships;