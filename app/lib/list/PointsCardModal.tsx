import {List} from "@/app/lib/types";
import {Stack, TextInput} from "@mantine/core";
import {ListActions, useListsDispatch} from "@/app/lists/ListsContext";
import Barcode from "react-barcode";

export default function PointsCardModal({list}: {
    list: List
}) {

    const dispatch = useListsDispatch();

    function setCode(value: string) {
        dispatch({
            action: ListActions.UPDATE,
            list: {
                ...list,
                pointsCardCode: value
            }
        })
    }

    return <Stack
        align="center"
        justify={"flex-start"}>
        <Barcode value={list.pointsCardCode != "" ? list.pointsCardCode : "123456789"}/>
        <TextInput
            label="Code"
            value={list.pointsCardCode}
            onChange={(event) => setCode(event.currentTarget.value)}
        />
    </Stack>;
}