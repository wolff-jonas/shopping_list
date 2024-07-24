import {Button, Center, Checkbox, Grid, Modal, Paper, Text} from "@mantine/core";
import {IconPencil} from "@tabler/icons-react";
import {ItemActions, ListActions, useListsDispatch} from "@/app/lists/ListsContext";
import {Item} from "@/app/lib/types";
import {useDisclosure} from "@mantine/hooks";
import EditItemModal from "@/app/lib/item/EditItemModal";

export default function ItemCard({item, listId}: { item: Item, listId: number }) {

    const dispatch = useListsDispatch();
    const [editModalOpened, {open: editModalOpen, close: editModalClose}] = useDisclosure(false);


    return (
        <>
            <Paper withBorder p="xs" radius="xs" bg="purple.1">
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
                            <Button variant="transparent" fullWidth size="compact-sm" onClick={editModalOpen}>
                                <IconPencil/>
                            </Button>
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