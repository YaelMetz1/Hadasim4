import React from "react";
import { DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Dialog,} from "@mui/material";
import * as patientRequests from "../../../../api/PatientRequests";
import Patient from "../../../../types/Patient";

export default function AddPatient(props: any) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

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
            const patient: Patient | undefined = await patientRequests.addPatient({
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
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            name="firstName"
            label="first name"
            type="name"
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
            type="date"
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
