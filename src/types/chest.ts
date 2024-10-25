export interface ITape {
    id : string
    playerId : string
    index : number
    isReserved: boolean
    chests: IChest[]
}

export interface IChest {
    id: string
    playerId: string
    tapeId: string
}

