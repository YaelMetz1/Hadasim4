import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardActionArea, CardContent, Grid, Stack, Tooltip, Typography } from '@mui/material';
import * as vaccinationRequests from "../../api/VaccinationRequests";
import * as patientRequests from "../../api/PatientRequests";
import * as illnessRequests from "../../api/IllnessRequests";


export default function SummaryPage() {

  const [vaccinData, setVaccinData] = useState<any[]>([]);
  const [illnessData, setIllnessData] = useState<any>();


  const fetchVaccin = async () => {
    const vaccinatedPateients = await vaccinationRequests.getAllVaccinatedPatients();
    const patients = await patientRequests.getAllPatients();
    if (vaccinatedPateients && patients) {
      const numOfVaccinatedPatients = vaccinatedPateients.length;
      const numOfPatients = patients.length
      setVaccinData([
        { id: 0, value: numOfPatients - numOfVaccinatedPatients, color: 'blue', label: 'unvaccinated patients' },
        { id: 1, value: numOfVaccinatedPatients, color: 'red', label: 'vaccinated patients' },
      ])
    }
  }

  const fetchIllness = async () => {
    const illnessPatients = await illnessRequests.getAllIlnessesLastMonth();
    if(illnessPatients){
      setIllnessData(illnessPatients.length);
    }
  }

  useEffect(() => {
    fetchVaccin();
    fetchIllness();
  }, []);


  return (
    <Stack spacing={2} sx={{ width: { xs: '100%', sm: '100%' }, display: 'flex'}}>
      <Typography
        variant="h1"
        sx={{
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 'clamp(3.5rem, 10vw, 4rem)',
          pt: { xs: 7, sm: 6 },
          pb: { xs: 6, sm: 10 },
        }}
      >
        COVID Summary Page
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid container item xs={10} md={5}>
        <CardActionArea component="a" href="#">
          <Card >
            <CardContent >
              <Typography component="h2" variant="h5">
                Vaccinated Patients:
              </Typography>
              <PieChart
                series={[
                  {
                    data: vaccinData,
                  },
                ]}
                width={600}
                height={200}
              />
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <Grid container item xs={10} md={5}>
        <CardActionArea component="a" href="#">
          <Card >
            <CardContent>
              <Typography component="h2" variant="h5">
                Illness patients last month: {illnessData}
              </Typography>

              <BarChart
                width={600}
                height={200}
                series={[{ data: [4, 3, 5] }]}
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                
              </BarChart>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      </Grid>
    </Stack>);
}