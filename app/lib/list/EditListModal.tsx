import {List} from "@/app/lib/types";
import {Button, Group, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {useFocusTrap} from "@mantine/hooks";
import {ListActions, useListsDispatch} from "@/app/lists/ListsContext";
import {IconDeviceFloppy} from "@tabler/icons-react";

export default function EditListModal({modalClose, list}: {
    modalClose: () => void,
    list: List
}) {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: list.name
        },
        validate: {
            name: isNotEmpty('Name must not be empty')
        }
    });

    const focusTrapRef = useFocusTrap();
    const dispatch = useListsDispatch();

    function save(values: { name: string }) {
        dispatch({
            action: ListActions.UPDATE,
            list: {
                ...list,
                ...values
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

            <Group justify="right" mt="md" gap={1}>
                <Button onClick={() => form.onSubmit(save)()}><IconDeviceFloppy/>Save</Button>
            </Group>
        </form>
    )
}