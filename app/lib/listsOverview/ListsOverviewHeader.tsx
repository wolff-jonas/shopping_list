import {Button, Center, Grid, Modal, Title} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import React from "react";
import CreateListModal from "@/app/lib/list/CreateListModal";


export default function ListsOverviewHeader() {

    const [addModalOpened, {open: addModalOpen, close: addModalClose}] = useDisclosure(false);

    return (
        <>
            <Grid p="xs" bg="theme.2">
                <Grid.Col span="content">
                    {/*Just here to fill space for the layout*/}
                    {/*TODO find a better way to lay this out*/}
                    <Button variant="transparent" fullWidth size="compact-xl"/>
                </Grid.Col>
                <Grid.Col span="auto">
                    <Center h="100%">
                        <Title order={3} ta="center">
                            Overview
                        </Title>
                    </Center>
                </Grid.Col>
                <Grid.Col span="content">
                    <Button onClick={addModalOpen} variant="transparent" fullWidth size="compact-xl">
                        <IconPlus/>
                    </Button>
                </Grid.Col>
            </Grid>
            <Modal opened={addModalOpened} onClose={addModalClose} title="New list">
                <CreateListModal modalClose={addModalClose}/>
            </Modal>
        </>
    )
}