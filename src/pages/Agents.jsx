import {
    Box, Text, Table, Button, Menu, Portal, Input, Field, Dialog, CloseButton, useDialog,
} from '@chakra-ui/react'

import axios from 'axios'
import React, { useEffect, useState, } from 'react'

const Agents = () => {
    const [result, setResult] = useState([]);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("")
    const [agentId, setAgentId] = useState("")
    const dialog = useDialog()



    // let status = false;

    const token = localStorage.getItem("token");

    const getAgents = async () => {
        try {
            const response = await axios.get("http://localhost:8200/users", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("response to get users: ", response.data);
            setResult(response.data);


        } catch (error) {
            console.log("error while getting agents", error)
        }
    }
    const updateAgent = async (agent) => {
        try {
            let token = localStorage.getItem("token")
            setStatus(true);
            // status = true;

            // set
            console.log("id is:", agent._id)
            setAgentId(agent._id);
            setName(agent.name);
            setUsername(agent.username);
            setPassword(agent.password)

            // if (status === true) {
            //     console.log("first")
            //     return (<Input>{username}</Input>)
            // }





        }
        catch (error) {
            console.log("error while updating agents" + error)
        }
    }
    const submitHandler = async (id) => {

        try {
            if (id) {
                const response = await axios.put(`http://localhost:8200/users/${agentId}`, {
                    name: name,
                    username: username,
                    password: password

                },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
            }
            else {
                // setStatus(true);
                console.log("coming in else for user");
                const user = await axios.post("http://localhost:8200/auth/register", {
                    name: name,
                    username: username,
                    password: password
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })


            }
            getAgents();

        } catch (error) {
            console.log("error while updating agents!" + error)


        }




    }

    useEffect(() => {
        getAgents();
    }, [])


    return (
        <>
            {/* <Text textStyle={"5xl"}>Agents</Text>
            <Box>

                {result.map((a) => (
                    <Text>{a.name}</Text>
                ))}
            </Box> */}
            <Text textStyle={"5xl"}>Agents</Text>
            <Box>
                <Button onClick={() => setStatus(true)}>Create new+</Button>

                {status && <>
                    <Dialog.RootProvider value={dialog}>
                        <Dialog.Trigger asChild>
                            <Button variant="outline" size="sm">
                                {dialog.open ? "Close" : "Open"} Dialog
                            </Button>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>Edit User</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Box>
                                            <Field.Root required> <Field.Label>
                                                Username <Field.RequiredIndicator />
                                            </Field.Label></Field.Root>
                                            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <Field.Root required> <Field.Label>
                                                Name <Field.RequiredIndicator />
                                            </Field.Label></Field.Root>
                                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                                            <Field.Root required> <Field.Label>
                                                Password <Field.RequiredIndicator />
                                            </Field.Label></Field.Root>
                                            <Input onChange={(e) => setPassword(e.target.value)} />
                                        </Box>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                        {/* <Dialog.CloseTrigger asChild> */}
                                        <Button onClick={() => { submitHandler(agentId); dialog.setOpen(false); }}>Save</Button>
                                        {/* </Dialog.CloseTrigger> */}
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.RootProvider>


                </>}
            </Box>

            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Username</Table.ColumnHeader>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Password</Table.ColumnHeader>

                        <Table.ColumnHeader textAlign="end">Action</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {result.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.username}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell >****</Table.Cell>

                            <Table.Cell textAlign="end"><Menu.Root>
                                <Menu.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        Action
                                    </Button>
                                </Menu.Trigger>
                                <Portal>
                                    <Menu.Positioner>
                                        <Menu.Content>
                                            <Menu.Item value="new-txt" onClick={() => updateAgent(item)}>Edit</Menu.Item>
                                            <Menu.Item value="new-file">Upload Excel File</Menu.Item>

                                        </Menu.Content>
                                    </Menu.Positioner>
                                </Portal>
                            </Menu.Root></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

            </Table.Root>
        </>
    )
}

export default Agents