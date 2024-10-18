import {
    Page,
  } from "@/types"
  export interface IStoreState {
    page: Page
    isLoading: number
  }
  
  export interface IStoreActions {
    setPage: (page: Page) => void
    addLoading: () => void
    removeLoading: () => void
    hideLoading: () => void
  }