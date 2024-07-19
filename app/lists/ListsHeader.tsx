import {Button, Center, Grid, Modal, Title} from "@mantine/core";
import {IconDotsVertical, IconPlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import React from "react";
import NewListModal from "@/app/lists/NewListModal";


export default function ListsHeader() {

    const [addModalOpened, {open: addModalOpen, close: addModalClose}] = useDisclosure(false);

    return (
        <>
            <Grid p="xs">
                <Grid.Col span="content">
                    {/*Just here to fill space for the layout*/}
                    {/*TODO find a better way to lay this out*/}
                    <Button variant="transparent" fullWidth size="compact-xl" />
                </Grid.Col>
                <Grid.Col span="auto">
                    <Center h="100%">
                        <Title order={3} ta="center">
                            Lists
                        </Title>
                    </Center>
                </Grid.Col>
                <Grid.Col span="content">
                    <Button onClick={addModalOpen} variant="transparent" fullWidth size="compact-xl">
                        <IconPlus/>
                    </Button>
                </Grid.Col>
                <Grid.Col span="content">
                    <Button variant="transparent" fullWidth size="compact-xl">
                        <IconDotsVertical/>
                    </Button>
                </Grid.Col>
            </Grid>
            <Modal opened={addModalOpened} onClose={addModalClose} title="New list">
                <NewListModal modalClose={addModalClose}/>
            </Modal>
        </>
    )
}