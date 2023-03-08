import * as React from 'react';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TagUserInput} from './TagUserInput';


export const ReceiptData = (props) => {
    const [userCost, setUserCost] = useState({});
    console.log(props.data)

  return (
    <>

    <div style={{marginBottom: '25px', marginLeft: '250px', marginRight: '250px', marginTop: '25px'}}>
        <h2> Your receipt from {props.data["merchant_name"] }: </h2>
        <TableContainer component={Paper}>
        <Table sx={{  }} aria-label="spanning table">
            <TableHead>
            <TableRow>
                <TableCell align="left">Details</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left" colSpan={2}>Add Users</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.data["items"].map((row) => (
                <TableRow key={row.description}>
                <TableCell>{row.description}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell><TagUserInput itemName = {row.description} rowAmount = {row.amount} userCost = {userCost} setUserCost = {setUserCost}></TagUserInput></TableCell>
                </TableRow>
            ))}
            
            <TableRow>
                <TableCell colSpan={1}>Tip</TableCell>
                <TableCell align="left">{props.data["tip"] === null ? 0.00 : props.data["tip"]}</TableCell>
                <TableCell><TagUserInput/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={1}>Tax</TableCell>
                <TableCell align="left">{props.data["tax"]}</TableCell>
                <TableCell><TagUserInput/></TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={1}>Total</TableCell>
                <TableCell align="left">{props.data["total"]}</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    </div>

    </>
  );
}

export default ReceiptData;