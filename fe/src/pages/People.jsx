import React, { useState, useEffect} from 'react';
import { fetchPeople } from '../services/peopleApi';
import { CircularProgress, Typography, List, ListItem, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function People() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (item) => {
        setSelected(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelected(null); 
    };

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
                            <ListItemButton onClick={()=> handleOpen(p)}
>
                                <ListItemText primary={p.name} secondary={`${p.gender} ${p.hair_color}`} />
                            </ListItemButton>
                        </ListItem>                
                    )
                })}
            </List>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{selected?.name}</DialogTitle>
                <DialogContent dividers>
                    <Typography>Height: {selected?.height}</Typography>
                    <Typography>Mass: {selected?.mass}</Typography>
                    <Typography>Hair color: {selected?.hair_color}</Typography>
                    <Typography>Skin color: {selected?.skin_color}</Typography>
                    <Typography>Eye color: {selected?.blue}</Typography>
                    <Typography>Birth year: {selected?.birth_year}</Typography>
                    <Typography>Gender: {selected?.gender}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default People;