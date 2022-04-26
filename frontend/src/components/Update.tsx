import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MainWrapper, Form, Imagelabel, Input, Main, GlobalStyle, theme, Toaster } from './styles/style'
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Update = () => {
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null)
    const [role, setRole] = useState(null)
    const [phone, setPhone] = useState(null);
    const [profile, setProfile] = useState(null)
    const [file, setFile] = useState(null);
    const [user, setUser] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const notifyError = (mes) => toast.error(mes);
    const notifySuccess = (mes) => toast.success(mes);
    const nav = useNavigate();
    const { state } = useLocation();

    let formData = new FormData();

    formData.append('id', id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('role', role);
    formData.append('file', file);

    const setFileInput = (e) => {
        setFile(e.target.files[0])
    }



    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (file === null || phone === null || name === null || email === null || role === null) {
            if (file === null) return notifyError('please Upload File');
            if (name === null) return notifyError('please Enter Name');
            if (email === null) return notifyError('please Enter Email');
            if (role === null) return notifyError('please Enter Role');
            if (phone === null) return notifyError('please Enter Phone Number');
        } else {
            const res = await axios.put('http://localhost:4000/update-users', formData);
            console.log(res)
            notifySuccess('Successfully Updated!!')
            setTimeout(() => {
                nav('/Database')
            }, 2000);
        }
    }


    useEffect(() => {
        if (file) {
            setImageUrl(URL.createObjectURL(file));
        }
        const fetchuser = async () => await axios.get(`http://localhost:4000/find/${state}`).then(({ data }) => {
            setUser(data.data);
            setId(data.data._id);
            setName(data.data.name);
            setEmail(data.data.email);
            setPhone(data.data.phone);
            setRole(data.data.role);
            setProfile(data.data.imagePath);
        });
        fetchuser();
    }, [file, state]);

    return (
        <>
            <GlobalStyle />
            {(!user) ?
                <MainWrapper>
                    <Box >
                        <CircularProgress size={'5rem'} />
                    </Box>
                </MainWrapper>
                :
                <>
                    <MainWrapper>
                        <Toaster />
                        <Main>
                            <h1>Update Your Data</h1>
                            <Form onSubmit={onFormSubmit}>
                                <Imagelabel htmlFor="contained-button-file">
                                    <Input name="file" accept="image/*" id="contained-button-file" type="file" onChange={setFileInput} />
                                    <Button variant="contained" component="span" >
                                        Profile Upload
                                    </Button>
                                </Imagelabel>
                                {(imageUrl) ?
                                    <Box mt={2} textAlign="center">
                                        <div>Profile Preview:</div>
                                        <img src={imageUrl} alt={file.name} height="100px" />
                                    </Box>
                                    : <Box mt={2} textAlign="center">
                                        <div>Profile-Image </div>
                                        <img src={`http://localhost:4000${profile}`} alt={'Error'} height="100px" />
                                    </Box>}
                                <ThemeProvider theme={theme}>
                                    <TextField sx={{ input: { color: '#fff' } }} value={name} label="Name" variant="standard" color='secondary' onChange={(e) => setName(e.target.value)} autoComplete="off" />
                                    <TextField sx={{ input: { color: '#fff' } }} value={email} label="Email" variant="standard" color='secondary' onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                                    <TextField sx={{ input: { color: '#fff' } }} value={role} label="Role" variant="standard" color='secondary' onChange={(e) => setRole(e.target.value)} autoComplete="off" />
                                    <TextField sx={{ input: { color: '#fff' } }} value={phone} label="Phone" variant="standard" type='number' color='secondary' onChange={(e) => setPhone(e.target.value)} autoComplete="off" />
                                    <Button variant="contained" size="medium" endIcon={<SendIcon />} type='submit'>Update</Button>
                                </ThemeProvider>

                            </Form>
                        </Main>
                    </MainWrapper>
                </>
            }
        </>

    )
}

export default Update;
