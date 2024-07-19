export type Item = {
    id?: number,
    name: string,
    sort: number,
    quantity: number,
    checked: boolean
}

export type List = {
    id: number,
    name: string,
    items: Item[]
}


