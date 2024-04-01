import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as patientRequests from "../../api/PatientRequests";
import { Button } from "@mui/material";
import AddAndEditPatient from "./shared/addAndEditPatient/AddAndEditPatient";
import PatientDetails from "./shared/patientDetails/PatientDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";

export default function PatientsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [addAndEditDialog, setAddAndEditDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [requestAction, setRequestAction] = useState("");
  const [patientDetails, setPatientDetails] = useState<any>(null);

  const columns: GridColDef[] = [
    { field: "patientId", headerName: "Patient-Id", width: 100 },
    { field: "firstName", headerName: "First-name", width: 100 },
    { field: "lastName", headerName: "Last-name", width: 130 },
    { field: "id", headerName: "Id", width: 130 },
    { field: "city", headerName: "City", width: 130 },
    { field: "street", headerName: "Street", width: 100 },
    { field: "streetNumber", headerName: "Street-number", width: 130 },
    { field: "birthDate", headerName: "Birth-date", type: "Date", width: 130 },
    { field: "phoneNumber", headerName: "Phone", width: 100 },
    { field: "mobilePhoneNumber", headerName: "Cell-phone", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      type: "actions",
      cellClassName: "actions",
      renderCell: (params) => (
        <div>
          <Button startIcon={<EditIcon />} onClick={() => handleUpdate(params.row)} ></Button>
          <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(params.row)} ></Button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    const data = await patientRequests.getAllPatients();
    setRows(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleDialog = () => {
    if (requestAction != "") {
      setAddAndEditDialog(!addAndEditDialog);
      setRequestAction("");
    } else {
      setDetailsDialog(!detailsDialog);
      setPatientDetails(null);
    }
    fetchData();
  };

  const handleUpdate = (row: any) => {
    setPatientDetails(row);
    setRequestAction("edit");
    setAddAndEditDialog(true);
  };

  const handleAdd = () => {
    setRequestAction("add");
    setAddAndEditDialog(true);
  };

  const handleDelete = async (row: any) => {
    if (window.confirm(`Are you sure you want to delete ${row.firstName} ${row.lastName}?`)) {
      await patientRequests.deletePatient(+(row.patientId));
      fetchData();
    }
  };

  const showPatientDetails = (row: any) => {
    setPatientDetails(row);
    setDetailsDialog(!detailsDialog);
  };

  return (
    <div>
      <DataGrid
        sx={{ "--DataGrid-overlayHeight": "300px" }}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.patientId}
        onRowClick={(event) => showPatientDetails(event.row)}
      />
      <Button startIcon={<AddIcon />} onClick={handleAdd}>
        Add Patient
      </Button>
      {addAndEditDialog &&
       (<AddAndEditPatient patient={patientDetails} request={requestAction} onClose={handleToggleDialog}/>)}
      {detailsDialog && (<PatientDetails patient={patientDetails} onClose={handleToggleDialog} />)}
    </div>
  );
}
