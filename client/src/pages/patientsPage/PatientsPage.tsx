import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowModes } from "@mui/x-data-grid";
import * as patientRequests from "../../api/PatientRequests";
import { Button } from "@mui/material";
import AddPatient from "./shared/addPatient/AddPatient";
import EditPatient from "./shared/editPatient/EditPatient";
import PatientDetails from "./shared/patientDetails/PatientDetails";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from "@mui/icons-material/Add";



export default function PatientsPage() {
  const [rows, setRows] = useState<any[]>([]); 
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [patientDetails, setPatientDetails] = useState();


  const columns: GridColDef[] = [
    { field: "patientId", headerName: "patientId", width: 100 },
    { field: "firstName", headerName: "firstName", width: 100 },
    { field: "lastName", headerName: "lastName", width: 130 },
    { field: "id", headerName: "id", width: 130 },
    { field: "city", headerName: "city", width: 130 },
    { field: "street", headerName: "street", width: 100 },
    { field: "streetNumber", headerName: "streetNumber", type: "number", width: 100 },
    { field: "birthDate", headerName: "birthDate", type: "Date",  width: 130 },
    { field: "phoneNumber", headerName: "phoneNumber", width: 100 },
    { field: "mobilePhoneNumber", headerName: "mobilePhoneNumber", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      type: 'actions',
      cellClassName: 'actions',
      renderCell: (params) => (
        <div>
          <Button startIcon={<EditIcon />} onClick={() => handleUpdate(params.row)}></Button>
          <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(params.row)}></Button>
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

  const handleToggleAddDialog = () => {
    setAddDialog(!addDialog);
    fetchData();
  };

  const handleToggleEditDialog = () => {
    setEditDialog(!editDialog);
    fetchData();
  };

  const handleToggledetailsDialog = () => {
    setDetailsDialog(!detailsDialog);
  };

  const handleUpdate = (row: any) => {
    setPatientDetails(row);
    setEditDialog(true);
  };

  const handleDelete = async (row: any) => {
    console.log(row);
    if (
      window.confirm(
        `Are you sure you want to delete ${row.firstName} ${row.lastName}?`
      )
    ) {
    await patientRequests.deletePatient(+(row.patientId));
    fetchData();
    }
  };

const showPatientDetails = (row: any)=>{
  setPatientDetails(row);
  setDetailsDialog(!detailsDialog);
}

  return (
    <div>
      <DataGrid
        sx={{ '--DataGrid-overlayHeight': '300px' }}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.patientId}
        onRowClick={(event, row) => showPatientDetails(event.row)}
      />
       <Button startIcon={<AddIcon />} onClick={() => setAddDialog(true)}>Add Patient</Button>
      {addDialog && <AddPatient onClose={handleToggleAddDialog} />}
      {editDialog && (
        <EditPatient patient={patientDetails} onClose={handleToggleEditDialog} />
      )}
      {detailsDialog && <PatientDetails patient={patientDetails} onClose={handleToggledetailsDialog} />}
    </div>
  );
}
