import React, { useState } from "react";
import { DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Dialog, } from "@mui/material";
import * as patientRequests from "../../../../api/PatientRequests";
import Patient from "../../../../types/Patient";

export default function AddPatient(props: any) {
  
  const [open, setOpen] = useState(true);
  const [idError, setIdError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [mobilePhoneError, setMobilePhoneError] = useState('');

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const ValidationCheck = (value: string, length: number, field: string) => {
    if (isNaN(Number(value))) {
      switch (field) {
        case ("id"): setIdError("Id must includes numbers only"); break;
        case ("phoneNumber"): setPhoneError("phone must includes numbers only"); break;
        case ("mobilePhoneNumber"): setMobilePhoneError("mobile phone must includes numbers only"); break;
      }
      return false;
    }
    else if (value.length != length) {
      switch (field) {
        case ("id"): setIdError(`Id must have ${length} numbers`); break;
        case ("phoneNumber"): setPhoneError(`phone must have ${length} numbers`); break;
        case ("mobilePhoneNumber"): setMobilePhoneError(`mobile phone must have ${length} numbers`); break;
      }
      return false;
    }
    switch (field) {
      case ("id"): setIdError(""); break;
      case ("phoneNumber"): setPhoneError(""); break;
      case ("mobilePhoneNumber"): setMobilePhoneError(""); break;
    }
    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (ValidationCheck(formData.get("id") as string, 9, "id") &&
      ValidationCheck(formData.get("phoneNumber") as string, 7, "phoneNumber") &&
      ValidationCheck(formData.get("mobilePhoneNumber") as string, 10, "mobilePhoneNumber")) {
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
        picture: formData.get("picture") as string,
      });
      handleClose();
    }
  }


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit
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
            error={!!idError}
            autoFocus
            required
            margin="dense"
            id="id"
            name="id"
            label="id"
            fullWidth
            variant="standard"
            helperText={idError}
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
            error={!!phoneError}
            autoFocus
            required
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="phone"
            fullWidth
            variant="standard"
            helperText={phoneError}
          />
          <TextField
            error={!!mobilePhoneError}
            autoFocus
            required
            margin="dense"
            id="mobilePhoneNumber"
            name="mobilePhoneNumber"
            label="cell-phone"
            fullWidth
            variant="standard"
            helperText={mobilePhoneError}
          />
          <TextField
            autoFocus
            margin="dense"
            id="picture"
            name="picture"
            label="picture URL"
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
