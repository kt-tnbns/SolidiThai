export type DataTableColDef<
  T extends {
    id: any
  },
> = {
  headerName: string
  field: keyof T & string
  sortable?: boolean
  renderCell?: React.FC<T>
  isRenderIndex?: boolean
  minWidth?: number
  maxWidth?: number
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined
  onMobile?: boolean
  alignContent?: 'start' | 'center' | 'end' | 'baseline' | 'stretch' | undefined
}

export type ActionableItem = {
  id: any
  isDisableDelete?: boolean
  isDisableEdit?: boolean
}

export type CollapseAbleItem = {
  collapseItem?: React.ReactNode
}
