import {Button, Center, Checkbox, Grid, Menu, Modal, Paper, Text} from "@mantine/core";
import {ItemActions, ListActions, useListsDispatch} from "@/app/ListsContext";
import {Item} from "@/app/lib/types";
import {useDisclosure} from "@mantine/hooks";
import EditItemModal from "@/app/lib/item/EditItemModal";
import {IconMenu2, IconPencil, IconTrashX} from "@tabler/icons-react";

export default function ItemCard({item, listId}: { item: Item, listId: number }) {

    const dispatch = useListsDispatch();
    const [editModalOpened, {open: editModalOpen, close: editModalClose}] = useDisclosure(false);

    function deleteItem() {
        dispatch({
            action: ListActions.ITEM_ACTION,
            listId: listId,
            itemAction: {
                action: ItemActions.DELETE,
                item: item
            }
        });
    }

    return (
        <>
            <Paper withBorder p="xs" radius="xs" bg="theme.1">
                <Grid>
                    <Grid.Col span={1}>
                        <Center h="100%">
                            <Checkbox checked={item.checked}
                                      onChange={event => dispatch({
                                          action: ListActions.ITEM_ACTION,
                                          listId: listId,
                                          itemAction: {
                                              action: ItemActions.UPDATE,
                                              item: {
                                                  ...item,
                                                  checked: event.target.checked
                                              }
                                          }
                                      })}/>
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Center h="100%">
                            <Text>x{item.quantity}</Text>
                        </Center>
                    </Grid.Col>
                    <Grid.Col span="auto">
                        <Text ta="left">{item.name}</Text>
                    </Grid.Col>
                    <Grid.Col span="content">
                        <Center h="100%">
                            <Menu>
                                <Menu.Target>
                                    <Button variant="transparent" fullWidth size="compact-sm">
                                        <IconMenu2/>
                                    </Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        leftSection={<IconPencil/>}
                                        onClick={editModalOpen}
                                    >
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<IconTrashX/>}
                                        onClick={deleteItem}>
                                        Delete
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Center>
                    </Grid.Col>
                </Grid>
            </Paper>
            <Modal opened={editModalOpened} onClose={editModalClose} title="Edit Item">
                <EditItemModal modalClose={editModalClose} listId={listId} item={item}/>
            </Modal>
        </>
    );
}