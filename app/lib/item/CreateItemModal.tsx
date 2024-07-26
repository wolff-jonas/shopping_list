import {isInRange, isNotEmpty, useForm} from "@mantine/form";
import {Button, Group, NumberInput, Popover, PopoverDropdown, PopoverTarget, Text, TextInput} from "@mantine/core";
import {useDisclosure, useFocusTrap, useTimeout} from "@mantine/hooks";
import {ItemActions, ListActions, useListsDispatch, useNextItemId} from "@/app/lists/ListsContext";
import {List} from "@/app/lib/types";

function validateName(value: string | undefined, list: List) {
    const error = isNotEmpty('Name must not be empty')(value);
    if (error) {
        return error;
    }

    const existingItem = list.items.find(i => i.name === value);
    if (existingItem) {
        return "An item with that name already exists"
    }
}

export default function CreateItemModal({modalClose, list}: {
    modalClose: () => void,
    list: List
}) {

    const dispatch = useListsDispatch();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            quantity: 1
        },
        validate: {
            name: v => validateName(v, list),
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

    const newItemId = useNextItemId(list.id);


    function add(values: { name: string, quantity: number }) {
        dispatch({
            action: ListActions.ITEM_ACTION,
            listId: list.id,
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

