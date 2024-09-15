'use client'

import {useLists} from "@/app/ListsContext";
import ListsOverviewHeader from "@/app/lib/listsOverview/ListsOverviewHeader";
import {ScrollAreaAutosize, Stack} from "@mantine/core";
import ListCard from "@/app/lib/list/ListCard";

export default function ListPage() {

    const lists = useLists();

    return (
        <>
            <ListsOverviewHeader/>
            <ScrollAreaAutosize>
                <Stack justify="flex-start" gap="xs" p="xs">
                    {lists.map(list => (
                        <ListCard list={list} key={list.id}/>
                    ))}
                </Stack>
            </ScrollAreaAutosize>
        </>
    );
}

