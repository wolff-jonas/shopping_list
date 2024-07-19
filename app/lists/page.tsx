'use client'

import {useLists} from "@/app/lists/ListsContext";
import ListsHeader from "@/app/lists/ListsHeader";
import {ScrollAreaAutosize, Stack} from "@mantine/core";
import ListCard from "@/app/lists/ListCard";

export default function ListPage() {

    const lists = useLists();

    return (
        <>
            <ListsHeader/>
            <ScrollAreaAutosize>
                <Stack justify="flex-start" gap="xs" p="xs">
                    {lists.map(list => (
                       <ListCard list={list} key={list.id} />
                    ))}
                </Stack>
            </ScrollAreaAutosize>
        </>
    );
}

