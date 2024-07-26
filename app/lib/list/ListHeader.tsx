import {Button, Center, Grid, Modal, Title} from "@mantine/core";
import {IconChevronLeft, IconPencil, IconPlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CreateItemModal from "@/app/lib/item/CreateItemModal";
import React from "react";
import {List} from "@/app/lib/types";
import Link from "next/link";
import EditListModal from "@/app/lib/list/EditListModal";


export default function ListHeader({list}: { list: List }) {

    const [addModalOpened, {open: addModalOpen, close: addModalClose}] = useDisclosure(false);
    const [editModalOpened, {open: editModalOpen, close: editModalClose}] = useDisclosure(false);

    return (
        <>
            <Grid p="xs">
                <Grid.Col span="content">
                    <Button variant="transparent" fullWidth size="compact-xl"
                            component={Link} href="/lists">
                        <IconChevronLeft/>
                    </Button>
                </Grid.Col>
                <Grid.Col span="auto">
                    <Center h="100%">
                        <Title order={3} ta="center">
                            {list.name}
                        </Title>
                    </Center>
                </Grid.Col>
                <Grid.Col span="content">
                    <Button onClick={addModalOpen} variant="transparent" fullWidth size="compact-xl">
                        <IconPlus/>
                    </Button>
                </Grid.Col>
                <Grid.Col span="content">
                    <Button variant="transparent" fullWidth size="compact-xl" onClick={editModalOpen}>
                        <IconPencil/>
                    </Button>
                </Grid.Col>
            </Grid>
            <Modal opened={addModalOpened} onClose={addModalClose} title="New item">
                <CreateItemModal list={list} modalClose={addModalClose}/>
            </Modal>
            <Modal opened={editModalOpened} onClose={editModalClose} title="Edit list">
                <EditListModal list={list} modalClose={editModalClose}/>
            </Modal>
        </>
    )
}