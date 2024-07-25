import {List} from "@/app/lib/types";
import {Button, Group, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {useFocusTrap} from "@mantine/hooks";
import {ListActions, useListsDispatch} from "@/app/lists/ListsContext";
import {IconDeviceFloppy, IconTrashX} from "@tabler/icons-react";
import {useRouter} from "next/navigation";

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
    const router = useRouter();

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

    function cancel() {
        modalClose();
    }

    function deleteList() {
        dispatch({
            action: ListActions.DELETE,
            deleteId: list.id
        });
        router.push("/lists");
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

            <Group justify="space-between" mt="md" gap={1}>
                <Button onClick={() => form.onSubmit(save)()}><IconDeviceFloppy/>Save</Button>
                <Button onClick={() => form.onSubmit(deleteList)()}><IconTrashX/>Delete</Button>
                <Button onClick={() => form.onSubmit(cancel)()}>Cancel</Button>
            </Group>
        </form>
    )
}