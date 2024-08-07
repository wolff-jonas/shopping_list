export interface Item {
    id?: number,
    name: string,
    sort: number,
    quantity: number,
    checked: boolean
}

export interface List {
    id: number,
    name: string,
    items: Item[]
}


