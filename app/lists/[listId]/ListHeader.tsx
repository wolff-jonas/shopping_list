import {Button, Center, Grid, Modal, Title} from "@mantine/core";
import {IconChevronLeft, IconPlus, IconTrash} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import NewItemModal from "@/app/lists/[listId]/NewItemModal";
import React from "react";
import {List} from "@/app/lib/types";
import Link from "next/link";
import {ListActions, useListsDispatch} from "@/app/lists/ListsContext";
import {useRouter} from "next/navigation";


export default function ListHeader({list}: { list: List }) {

    const [addModalOpened, {open: addModalOpen, close: addModalClose}] = useDisclosure(false);
    const dispatch = useListsDispatch();
    const router = useRouter();

    function deleteList() {
        dispatch({
            action: ListActions.DELETE,
            deleteId: list.id
        });
        router.push("/lists");
    }

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
                    <Button variant="transparent" fullWidth size="compact-xl" onClick={deleteList}>
                        <IconTrash/>
                    </Button>
                </Grid.Col>
            </Grid>
            <Modal opened={addModalOpened} onClose={addModalClose} title="New item">
                <NewItemModal listId={list.id} modalClose={addModalClose}/>
            </Modal>
        </>
    )
}