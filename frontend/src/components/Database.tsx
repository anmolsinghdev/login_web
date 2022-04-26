import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { H1, TableWrapper, GlobalStyle, deleteButton, updateButton, Toaster } from './styles/style';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
const Database = () => {
    const [data, setData] = useState(null);
    const [deleteUser, setDeleteUser] = useState(false);
    const nav = useNavigate();
    const notifySuccess = (mes) => toast.success(mes)
    useEffect(() => {
        const fetch = async () => {
            await axios.get('http://localhost:4000/users').then((res) => { setData(res.data) })
        }
        fetch()

    }, [deleteUser])

    const onUpdateHandle = (id) => {
        nav("/Update", { state: id })
    }

    const onDeleteHandle = (id) => {
        setTimeout(async () => {
            await axios.delete(`http://localhost:4000/delete/${id}`)
            setDeleteUser(value => !value);
            toast.dismiss()
        }, 1000);
        notifySuccess('User Deleted!!');

    }

    return (
        <>
            <GlobalStyle />
            <Toaster />
            <TableWrapper>
                <TableContainer component={Paper} sx={{ background: 'transparent', height: '100vh' }}>
                    {(data === null) ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <CircularProgress size={'5rem'} />
                    </Box>
                        :
                        <>
                            <H1>USER DATABASE</H1>
                            <Table sx={{ minWidth: 650, }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                                        <TableCell align="center" sx={{ color: '#fff' }}>Email</TableCell>
                                        <TableCell align="center" sx={{ color: '#fff' }}>Role</TableCell>
                                        <TableCell align="center" sx={{ color: '#fff' }}>Phone No.</TableCell>
                                        <TableCell align="center" sx={{ color: '#fff' }}>Profile-Image</TableCell>
                                        <TableCell align="right" sx={{ color: '#fff' }}>Update</TableCell>
                                        <TableCell align="right" sx={{ color: '#fff' }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ color: '#fff' }}>{row.name}</TableCell>
                                            <TableCell align="center" sx={{ color: '#fff' }}>{row.email}</TableCell>
                                            <TableCell align="center" sx={{ color: '#fff' }}>{row.role}</TableCell>
                                            <TableCell align="center" sx={{ color: '#fff' }}>{row.phone}</TableCell>
                                            <TableCell align="center" sx={{ color: '#fff' }}><Box textAlign="center">
                                                <img src={`http://localhost:4000${row.imagePath}`} alt={'error'} height="60px" />
                                            </Box></TableCell>
                                            <ThemeProvider theme={updateButton}><TableCell align="right" sx={{ color: '#fff' }} ><Button variant="contained" onClick={() => onUpdateHandle(row._id)} sx={{ color: '#fff', borderColor: '#fff' }}><Link style={{ textDecoration: 'none', color: '#fff' }} to={{ pathname: '/Update' }}>Update</Link></Button></TableCell></ThemeProvider>
                                            <ThemeProvider theme={deleteButton}><TableCell align="right" sx={{ color: '#fff' }} ><Button variant="contained" onClick={() => onDeleteHandle(row._id)} sx={{ color: '#fff', borderColor: '#fff', }} >Delete</Button></TableCell></ThemeProvider>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </>
                    }
                </TableContainer>
            </TableWrapper>
        </>
    )
}
export default Database;