

export interface ITape {
    id : string
    playerId : string
    index : number
    isReserved: boolean
    state: 'BLOCKED' | 'UNBLOCKED' | 'OPENED'
    chests: IChest[]
}

export interface IChest {
    id: string
    playerId: string
    tapeId: string
}

export interface IChestItem {
    id: string
    type: 'COMMON' | 'RARE' | 'EPIC'
    variant: 'USDT' | 'COINS' | 'KEYS'
    value: number
}

