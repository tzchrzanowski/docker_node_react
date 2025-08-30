import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Button, Container, Stack, IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material'

import People from './pages/People';
import Planets from './pages/Planets';
import Starships from './pages/Starships';
import Layout from './components/Layout';
import { getTheme } from './components/theme';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Router>
          <AppBar position='static' sx={{width: '100%'}}>
            <Toolbar sx={{ justifyContent: 'center'}}>
              <Stack direction="row" spacin={2}>
                <Button color="inherit" component={Link} to="/people">People</Button>
                <Button color="inherit" component={Link} to="/planets">Planets</Button>
                <Button color="inherit" component={Link} to="/starships">Starships</Button>
                <IconButton onClick={toggleTheme} color='inherit'>
                  {mode === 'light' ? <DarkMode /> : <LightMode />}
                </IconButton>
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
    </ThemeProvider>
  )
}

export default App
