'use client';

import ListHeader from "@/app/lib/list/ListHeader";
import {Divider, ScrollArea, Space, Stack, Text} from "@mantine/core";
import ItemCard from "@/app/lib/item/ItemCard";
import {Item} from "@/app/lib/types";
import {useLists} from "@/app/lists/ListsContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function ListComponent({params}: { params: { listId: string } }) {

    const list = useLists().find(l => l.id.toString() === params.listId);
    const router = useRouter();

    useEffect(() => {
        if (!list) {
            console.error(`List with id ${params.listId} not found`);
            router.push("/lists");
        }
    }, [list, params.listId, router]);

    if (!list?.items) {
        // todo render placeholders
        return (
            <Text>Oink? </Text>
        );
    }

    return (
        <>
            <ListHeader list={list}/>
            <ScrollArea.Autosize>
                <Stack justify="flex-start" gap="xs" p="xs">
                    {list.items.filter(i => !i.checked).sort(itemSorter).map(item =>
                        <ItemCard key={item.id} listId={list.id} item={item}/>
                    )}
                </Stack>
                <Divider/>
                <Stack justify="flex-start" gap="xs" p="xs">
                    {list.items.filter(i => i.checked).sort(itemSorter).map(item =>
                        <ItemCard key={item.id} listId={list.id} item={item}/>
                    )}
                </Stack>
                {/*Because the footer hides some elements behind it*/}
                <Space h="xl"/>
                <Space h="xl"/>
            </ScrollArea.Autosize>
        </>
    );
}


function itemSorter(a: Item, b: Item): number {
    if (a.sort === b.sort) {
        return a.name.localeCompare(b.name);
    }
    return a.sort > b.sort ? 1 : -1;
}