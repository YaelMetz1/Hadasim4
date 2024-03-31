import React, { useEffect, useState } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
  Typography,
  TextField,
  Avatar,
  Grid,
  Container,
  Divider,
  Box,
} from "@mui/material";
import * as vaccinationRequests from "../../../../api/VaccinationRequests";
import * as illnessRequests from "../../../../api/IllnessRequests";
import AddIcon from "@mui/icons-material/Add";
import Vaccination from "../../../../types/Vaccination";
import Illness from "../../../../types/Illness";

export default function patientDetails(props: any) {

  const [open, setOpen] = useState(true);
  const [vaccinations, setVaccinations] = useState<any[]>([]);
  const [illness, setIllness] = useState<any>();

  const [hasVaccin, setHasVaccin] = useState(false);
  const [hadIllness, setHadIllness] = useState(false);

  const [addVaccin, setAddVaccin] = useState(false);
  const [addIllness, setAddIllness] = useState(false);

  const [recoveryDateError, setRecoveryDateError] = useState("");
  const [illnessDateError, setIllnessDateError] = useState("");
  const [vaccinationDateError, setVaccinationDateError] = useState("");


  const fetchVaccinations = async () => {
    const data = await vaccinationRequests.getVaccinationsOfPatient(
      +props.patient.patientId
    );
    await setVaccinations(data || []);
    if (data?.length != 0) {
      setHasVaccin(true);
    }
  };

  const fetchIllness = async () => {
    const data = await illnessRequests.getIllnessOfPatient(
      +props.patient.patientId
    );
    setIllness(data || null);
    if (data) {
      setHadIllness(true);
    }
  };

  useEffect(() => {
    fetchVaccinations();
    fetchIllness();
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleAddVaccinClick = () => {
    setAddVaccin(true);
  };

  const handleIllnessClick = () => {
    setAddIllness(true);
  };

  const handleAddVaccinSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const vaccinationDate=formData.get("vaccinationDate") as unknown as Date;
    if(vaccinationDate>new Date()){
      setVaccinationDateError(`Date cannot be future date`);
    } else{
    const vaccination: Vaccination | undefined =
      await vaccinationRequests.addVaccination({
        patientId: +(props.patient.patientId as string),
        vaccinationDate: vaccinationDate,
        vaccinationProducer: formData.get("vaccinationProducer") as string,
      });
    setVaccinationDateError("");
    setAddVaccin(false);
    fetchVaccinations();
    }
  };

  const handleAddIllnessSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const illnessDate=formData.get("ilnessDate") as unknown as Date;
    const recoveryDate=formData.get("recoveryDate") as unknown as Date;

    if(illnessDate>new Date()){
      setIllnessDateError(`Date cannot be future date`);
    } else if(recoveryDate>new Date()){
      setRecoveryDateError(`Date cannot be future date`);
    } else if ( recoveryDate < illnessDate ) {
      setRecoveryDateError(`recovery date can't be before illness date`);
    } else {
      const illness: Illness | undefined = await illnessRequests.addIllness({
        patientId: +(props.patient.patientId as string),
        illnessDate: illnessDate,
        recoveryDate: recoveryDate,
      });
      setIllnessDateError("");
      setRecoveryDateError("");
      setAddIllness(false);
      fetchIllness();
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Patient`s COVID Details</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Typography sx={{ fontSize: 14 }}>
            Name: {props.patient.firstName} {props.patient.lastName}
          </Typography>
          <Grid item xs={2} container textAlign="right">
            <Avatar
              sx={{ m: 1, width: 56, height: 56 }}
              alt={props.patient.firstName}
              src={props.patient.picture}
            ></Avatar>

          </Grid>
          {hasVaccin ? (
            <Box>
              <Typography sx={{ fontSize: 20 }} >
                Vaccinations:
              </Typography>
              <Container >
                {vaccinations.map((vaccin) => (
                  <Container key={vaccin.vaccinationId}>
                    <Typography sx={{ fontSize: 14 }} >
                      Date: {vaccin.vaccinationDate} &nbsp;&nbsp;&nbsp; Producer: {vaccin.vaccinationProducer}
                    </Typography>
                  </Container>

                ))}
              </Container>
            </Box>
          ) : (
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {props.patient.firstName} doesn`t have vaccinations
            </Typography>
          )}
          {(vaccinations.length != 4) ? <Button
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddVaccinClick}
          >
            Add Vaccination
          </Button> : null}

          {addVaccin ? (
            <form onSubmit={handleAddVaccinSubmit}>
              <TextField
                error={!!vaccinationDateError}
                autoFocus
                required
                variant="outlined"
                id="vaccinationDate"
                name="vaccinationDate"
                label="Vaccination Date"
                type="date"
                margin="dense"
                helperText={vaccinationDateError}
              />
              <TextField
                autoFocus
                required
                variant="outlined"
                id="vaccinationProducer"
                name="vaccinationProducer"
                label="Vaccination Producer"
                margin="dense"
              />
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </form>
          ) : null}
          <Divider variant="middle" />
          <br />
          {hadIllness ? (
            <Box>
              <Typography sx={{ fontSize: 20 }} >
                Illness:
              </Typography>
              <Typography sx={{ fontSize: 14 }} >
                Illness Date: {illness.illnessDate} &nbsp;&nbsp;&nbsp; Recovery Date: {illness.recoveryDate}
              </Typography>
            </Box>
          ) : <Button
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleIllnessClick}
          >
            Add Illness
          </Button>}
          {addIllness ? (
            <form onSubmit={handleAddIllnessSubmit}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Ilness Date:
              </Typography>
              <TextField
                error={!!illnessDateError}
                autoFocus
                required
                variant="outlined"
                id="ilnessDate"
                name="ilnessDate"
                type="date"
                margin="dense"
                helperText={illnessDateError}
              />
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Recovery Date:
              </Typography>
              <TextField
                error={!!recoveryDateError}
                autoFocus
                required
                variant="outlined"
                id="recoveryDate"
                name="recoveryDate"
                type="date"
                margin="dense"
                helperText={recoveryDateError}
              />
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </form>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
