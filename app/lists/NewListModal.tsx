import {isNotEmpty, useForm} from "@mantine/form";
import {Button, Group, TextInput} from "@mantine/core";
import {ListActions, useListsDispatch, useNextListId} from "@/app/lists/ListsContext";

export default function NewListModal({modalClose}: {
    modalClose: () => void
}) {

    const dispatch = useListsDispatch();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: ''
        },
        validate: {
            name: isNotEmpty('Name must not be empty')
        }
    });

    const newItemId = useNextListId();

    function addAndClose(values: { name: string }) {
        dispatch({
            action: ListActions.ADD,
            list: {
                id: newItemId,
                name: values.name,
                items: []
            }
        });
        modalClose();
    }

    return (
        <>
            <form>
                <TextInput
                    withAsterisk
                    data-autofocus
                    label="Name"
                    placeholder="Milk"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />

                <Group justify="flex-end" mt="md">
                    <Button onClick={() => form.onSubmit(addAndClose)()}>Add</Button>
                </Group>
            </form>
        </>
    );
}

