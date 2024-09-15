'use client';

import ListHeader from "@/app/lib/list/ListHeader";
import {Divider, ScrollArea, Skeleton, Space, Stack} from "@mantine/core";
import ItemCard from "@/app/lib/item/ItemCard";
import {Item, List} from "@/app/lib/types";
import {useLists, useListsLoaded} from "@/app/ListsContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function ListComponent({params}: { params: { listId: string } }) {

    const list = useLists().find(l => l.id.toString() === params.listId);
    const loaded = useListsLoaded();
    const router = useRouter();

    useEffect(() => {
        // Prevent throwing back to overview if lists have not loaded yet
        if (!list && loaded) {
            console.error(`List with id ${params.listId} not found`);
            router.push("/");
        }
    }, [loaded, list, params.listId, router]);

    if (!list?.items) {
        // Render fake list while loading
        const fakeList: List = {
            id: -1, items: [{
                id: 0,
                name: "Loading...",
                quantity: 42,
                checked: false
            }, {
                id: 1,
                name: "Loading...",
                quantity: 42,
                checked: false
            }, {
                id: 2,
                name: "Loading...",
                quantity: 42,
                checked: false
            }, {
                id: 3,
                name: "Loading...",
                quantity: 42,
                checked: true
            }, {
                id: 4,
                name: "Loading...",
                quantity: 42,
                checked: true
            },], name: "Loading...", pointsCardCode: "123456789"
        };
        return (
            <>
                <ListHeader list={fakeList}/>
                <ScrollArea.Autosize>
                    <Stack justify="flex-start" gap="xs" p="xs">
                        {fakeList.items.filter(i => !i.checked).sort(itemSorter).map(item =>
                            <Skeleton key={item.id}>
                                <ItemCard listId={fakeList.id} item={item}/>
                            </Skeleton>
                        )}
                    </Stack>
                    <Divider/>
                    <Stack justify="flex-start" gap="xs" p="xs">
                        {fakeList.items.filter(i => i.checked).sort(itemSorter).map(item =>
                            <Skeleton key={item.id}>
                                <ItemCard listId={fakeList.id} item={item}/>
                            </Skeleton>
                        )}
                    </Stack>
                    {/*Because the footer hides some elements behind it*/}
                    <Space h="xl"/>
                    <Space h="xl"/>
                </ScrollArea.Autosize>
            </>
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
    return a.name.localeCompare(b.name);
}