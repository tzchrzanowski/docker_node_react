import React, { useState, useEffect} from 'react';
import { fetchStarships, createStarship, deleteStarship, updateStarship } from '../services/starshipsApi';
import { CircularProgress, Typography, List, ListItem, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function Starships() {
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        model: '',
        manufacturer: '',
        cost_in_credits: 0,
        length: 0,
        max_atmosphering_speed: '',
        crew: '',
        passengers: '',
        cargo_capacity: 0,
        consumables: '',
        hyperdrive_rating: 0,
        MGLT: '',
        starship_class: '',
        url: ''
    });
    const [reloadFlag, setReloadFlag] = useState(false);

    const formFields = [
        {name: "name", type: "text"},
        {name: "model", type: "text"}, 
        {name: "manufacturer", type: "text"}, 
        {name: "cost_in_credits", type: "number"}, 
        {name: "length", type: "number"}, 
        {name: "max_atmosphering_speed", type: "text"}, 
        {name: "crew", type: "text"}, 
        {name: "passengers", type: "text"},
        {name: "cargo_capacity", type: "number"}, 
        {name: "consumables", type: "text"}, 
        {name: "hyperdrive_rating", type: "number"}, 
        {name: "MGLT", type: "text"}, 
        {name: "starship_class", type: "text"}, 
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
            model: '',
            manufacturer: '',
            cost_in_credits: 0,
            length: 0,
            max_atmosphering_speed: '',
            crew: '',
            passengers: '',
            cargo_capacity: 0,
            consumables: '',
            hyperdrive_rating: 0,
            MGLT: '',
            starship_class: '',
            url: ''
        });
    };

    const handleOpenCreateStarshipModal = (item) => {
        if (item) {
            handleClose();
            setTimeout(()=>{
                setSelected(item);
                setFormData({
                    name: item.name || '',
                    model: item.model || '',
                    manufacturer: item.manufacturer || '',
                    cost_in_credits: item.cost_in_credits || 0,
                    length: item.length || 0,
                    max_atmosphering_speed: item.max_atmosphering_speed || '',
                    crew: item.crew || '',
                    passengers: item.passengers || '',
                    cargo_capacity: item.cargo_capacity || 0,
                    consumables: item.consumables || '',
                    hyperdrive_rating: item.hyperdrive_rating || 0,
                    MGLT: item.MGLT || '',
                    starship_class: item.starship_class || '',
                    url: item.url || ''
                });
                setOpenCreateModal(true)
            }, 0);
        } else {
            resetFormData();
            setOpenCreateModal(true)
        }
    }

    const handleCloseCreateStarshipModal = () => {
        resetFormData();
        setSelected(null);
        setOpenCreateModal(false);
    }

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
    }, [reloadFlag]);

    const triggerRefetch = () => setReloadFlag(prev => !prev);

    const handleFormChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async ()=> {
        try {
            if(selected) {
                await updateStarship(selected.id, formData);
            } else {
                await createStarship(formData);
            }

            triggerRefetch();
            setOpenCreateModal(false);
        } catch (error) {
            console.log("Failed to create starship: ", error);
        }
    };

    const handleDeleteStarship = async (id) => {
        await deleteStarship(id);
        triggerRefetch();
        handleClose();
    };

    if (loading) return <CircularProgress />;

    return (
        <>
            <Typography variant="h4" gutterBottom>Starships</Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2}}
                onClick={()=> handleOpenCreateStarshipModal(null)}
            >
                Add new Starship
            </Button>

            <List>
                {starships.map((s)=> {
                    return(
                        <ListItem key={s.id} disablepadding>
                            <ListItemButton onClick={()=> handleOpen(s)}>
                                <ListItemText primary={s.name} secondary={`${s.manufacturer} ${s.starship_class}`} />
                            </ListItemButton>
                        </ListItem>                
                    )
                })}
            </List>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{selected?.name}</DialogTitle>
                <DialogContent dividers>
                    <Typography>Height: {selected?.height}</Typography>
                    <Typography>Model: {selected?.model}</Typography>
                    <Typography>Manufacturer: {selected?.manufacturer}</Typography>
                    <Typography>cost_in_credits: {selected?.cost_in_credits}</Typography>
                    <Typography>length: {selected?.length}</Typography>
                    <Typography>max_atmosphering_speed: {selected?.max_atmosphering_speed}</Typography>
                    <Typography>crew: {selected?.crew}</Typography>
                    <Typography>passengers: {selected?.passengers}</Typography>
                    <Typography>cargo_capacity: {selected?.cargo_capacity}</Typography>
                    <Typography>consumables: {selected?.consumables}</Typography>
                    <Typography>hyperdrive_rating: {selected?.hyperdrive_rating}</Typography>
                    <Typography>MGLT: {selected?.MGLT}</Typography>
                    <Typography>starship_class: {selected?.starship_class}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> handleDeleteStarship(selected?.id)}>Delete Starship</Button>
                    <Button onClick={()=> handleOpenCreateStarshipModal(selected)}>Edit Starship</Button>
                    <Button onClick={handleClose} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>     


            <Dialog open={openCreateModal} onClose={()=> handleCloseCreateStarshipModal()}>
                <DialogTitle>
                    {selected ? 'Edit Starship' : 'Add new Starship'}
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
                    <Button onClick={()=> handleCloseCreateStarshipModal()}>Cancel</Button>
                    <Button onClick={()=> handleSubmit()}>
                        {selected ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Starships;