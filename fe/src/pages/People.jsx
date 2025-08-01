import React, { useState, useEffect} from 'react';
import { fetchPeople, createPerson, deletePerson, updatePerson } from '../services/peopleApi';
import { CircularProgress, Typography, List, ListItem, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function People() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        url: ''
    });
    const [reloadFlag, setReloadFlag] = useState(false);

    const formFields = [
        {name: "name", type: "text"},
        {name: "height", type: "number"}, 
        {name: "mass", type: "number"}, 
        {name: "hair_color", type: "text"}, 
        {name: "skin_color", type: "text"}, 
        {name: "eye_color", type: "text"}, 
        {name: "birth_year", type: "text"}, 
        {name: "gender", type: "text"},
        {name: "homeworld", type: "text"}, 
        {name: "url", type: "text"}
    ];

    const handleOpen = (item) => {
        setSelected(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelected(null); 
    };

    const resetFormData = () => {
        setFormData({
            name: '',
            height: '',
            mass: '',
            hair_color: '',
            skin_color: '',
            eye_color: '',
            birth_year: '',
            gender: '',
            homeworld: '',
            url: ''
        });
    };

    const handleOpenCreatePersonModal = (item) => {
        if (item) {
            handleClose();
            setTimeout(()=>{
                setSelected(item);
                setFormData({
                    name: item.name || '',
                    height: item.height || 0,
                    mass: item.mass || 0,
                    hair_color: item.hair_color || '',
                    skin_color: item.skin_color || '',
                    eye_color: item.eye_color || '',
                    birth_year: item.birth_year || '',
                    gender: item.gender || '',
                    homeworld: item.homeworld || '',
                    url: item.url || ''
                });
                setOpenCreateModal(true)
            }, 0);
        } else {
            resetFormData();
            setOpenCreateModal(true)
        }
    }

    const handleCloseCreatePersonModal = () => {
        resetFormData();
        setSelected(null);
        setOpenCreateModal(false);
    }


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
    }, [reloadFlag]);

    const triggerRefetch = () => setReloadFlag(prev => !prev);

    const handleFormChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async ()=> {
        try {
            if(selected) {
                await updatePerson(selected.id, formData);
            } else {
                await createPerson(formData);
            }

            triggerRefetch();
            setOpenCreateModal(false);
        } catch (error) {
            console.log("Failed to create person: ", error);
        }
    };

    const handlDdeletePerson = async (id) => {
        await deletePerson(id);
        triggerRefetch();
        handleClose();
    };

    if (loading) return <CircularProgress />;

    return (
        <>
            <Typography variant="h4" gutterBottom>People</Typography>
            
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2}}
                onClick={()=> handleOpenCreatePersonModal(null)}
            >
                Add new Person
            </Button>
            <List>
                {people.map((p)=> {
                    return(
                        <ListItem key={p.id} disablepadding>
                            <ListItemButton onClick={()=> handleOpen(p)}>
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
                    <Typography>Eye color: {selected?.eye_color}</Typography>
                    <Typography>Birth year: {selected?.birth_year}</Typography>
                    <Typography>Gender: {selected?.gender}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> handlDdeletePerson(selected?.id)}>Delete Person</Button>
                    <Button onClick={()=> handleOpenCreatePersonModal(selected)}>Edit Person</Button>
                    <Button onClick={handleClose} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreateModal} onClose={()=> handleCloseCreatePersonModal()}>
                <DialogTitle>
                    {selected ? 'Edit Person' : 'Add new Person'}
                </DialogTitle>
                <DialogContent>
                    {formFields.map((field)=> {
                        return (
                            <TextField 
                                autoFocus
                                margin="dense"
                                name={field.name}
                                label={field.name}
                                fullWidth
                                variant="standard"
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleFormChange}
                            />
                        )
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> handleCloseCreatePersonModal()}>Cancel</Button>
                    <Button onClick={()=> handleSubmit()}>
                        {selected ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default People;