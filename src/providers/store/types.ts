import {
    Page,
  } from "@/types"
  export interface IStoreState {
    page: Page
    isLoading: number
    keyShopOpen: boolean
    withdrawOpen: boolean
  }
  
  export interface IStoreActions {
    setPage: (page: Page) => void
    addLoading: () => void
    removeLoading: () => void
    hideLoading: () => void
    setKeyShopOpen: (isOpen: boolean) => void
    setWithdrawOpen: (isOpen: boolean) => void
  }