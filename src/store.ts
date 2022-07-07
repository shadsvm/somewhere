import create from "zustand"

type Store = {

  query: string,
  setQuery: (text: string) => void

}

export const useStore = create<Store>(set => ({

  query: '',
  setQuery: (text) => set({query: text}),

}))