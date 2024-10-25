
import { ITape } from "@/types/chest"

export interface IChestState {
    tape: ITape | null      
   }
   
export interface IChestActions {
    setTape: (tape: ITape) => void
}