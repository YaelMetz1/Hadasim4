import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as patientRequests from "../../api/PatientRequests";


export default function PatientsPage() {
  const [rows, setRows] = useState<any[]>([]); 

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "firstName", width: 100 },
    { field: "lastName", headerName: "lastName", width: 170 },
    { field: "id", headerName: "id", width: 170 },
    { field: "city", headerName: "city", width: 130 },
    { field: "street", headerName: "street", width: 100 },
    { field: "streetNumber", headerName: "streetNumber", type: "number", width: 70 },
    { field: "birthDate", headerName: "birthDate", width: 170 },
    { field: "phoneNumber", headerName: "phoneNumber", width: 100 },
    { field: "mobilePhoneNumber", headerName: "mobilePhoneNumber", width: 100 },
  ];

  const fetchData = async () => {
    const data = await patientRequests.getAllPatients();
    console.log(data);
    setRows(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.patientId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
