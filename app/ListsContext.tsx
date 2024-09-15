'use client';

import {Item, List} from "@/app/lib/types";
import {createContext, Dispatch, ReactNode, useContext, useEffect, useState} from "react";
import {useImmerReducer} from "use-immer";
import {Draft, produce} from "immer";

export enum ItemActions {
    ADD, DELETE, UPDATE, SORT_UP, SORT_DOWN
}

export interface ItemAction {
    action: ItemActions,
    item: Item
}

export enum ListActions {
    ADD, DELETE, UPDATE, LOAD, ITEM_ACTION
}

export type ListAction = {
    action: ListActions.ITEM_ACTION,
    itemAction: ItemAction,
    listId: number
} | {
    action: ListActions.ADD | ListActions.UPDATE,
    list: List
} | {
    action: ListActions.DELETE,
    deleteId: number
} | {
    action: ListActions.LOAD,
    loadedLists: List[]
}

const ListsContext = createContext<List[]>([]);

const ListsDispatchContext = createContext<Dispatch<ListAction>>(() => {
    // do nothing
});

export function useLists() {
    return useContext(ListsContext);
}

export function useListsDispatch() {
    return useContext(ListsDispatchContext);
}

export function useNextItemId(listId: number) {
    const list = useLists().find(l => l.id === listId);
    if (!list) {
        console.error(`List with id ${listId} not found`);
        return 0;
    }
    const ids = list.items.map(i => i.id ? i.id : 0);
    return ids.length === 0 ? 0 : Math.max(...ids) + 1;
}

export function useNextListId() {
    const ids = useLists().map(l => l.id);
    return ids.length === 0 ? 0 : Math.max(...ids) + 1;
}

function listReducer(lists: Draft<List[]>, action: ListAction) {
    switch (action.action) {
        case ListActions.ADD:
            lists.push(action.list);
            break;
        case ListActions.DELETE:
            return lists.filter(l => l.id !== action.deleteId);
        case ListActions.UPDATE:
            const list2update = lists.find(l => l.id == action.list.id)
            if (!list2update) {
                console.error(`List with id ${action.list.id} not found`);
            } else {
                Object.assign(list2update, action.list);
            }
            break;
        case ListActions.LOAD:
            return action.loadedLists;
        case ListActions.ITEM_ACTION:
            const list = lists.find(l => l.id == action.listId);
            if (!list) {
                console.error(`List with id ${action.listId} not found`);
            } else {
                const tmp = produce(reduceItems);
                list.items = tmp(list.items, action.itemAction);
            }
            break;
    }
}

function reduceItems(items: Item[], action: ItemAction) {
    switch (action.action) {
        case ItemActions.ADD:
            // todo calc correct sort value
            items.push(action.item);
            break;
        case ItemActions.DELETE:
            return items.filter(i => i.id !== action.item.id);
        case ItemActions.UPDATE:
            const item = items.find(i => i.id == action.item.id)!;
            Object.assign(item, action.item);
            break;
        case ItemActions.SORT_UP:
            // todo
            break;
        case ItemActions.SORT_DOWN:
            // todo
            break;
    }
}

function getLocalStorageKey() {
    return "lists";
}

function readFromLocalStorage(): List[] {
    const saved = localStorage.getItem(getLocalStorageKey());
    if (saved === null) {
        return [{
            id: 0,
            name: "Inageya",
            pointsCardCode: "",
            items: [{id: 0, name: "Milk", checked: false, quantity: 1}]
        }];
    }
    return JSON.parse(saved) as List[];
}

export default function ListContextProvider({children}: { children: ReactNode }) {
    const [lists, dispatch] = useImmerReducer<List[], ListAction>(listReducer, []);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }
        const loadedLists = readFromLocalStorage();
        dispatch({
            action: ListActions.LOAD,
            loadedLists: loadedLists
        });
        setLoaded(true);
    }, [dispatch, loaded]);

    useEffect(() => {
        // Prevent saving state before having loaded existing data
        if (loaded) {
            localStorage.setItem(getLocalStorageKey(), JSON.stringify(lists));
        }
    }, [lists, loaded]);

    return (
        <ListsContext.Provider value={lists}>
            <ListsDispatchContext.Provider value={dispatch}>
                {children}
            </ListsDispatchContext.Provider>
        </ListsContext.Provider>
    );
}