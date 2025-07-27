import React, { useState, useEffect} from 'react';
import { fetchPeople } from '../services/peopleApi';
import { CircularProgress, Typography, List, ListItem, ListItemText,  } from '@mui/material';

function People() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const load = async() => {
            try {
                const data = await fetchPeople();
                setPeople(data);
            } catch (error) {
                console.error("Failed to fetch /people: ", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <>
            <Typography variant="h4" gutterBottom>People</Typography>
            <List>
                {people.map((p)=> {
                    return(
                        <ListItem key={p.id} disablepadding>
                            <ListItemText primary={p.name} secondary={`${p.gender} ${p.hair_color}`} />
                        </ListItem>                
                    )
                })}
            </List>
        </>
    )
}

export default People;