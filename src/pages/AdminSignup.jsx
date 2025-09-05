import { React, useState } from 'react'
import { Text, Field, Input, Stack, Button, } from '@chakra-ui/react'


import { PasswordInput } from "../components/ui/password-input"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const AdminSignup = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("")
    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const submitHandler = async (e) => {

        try {
            setLoading(e);
            const response = await axios.post("http://localhost:8200/auth/register/admin", {
                name: name,
                username: userName,
                password: password




            })
            navigate('/login')


        } catch (error) {
            console.log("error sending data!" + error);

        }


    }



    // console.log("value in name is:", name);

    return (
        <>
            <Text textStyle={"5xl"}>Admin Signup</Text >
            <Field.Root required>
                <Field.Label>
                    Name <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                {/* <Field.HelperText>We'll never share your email.</Field.HelperText> */}


            </Field.Root>
            <br></br>

            <Field.Root required>
                <Field.Label>
                    Username <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your username" value={userName} onChange={(e) => setuserName(e.target.value)} />
                <Field.HelperText>We'll never share your email.</Field.HelperText>

            </Field.Root>
            <br></br>

            <Stack>
                <Field.Root required>
                    <Field.Label>
                        Password <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                        placeholder="Enter your password"
                        // defaultValue=""
                        visible={visible}
                        onVisibleChange={setVisible}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Text>Password is {visible ? "visible" : "hidden"}</Text>
                </Field.Root>
            </Stack >
            <br></br>
            <Stack direction="row" gap="4" align="center">
                <Button loading={loading} onClick={() => submitHandler(!loading)}>Login</Button>
            </Stack >


        </>
    )
}

export default AdminSignup