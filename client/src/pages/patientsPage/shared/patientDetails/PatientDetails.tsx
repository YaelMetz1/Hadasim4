import React, { useEffect, useState } from "react";
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog, Typography, TextField,} from "@mui/material";
import * as vaccinationRequests from "../../../../api/VaccinationRequests";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import Vaccination from "../../../../types/Vaccination";

export default function patientDetails(props: any) {
  
  const [open, setOpen] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [addVaccin, setAddVaccin] = useState(false);
 

  const columns: GridColDef[] = [
  { field: "vaccinationDate", headerName: "Vaccination Date", width: 170 },
  { field: "vaccinationProducer", headerName: "Vaccination Producer", width: 100 },
  ];

  const fetchData = async () => {
    const data = await vaccinationRequests.getVaccinationsOfPatient(+(props.patient.patientId));
    setRows(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleAddClick=()=>{
    setAddVaccin(true);
  }
  const handleAddSubmit= async (event: React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const vaccination: Vaccination | undefined = await vaccinationRequests.addVaccination({
        patientId: +(props.patient.patientId as string),
        vaccinationDate: (formData.get("vaccinationDate")  as unknown) as Date,
        vaccinationProducer: formData.get("vaccinationProducer") as string,
      });
      setAddVaccin(false);
      fetchData();

  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
       >
        <DialogTitle>Patient`s COVID Details</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Name: {props.patient.firstName} {props.patient.lastName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Vaccinations:
        </Typography>
        <DataGrid
        sx={{ '--DataGrid-overlayHeight': '300px' }}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.vaccinationId}
      />
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        Add Vaccination
      </Button>

      {(addVaccin)? 
        <form onSubmit={handleAddSubmit}>
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
      </form>: null}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
