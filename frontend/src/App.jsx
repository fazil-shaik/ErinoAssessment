import  { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleContactAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" component="h1" gutterBottom align="center">
              Contact Management
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm onContactAdded={handleContactAdded} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ContactTable key={refreshKey} />
          </motion.div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;