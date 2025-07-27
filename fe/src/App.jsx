import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Stack } from '@mui/material';
import People from './pages/People';
import Planets from './pages/Planets';
import Starships from './pages/Starships';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Router>
        <AppBar position='static' sx={{width: '100%'}}>
          <Toolbar sx={{ justifyContent: 'center'}}>
            <Stack direction="row" spacin={2}>
              <Button color="inherit" component={Link} to="/people">People</Button>
              <Button color="inherit" component={Link} to="/planets">Planets</Button>
              <Button color="inherit" component={Link} to="/starships">Starships</Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Container sx={{mt: 4}}>
          <Routes>
            <Route path="/people" element={<People />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/starships" element={<Starships />} />
          </Routes>
        </Container>
      </Router>
    </Layout>
  )
}

export default App
