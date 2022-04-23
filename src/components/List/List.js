import * as React from 'react';
import { useEffect } from "react";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Button } from '@mui/material';
import isOdd from 'is-odd';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import "./List.scss";
import {rows} from './Cells/Rows';

function List() {
  const dimesions = React.useRef({})
  const [dimesionsState, setDimesionsState] = React.useState({})

  function columnResize(params, event) {
    localStorage.setItem(params.colDef.field, params.colDef.width)
  }

  function rowClassing(params){
    if (isOdd(params.id)) {
      return `row-odd`;

    }
    else {
      return `row-couple`
    }
  }

  useEffect(() => {
    const nomer = parseInt(localStorage.getItem("nomer"))
    const email = parseInt(localStorage.getItem("email"))
    const dateCreated = parseInt(localStorage.getItem("dateCreated"))
    const lastLogin = parseInt(localStorage.getItem("lastLogin"))
    const actions = parseInt(localStorage.getItem("actions"))
    if (nomer) {
      dimesions.current.nomer = nomer
    }
    else {
      dimesions.current.nomer = 70
    }
    if (email) {
      dimesions.current.email = email
    }
    else {
      dimesions.current.email = 200
    }
    if (dateCreated) {
      dimesions.current.dateCreated = dateCreated
    }
    else {
      dimesions.current.dateCreated = 200
    }
    if (lastLogin) {
      dimesions.current.lastLogin = lastLogin
    }
    else {
      dimesions.current.lastLogin = 200
    }
    if (actions) {
      dimesions.current.actions = actions
    }
    else {
      dimesions.current.actions = 115
    }
    setDimesionsState(dimesions.current)
  }, [])

  const columns = [
    { field: 'nomer', headerName: 'Ν°', width: dimesionsState.nomer, resizable: true, },
    {
      field: 'email', headerName: 'Title', width: dimesionsState.email, resizable: true,
    },
    {
      field: 'dateCreated',
      headerName: 'Title',
      type: 'date',
      width: dimesionsState.dateCreated,
    },
    {
      field: 'lastLogin',
      headerName: 'Title',
      type: 'dateTime',
      width: dimesionsState.lastLogin,
    },
    {
      field: "actions",
      headerName: '',
      width: dimesionsState.actions,
      align: "center",
      renderCell: () => (
        <>
        <div className="action-div">
          <Button
            sx={{ width: "30px", height: "30px" }}>
            <FaEdit className="edit-icon" />
          </Button>
          </div>
          <div className="action-div">
          <Button
            sx={{ width: "30px", height: "30px" }}>
            <RiDeleteBin5Fill className="delete-icon" />
          </Button>
          </div>
        </>
      )
    },
  ];

 
  return (
    <div style={{ height:400, width: "785px" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        sx={{
          boxShadow: 2,
          width: "100%",
          height: "100%",
          margin: "50px",
          border: "1px",
        }}
        headerHeight={40}
        getRowClassName={(params) => rowClassing(params)}
        onColumnResize={(params, event) => columnResize(params, event)}
      />
    </div>
  );
}



export default List
