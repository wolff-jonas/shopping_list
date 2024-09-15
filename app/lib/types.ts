export interface Item {
    id?: number,
    name: string,
    quantity: number,
    checked: boolean
}

export interface List {
    id: number,
    name: string,
    pointsCardCode: string
    items: Item[]
}


