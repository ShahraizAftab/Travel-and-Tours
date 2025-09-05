import React, { useState } from 'react'
import { Field, Input, Stack, Text, Button } from "@chakra-ui/react"

import { PasswordInput } from "../components/ui/password-input"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        try {
            setLoading(e);
            const response = await axios.post("http://localhost:8200/auth/login", {
                username: username,
                password: password
            },



            )
            console.log("token in response is:", response.data.token)
            const token = response.data.token;
            localStorage.setItem("token", token);
            console.log("token here:", localStorage.getItem("token"))
            if (token) {
                navigate("/view-agents")
            }



        } catch (error) {
            console.log("error while login", error);
        }
    }

    return (
        <>
            <div>
                <Text textStyle={"5xl"}>Login Page</Text>
            </div>

            <Field.Root required>
                <Field.Label>
                    Username <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Field.HelperText>We'll never share your email.</Field.HelperText>
            </Field.Root>
            <br></br>

            <Stack>
                <Field.Root required>
                    <Field.Label>
                        Password <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                        // defaultValue=""
                        visible={visible}
                        onVisibleChange={setVisible}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Text>Password is {visible ? "visible" : "hidden"}</Text>
                </Field.Root>
            </Stack >
            <br></br>
            <Stack direction="row" gap="4" align="center">
                <Button loading={loading} onClick={() => submitHandler(!loading)}>Login</Button>

            </Stack>

        </>
    )
}

export default Login