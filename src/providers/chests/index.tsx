import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IChestState, IChestActions } from './types'
import { ITape } from '@/types/chest'

type IChestStore = IChestState & IChestActions

const createChestStore = () =>
  createStore<IChestStore>()((set) => ({
    tape: null,
    setTape: (tape: ITape) => set(() => ({ tape })),
  }))

  type ChestStore = ReturnType<typeof createChestStore>
  const ChestContext = createContext<ChestStore | null>(null)

  export const useChestsStore = () => {
    const api = useContext(ChestContext) as StoreApi<IChestStore>
    return {
      tape: useStore(api, (state) => state.tape),
      setTape: useStore(api, (state) => state.setTape),
    }
  }

  export const ChestsProvider: FC<PropsWithChildren> = ({ children }) => {
    const chestRef = useRef<ChestStore>()
    if (!chestRef.current) {
      chestRef.current = createChestStore()
    }
    return (
      <ChestContext.Provider value={chestRef.current}>
        {children}
      </ChestContext.Provider>
    )
  }