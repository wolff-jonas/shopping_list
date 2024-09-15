import {Button, Center, Grid, Menu, Modal, Title} from "@mantine/core";
import {IconChevronLeft, IconMenu2, IconPencil, IconPlus, IconQrcode, IconTrashX} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import CreateItemModal from "@/app/lib/item/CreateItemModal";
import React from "react";
import {List} from "@/app/lib/types";
import Link from "next/link";
import EditListModal from "@/app/lib/list/EditListModal";
import {ListActions, useListsDispatch} from "@/app/ListsContext";
import {useRouter} from "next/navigation";
import PointsCardModal from "@/app/lib/list/PointsCardModal";


export default function ListHeader({list}: { list: List }) {

    const [addModalOpened, {open: addModalOpen, close: addModalClose}] = useDisclosure(false);
    const [editModalOpened, {open: editModalOpen, close: editModalClose}] = useDisclosure(false);
    const [pointsCardModalOpened, {open: pointsCardModalOpen, close: pointsCardModalClose}] = useDisclosure(false);

    const dispatch = useListsDispatch();
    const router = useRouter();

    function deleteList() {
        dispatch({
            action: ListActions.DELETE,
            deleteId: list.id
        });
        router.push("/");
    }

    return (
        <>
            <Grid p="xs" bg="theme.2">
                <Grid.Col span="content">
                    <Button variant="transparent" fullWidth size="compact-xl"
                            component={Link} href="/">
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
                    <Menu>
                        <Menu.Target>
                            <Button variant="transparent" fullWidth size="compact-xl">
                                <IconMenu2/>
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconQrcode/>}
                                onClick={pointsCardModalOpen}>
                                Points card
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconPencil/>}
                                onClick={editModalOpen}>
                                Edit
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconTrashX/>}
                                onClick={deleteList}>
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Grid.Col>
            </Grid>
            <Modal opened={addModalOpened} onClose={addModalClose} title="New item">
                <CreateItemModal list={list} modalClose={addModalClose}/>
            </Modal>
            <Modal opened={editModalOpened} onClose={editModalClose} title="Edit list">
                <EditListModal list={list} modalClose={editModalClose}/>
            </Modal>
            <Modal opened={pointsCardModalOpened} onClose={pointsCardModalClose} title="Points card">
                <PointsCardModal list={list}/>
            </Modal>
        </>
    )
}