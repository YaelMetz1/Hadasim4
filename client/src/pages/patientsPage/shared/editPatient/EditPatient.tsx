import React, { useEffect } from "react";
import { DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Dialog,} from "@mui/material";
import * as patientRequests from "../../../../api/PatientRequests";
import Patient from "../../../../types/Patient";

export default function EditPatient(props: any) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  useEffect(() => {
console.log(props.patient);
console.log(typeof(props.patient.birthDate));
  }, []);
  
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const patient: Patient | undefined = await patientRequests.updatePatient({
              patientId: +(formData.get("patientId") as string),
              firstName: formData.get("firstName") as string,
              lastName: formData.get("lastName") as string,
              id: formData.get("id") as string,
              city: formData.get("city") as string,
              street: formData.get("street") as string,
              streetNumber: +(formData.get("streetNumber") as string),
              birthDate: (formData.get("birthDate") as unknown) as Date,
              phoneNumber: formData.get("phoneNumber") as string,
              mobilePhoneNumber: formData.get("mobilePhoneNumber") as string,
            });
            handleClose();
          },
        }}
       >
        <DialogTitle>Edit Patient</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="patientId"
            name="patientId"
            label="patientId"
            defaultValue={props.patient.patientId}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            name="firstName"
            label="first name"
            type="name"
            defaultValue={props.patient.firstName}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastName"
            name="lastName"
            label="last name"
            type="name"
            defaultValue={props.patient.lastName}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="id"
            name="id"
            label="id"
            defaultValue={props.patient.id}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="city"
            name="city"
            label="city"
            defaultValue={props.patient.city}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="street"
            name="street"
            label="street"
            defaultValue={props.patient.street}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="streetNumber"
            name="streetNumber"
            label="street number"
            defaultValue={props.patient.streetNumber}
            fullWidth
            variant="standard"
          />
        <TextField
            autoFocus
            required
            margin="dense"
            id="birthDate"
            name="birthDate"
            label="birth date"
            type="Date"
            defaultValue={props.patient.birthDate}
            fullWidth
            variant="standard"
          />
        <TextField
            autoFocus
            required
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="phoneNumber"
            defaultValue={props.patient.phoneNumber}
            fullWidth
            variant="standard"
          />
        <TextField
            autoFocus
            required
            margin="dense"
            id="mobilePhoneNumber"
            name="mobilePhoneNumber"
            label="mobilePhoneNumber"
            defaultValue={props.patient.mobilePhoneNumber}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Finish</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

