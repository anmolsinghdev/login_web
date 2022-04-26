import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MainWrapper, Form, Imagelabel, Input, Main, GlobalStyle, theme, Toaster } from './styles/style'
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [role, setRole] = useState(null)
    const [phone, setPhone] = useState(null)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const notifyError = (mes) => toast.error(mes);
    const notifySuccess = (mes) => toast.success(mes);
    const nav = useNavigate()

    let formData = new FormData();
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
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //eslint-disable-line
        if (phone === null || name === null || email === null || role === null || file === null) {
            if (file === null) return notifyError('Please Upload Profile Image');
            if (name === null) return notifyError('Please Enter Name');
            if (email === null) return notifyError('Please Enter Email');
            if (role === null) return notifyError('Please Enter Role');
            if (phone === null) return notifyError('Please Enter Phone Number');
        } else if (!filter.test(email)) {
            notifyError('Please Enter a valid Email');
            return false;
        } else {
            const res = await axios.post('http://localhost:4000/create-users', formData);
            console.log(res)
            notifySuccess('Successfully created!!')
            setTimeout(() => {
                nav('/Database')
            }, 2000);
        }
    }


    useEffect(() => {
        if (file) {
            setImageUrl(URL.createObjectURL(file));
        }
    }, [file]);
    return (
        <>
            <GlobalStyle />
            <MainWrapper>
                <Toaster />
                <Main>
                    <h1>Signup Form</h1>
                    <Form onSubmit={onFormSubmit}>
                        <Imagelabel htmlFor="contained-button-file">
                            <Input name="file" accept="image/*" id="contained-button-file" type="file" onChange={setFileInput} />
                            <Button variant="contained" component="span">
                                Profile  Upload
                            </Button>
                        </Imagelabel>
                        {imageUrl && (
                            <Box mt={2} textAlign="center">
                                <div>Profile Preview:</div>
                                <img src={imageUrl} alt={file.name} height="100px" />
                            </Box>
                        )}
                        <ThemeProvider theme={theme}>
                            <TextField sx={{ input: { color: '#fff' } }} label="Name" variant="standard" color='secondary' onChange={(e) => setName(e.target.value)} autoComplete="off" />
                            <TextField sx={{ input: { color: '#fff' } }} label="Email" variant="standard" color='secondary' onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                            <TextField sx={{ input: { color: '#fff' } }} label="Role" variant="standard" color='secondary' onChange={(e) => setRole(e.target.value)} autoComplete="off" />
                            <TextField sx={{ input: { color: '#fff' } }} label="Phone" variant="standard" type='number' color='secondary' onChange={(e) => setPhone(e.target.value)} autoComplete="off" />
                            <Button variant="contained" size="medium" endIcon={<SendIcon />} type='submit'>Submit</Button>
                        </ThemeProvider>
                    </Form>
                </Main>
            </MainWrapper>
        </>
    )
}

export default Signup;
