import {Item} from "@/app/lib/types";
import {Button, Group, NumberInput, TextInput} from "@mantine/core";
import {isInRange, isNotEmpty, useForm} from "@mantine/form";
import {useFocusTrap} from "@mantine/hooks";
import {ItemActions, ListActions, useListsDispatch} from "@/app/ListsContext";
import {IconDeviceFloppy} from "@tabler/icons-react";

export default function EditItemModal({modalClose, listId, item}: {
    modalClose: () => void,
    listId: number,
    item: Item
}) {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: item.name,
            quantity: item.quantity
        },
        validate: {
            name: isNotEmpty('Name must not be empty'),
            quantity: isInRange({min: 1}, 'Quantity must be greater than zero')
        }
    });

    const focusTrapRef = useFocusTrap();

    const dispatch = useListsDispatch();

    function save(values: { name: string, quantity: number }) {
        dispatch({
            action: ListActions.ITEM_ACTION,
            listId: listId,
            itemAction: {
                action: ItemActions.UPDATE,
                item: {
                    ...item,
                    ...values
                }
            }
        });
        modalClose();
    }

    return (
        <form>
            <TextInput
                ref={focusTrapRef}
                withAsterisk
                data-autofocus
                label="Name"
                key={form.key("name")}
                {...form.getInputProps("name")}
            />

            <NumberInput
                mt="md"
                label="Quantity"
                key={form.key('quantity')}
                {...form.getInputProps('quantity', {type: 'input'})}
            />

            <Group justify="right" mt="md" gap={1}>
                <Button onClick={() => form.onSubmit(save)()}><IconDeviceFloppy/>Save</Button>
            </Group>
        </form>
    )
}