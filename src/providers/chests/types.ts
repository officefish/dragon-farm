
import { IChest, ITape, IChestItem } from "@/types/chest"

export interface IChestState {
    tape: ITape | null  
    chests: IChest[]    
    items: IChestItem[]
    baunty?: IChestItem
   }
   
export interface IChestActions {
    setTape: (tape: ITape) => void
    setChests: (chests: IChest[]) => void
    setItems: (items: IChestItem[]) => void
    setBaunty: (baunty: IChestItem) => void
}