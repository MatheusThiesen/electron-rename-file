import { createContext, useContext, useState } from 'react'

interface ActionsContextData {
  action: 'rename' | 'delete' | 'generateFile'
  setAction: (e: 'rename' | 'delete' | 'generateFile') => void
}

const ActionContext = createContext<ActionsContextData>(
  {} as ActionsContextData
)

export const ActionProvider: React.FC = ({ children }) => {
  const [action, setAction] = useState<'rename' | 'delete' | 'generateFile'>(
    'generateFile'
  )

  return (
    <ActionContext.Provider value={{ action, setAction }}>
      {children}
    </ActionContext.Provider>
  )
}

export const useAction = () => {
  const context = useContext(ActionContext)

  return context
}
