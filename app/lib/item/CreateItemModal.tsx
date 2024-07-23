import {isInRange, isNotEmpty, useForm} from "@mantine/form";
import {Button, Group, NumberInput, Popover, PopoverDropdown, PopoverTarget, Text, TextInput} from "@mantine/core";
import {useDisclosure, useFocusTrap, useTimeout} from "@mantine/hooks";
import {ItemActions, ListActions, useListsDispatch, useNextItemId} from "@/app/lists/ListsContext";

export default function CreateItemModal({modalClose, listId}: {
    modalClose: () => void,
    listId: number
}) {

    const dispatch = useListsDispatch();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            quantity: 1
        },
        validate: {
            name: isNotEmpty('Name must not be empty'),
            quantity: isInRange({min: 1}, 'Quantity must be greater than zero')
        }
    });

    const focusTrapRef = useFocusTrap();
    const [popoverOpened, {open: popoverOpen, close: popoverClose}] = useDisclosure(false);
    const {start: timerStart, clear: timerClear} = useTimeout(() => popoverClose(), 1000);

    function openPopover() {
        timerClear();
        popoverOpen();
        timerStart();
    }

    const newItemId = useNextItemId(listId);


    function add(values: { name: string, quantity: number }) {
        dispatch({
            action: ListActions.ITEM_ACTION,
            listId: listId,
            itemAction: {
                action: ItemActions.ADD,
                item:
                    {
                        id: newItemId,
                        name: values.name,
                        quantity: values.quantity,
                        sort: 0,
                        checked: false
                    }
            }
        });

        openPopover();
        form.reset();
    }

    function addAndClose(values: { name: string, quantity: number }) {
        add(values);
        modalClose();
    }

    return (
        <>
            <form>
                <TextInput
                    ref={focusTrapRef}
                    withAsterisk
                    data-autofocus
                    label="Name"
                    placeholder="Milk"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />

                <NumberInput
                    mt="md"
                    label="Quantity"
                    key={form.key('quantity')}
                    {...form.getInputProps('quantity', {type: 'input'})}
                />

                <Group justify="flex-end" mt="md">
                    <Popover width={200} position="bottom" withArrow shadow="md" opened={popoverOpened}>
                        <PopoverTarget>
                            <Button onClick={() => form.onSubmit(add)()}>Add</Button>
                        </PopoverTarget>
                        <PopoverDropdown>
                            <Text size="sm">Added new item!</Text>
                        </PopoverDropdown>
                    </Popover>
                    <Button onClick={() => form.onSubmit(addAndClose)()}>Add & Close</Button>
                </Group>
            </form>
        </>
    );
}

