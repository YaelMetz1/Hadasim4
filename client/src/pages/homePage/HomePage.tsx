import React from 'react';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function WelcomePage() {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Welacome to Our
          </Typography>
          <Typography
            component="span"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              color: 'primary.main',
            }}
          >
            Health Maintenance Organization
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '70%' } }}
          >
            Here you can see all the patients and there COVID details as well as
            Summary information about the COVID virus in our HMO
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button onClick={() => (navigate("/Patients"))} variant="contained" color="primary">
              All Patients
            </Button>
            <Button onClick={() => (navigate("/Summary"))} variant="contained" color="primary">
              COVID Summary
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
