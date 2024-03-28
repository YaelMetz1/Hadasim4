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
} from "@mui/material";
import * as vaccinationRequests from "../../../../api/VaccinationRequests";
import * as illnessRequests from "../../../../api/IllnessRequests";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Vaccination from "../../../../types/Vaccination";
import Illness from "../../../../types/Illness";

export default function patientDetails(props: any) {

  const [open, setOpen] = useState(true);
  const [vaccinationsRows, setVaccinationsRows] = useState<any[]>([]);
  const [illness, setIllness] = useState<any>();

  const [hasVaccin, setHasVaccin] = useState(false);
  const [hadIllness, setHadIllness] = useState(false);

  const [addVaccin, setAddVaccin] = useState(false);
  const [addIllness, setAddIllness] = useState(false);

  const [dateError, setDateError] = useState("");

  const columns: GridColDef[] = [
    { field: "vaccinationDate", headerName: "Vaccination Date", width: 170 },
    {
      field: "vaccinationProducer",
      headerName: "Vaccination Producer",
      width: 170,
    },
  ];

  const fetchVaccinations = async () => {
    const data = await vaccinationRequests.getVaccinationsOfPatient(
      +props.patient.patientId
    );
    await setVaccinationsRows(data || []);
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
    const vaccination: Vaccination | undefined =
      await vaccinationRequests.addVaccination({
        patientId: +(props.patient.patientId as string),
        vaccinationDate: formData.get("vaccinationDate") as unknown as Date,
        vaccinationProducer: formData.get("vaccinationProducer") as string,
      });
    setAddVaccin(false);
    fetchVaccinations();
  };

  const handleAddIllnessSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if((formData.get("recoveryDate") as unknown as Date)<(formData.get("ilnessDate") as unknown as Date)){
      setDateError(`recovery date can't be before illness date`);
    }else{
    const illness: Illness | undefined = await illnessRequests.addIllness({
      patientId: +(props.patient.patientId as string),
      illnessDate: formData.get("ilnessDate") as unknown as Date,
      recoveryDate: formData.get("recoveryDate") as unknown as Date,
    });
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Name: {props.patient.firstName} {props.patient.lastName}
          </Typography>
          <Grid item xs={2} container textAlign="right">
            <Avatar
              sx={{ m: 1, width: 56, height: 56 }}
              alt={props.patient.firstName}
              src="/broken-image.jpg"
            ></Avatar>
          </Grid>
          {hasVaccin ? (
            <div>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Vaccinations:
              </Typography>
              <DataGrid
                rows={vaccinationsRows}
                columns={columns}
                getRowId={(row) => row.vaccinationId}
              />
            </div>
          ) : (
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {props.patient.firstName} doesn`t have vaccinations
            </Typography>
          )}
          {(vaccinationsRows.length!=4)?<Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddVaccinClick}
          >
            Add Vaccination
          </Button>: null}

          {addVaccin ? (
            <form onSubmit={handleAddVaccinSubmit}>
              <TextField
                autoFocus
                required
                variant="outlined"
                id="vaccinationDate"
                name="vaccinationDate"
                label="Vaccination Date"
                type="date"
                margin="dense"
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
          
          {hadIllness ? (
            <div>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Illness:
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Illness Date: {illness.illnessDate} &nbsp;&nbsp;&nbsp; Recovery Date: {illness.recoveryDate}
              </Typography>
            </div>
          ) : <Button
          color="primary"
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
                autoFocus
                required
                variant="outlined"
                id="ilnessDate"
                name="ilnessDate"
                type="date"
                margin="dense"
              />
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Recovery Date:
              </Typography>
              <TextField
              error={!!dateError}
                autoFocus
                required
                variant="outlined"
                id="recoveryDate"
                name="recoveryDate"
                type="date"
                margin="dense"
                helperText={dateError}
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
