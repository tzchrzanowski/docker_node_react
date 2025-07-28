import React, { useState, useEffect} from 'react';
import { fetchPlanets, createPlanet, deletePlanet, updatePlanet } from '../services/planetsApi';
import { CircularProgress, Typography, List, ListItem, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function Planets() {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        rotation_period: '',
        orbital_period: '',
        diameter: '',
        climate: '',
        gravity: '',
        terrain: '',
        surface_water: '',
        population: '',
        url: ''
    });
    const [reloadFlag, setReloadFlag] = useState(false);

    const formFields = [
        {name: "name", type: "text"},
        {name: "rotation_period", type: "number"}, 
        {name: "orbital_period", type: "number"}, 
        {name: "diameter", type: "number"}, 
        {name: "climate", type: "text"}, 
        {name: "gravity", type: "text"}, 
        {name: "terrain", type: "text"}, 
        {name: "surface_water", type: "number"},
        {name: "population", type: "number"},
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
            rotation_period: 0,
            orbital_period: 0,
            diameter: 0,
            climate: '',
            gravity: '',
            terrain: '',
            surface_water: 0,
            population: 0,
            url: ''
        });
    };

    const handleOpenCreatePlanetModal = (item) => {
        if (item) {
            handleClose();
            setTimeout(()=>{
                setSelected(item);
                setFormData({
                    name: item.name || '',
                    rotation_period: item.rotation_period || 0,
                    orbital_period: item.orbital_period || 0,
                    diameter: item.diameter || 0,
                    climate: item.climate || '',
                    gravity: item.gravity || '',
                    terrain: item.terrain || '',
                    surface_water: item.surface_water || 0,
                    population: item.population || 0,
                    url: item.url || ''
                });
                setOpenCreateModal(true)
            }, 0);
        } else {
            resetFormData();
            setOpenCreateModal(true)
        }
    }

    const handleCloseCreatePlanetodal = () => {
        resetFormData();
        setSelected(null);
        setOpenCreateModal(false);
    }

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
    }, [reloadFlag]);

    const triggerRefetch = () => setReloadFlag(prev => !prev);

    const handleFormChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async ()=> {
        try {
            if(selected) {
                await updatePlanet(selected.id, formData);
            } else {
                await createPlanet(formData);
            }

            triggerRefetch();
            setOpenCreateModal(false);
        } catch (error) {
            console.log("Failed to create person: ", error);
        }
    };

    const handleDeletePlanet = async (id) => {
        await deletePlanet(id);
        triggerRefetch();
        handleClose();
    };

    if (loading) return <CircularProgress />;

    return (
        <>
            <Typography variant="h4" gutterBottom>Planets</Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2}}
                onClick={()=> handleOpenCreatePlanetModal(null)}
            >
                Add new Planet
            </Button>
            <List>
                {planets.map((p)=> {
                    return(
                        <ListItem key={p.id} disablepadding>
                            <ListItemButton onClick={()=> handleOpen(p)}>
                                <ListItemText primary={p.name} secondary={`${p.climate} ${p.terrain}`} />
                            </ListItemButton>
                        </ListItem>                
                    )
                })}
            </List>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{selected?.name}</DialogTitle>
                <DialogContent dividers>
                    <Typography>Rotation period: {selected?.rotation_period}</Typography>
                    <Typography>Orbital period: {selected?.orbital_period}</Typography>
                    <Typography>Climate: {selected?.climate}</Typography>
                    <Typography>Gravity: {selected?.gravity}</Typography>
                    <Typography>Terrain: {selected?.terrain}</Typography>
                    <Typography>Surface Water: {selected?.surface_water}</Typography>
                    <Typography>Population: {selected?.population}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> handleDeletePlanet(selected?.id)}>Delete Planet</Button>
                    <Button onClick={()=> handleOpenCreatePlanetModal(selected)}>Edit Planet</Button>
                    <Button onClick={handleClose} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openCreateModal} onClose={()=> handleCloseCreatePlanetodal()}>
                <DialogTitle>
                    {selected ? 'Edit Planet' : 'Add new Planet'}
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
                    <Button onClick={()=> handleCloseCreatePlanetodal()}>Cancel</Button>
                    <Button onClick={()=> handleSubmit()}>
                        {selected ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Planets;