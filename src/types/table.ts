import { TableColumnType } from 'ant-design-vue'
type EditCellType = 'editCellslots' | boolean | ((record: any) => boolean)
export interface ColumnsType extends TableColumnType {
    readonly?: boolean
    editType?: string
    editCell?: EditCellType
    enumOption?: {
        label: string
        value: string | number | undefined | null
    }[]
}