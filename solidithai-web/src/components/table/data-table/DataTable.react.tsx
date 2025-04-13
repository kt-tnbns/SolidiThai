import { Stack, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, LinearProgress, Collapse, Skeleton } from "@mui/material"
import { ReactNode, SetStateAction, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { useScreen } from "../../../hooks/useScreen"
import { DataTableEmpty } from "./DataTableEmpty.react"
import DataTablePagination from "./DataTablePagination.react"
import { TableCellSpanStyled, TableActionCellStyled, TableCellStyled, TableRowStyled } from "./DataTableStyled.react"
import DataTableToolbar from "./DataTableToolbar.react"
import { SortOrder } from "../../../enums/sort-order"
import { ActionableItem, CollapseAbleItem, DataTableColDef } from "../../../types/dataTable"
import { getResponsiveWidth } from "../../../utils/style"
import { DataTableAction } from "./DataTableAction.react"


export type DataTablePropType<T extends ActionableItem & CollapseAbleItem> = {
  columns: DataTableColDef<T>[]
  rows: T[]
  toolbarAction?: React.ReactNode | React.ReactNode[]
  rowsPerPage: number
  rowsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onRowsPerPageChange?: (newRowsPerPage: number) => void
  onSort?: (key: string, direction?: SortOrder) => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  noDataTitleText?: string
  noDataDescriptionText?: string
  page: number
  count: number
  sortBy?: string
  sortOrder?: SortOrder
  emptyDataChildren?: ReactNode
  isFetching?: boolean
  loading?: boolean
  setSelectedRowMenu?: (value: SetStateAction<T | undefined>) => void
  isFiltering?: boolean
  onClickRow?: (row: T) => void
  isOverflow?: boolean
  overFlowMaxHeight?: number
  collapseAble?: boolean
  hasActionHeader?: boolean
}

export const DataTable = <T extends ActionableItem & CollapseAbleItem>(
  props: DataTablePropType<T>,
) => {
  const {
    page,
    count,
    sortBy,
    sortOrder,
    toolbarAction,
    rows,
    columns,
    rowsPerPage,
    rowsPerPageOptions,
    noDataTitleText = 'No data',
    noDataDescriptionText,
    onSort,
    onPageChange,
    onRowsPerPageChange,
    onEdit,
    onDelete,
    emptyDataChildren,
    loading = false,
    isFetching,
    onClickRow,
    isOverflow,
    overFlowMaxHeight,
    collapseAble = false,
  } = props

  const { isMoreLg } = useScreen()
  const [rowExpand, setRowExpand] = useState<string>('')

  const hasAction = Boolean(onEdit || onDelete)
  const columnCount = columns.length + (hasAction ? 1 : 0)

  const toggleExpand = (rowId: string) => {
    if (!collapseAble) {
      return
    }
    setRowExpand((prev) => (prev === rowId ? '' : rowId))
  }

  const handleOnClickRow = (row: T) => {
    if (onClickRow) {
      onClickRow(row)
    } else if (collapseAble) {
      toggleExpand(row.id)
    }
  }

  const renderCellByField = (field: string, row: T, header: DataTableColDef<T>) => (
    <TableCellSpanStyled>{`${row[header.field] ?? ''
      }`}</TableCellSpanStyled>
  )


  const renderCellContent = (
    header: DataTablePropType<T>['columns'][number],
    row: T,
  ) => {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        {header.renderCell ? (
          <header.renderCell {...row} />
        ) : (
          renderCellByField(header.field, row, header)
        )}
      </Box>
    )
  }

  const handleSortChange = (key: string, direction?: SortOrder) => {
    if (key !== sortBy || direction === SortOrder.DESC) {
      onSort?.(key, SortOrder.ASC)
      return
    }
    onSort?.(key, SortOrder.DESC)
  }

  const isRenderColumn = (column: DataTableColDef<T>) => {
    const { onMobile = true, isRenderIndex = true } = column
    return isRenderIndex && (isMoreLg || onMobile)
  }

  return (
    <Stack>
      {(toolbarAction || rowsPerPageOptions) && (
        <DataTableToolbar
          action={toolbarAction}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangeRowsPerPage={(e) => {
            onRowsPerPageChange?.(e)
          }}
        />
      )}
      <TableContainer
        sx={{
          maxHeight: isOverflow ? overFlowMaxHeight : undefined,
          overflow: isOverflow ? 'auto' : undefined,
        }}
      >
        <Table aria-label="generic table" stickyHeader>
          <TableHead>
            <TableRow sx={{ whiteSpace: 'nowrap' }}>
              {columns.map(
                (header, index) =>
                  isRenderColumn(header) && (
                    <TableCell
                      key={`t-header_${index}_${header.field}`}
                      align={header?.align || 'left'}
                      sx={{
                        minWidth:
                          header?.minWidth ||
                          getResponsiveWidth(header?.maxWidth) ||
                          'auto',
                        maxWidth:
                          getResponsiveWidth(header?.maxWidth) || 'auto',
                        width: getResponsiveWidth(header?.maxWidth) || 'auto',
                      }}
                    >
                      {header.sortable ? (
                        <TableSortLabel
                          active={Boolean(sortBy) && sortBy === header.field}
                          direction={
                            Boolean(sortBy) && sortBy === header.field
                              ? sortOrder
                              : undefined
                          }
                          onClick={() => {
                            handleSortChange(header.field, sortOrder)
                          }}
                        >
                          {header.headerName}
                        </TableSortLabel>
                      ) : (
                        header.headerName
                      )}
                    </TableCell>
                  ),
              )}
              {hasAction && !rows.length && <TableActionCellStyled />}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <Skeleton
                component="tr"
                height={53}
                width="100%"
              />
            ) : (
              <>
                {isFetching && !loading && (
                  <TableRow>
                    <TableCellStyled colSpan={columnCount} padding="none">
                      <LinearProgress />
                    </TableCellStyled>
                  </TableRow>
                )}

                {!rows || rows.length === 0 ? (
                  <TableRow>
                    <TableCellStyled colSpan={columnCount} align="center">
                      <DataTableEmpty
                        title={noDataTitleText}
                        description={noDataDescriptionText}
                      >
                        {emptyDataChildren}
                      </DataTableEmpty>
                    </TableCellStyled>
                  </TableRow>
                ) : (
                  rows.map((item) => (
                    <Fragment key={`row-${item.id}`}>
                      <TableRowStyled
                        key={item.id}
                        onClick={() => handleOnClickRow(item)}
                        sx={{ cursor: collapseAble ? 'pointer' : 'default' }}
                      >
                        {columns.map(
                          (header) =>
                            isRenderColumn(header) && (
                              <TableCellStyled
                                key={`${header.field}`}
                                align={header?.align || 'left'}
                                sx={{
                                  minWidth:
                                    header?.minWidth ||
                                    header?.maxWidth ||
                                    'auto',
                                  maxWidth:
                                    getResponsiveWidth(header?.maxWidth) ||
                                    'auto',
                                  width:
                                    getResponsiveWidth(header?.maxWidth) ||
                                    'auto',
                                }}
                              >
                                {renderCellContent(header, item)}
                              </TableCellStyled>
                            ),
                        )}
                        <DataTableAction
                          item={item}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </TableRowStyled>
                      {collapseAble && rowExpand === item.id && (
                        <TableRowStyled key={`collapse-${item.id}`}>
                          <TableCell colSpan={columnCount}>
                            <Collapse
                              in={rowExpand === item.id}
                              timeout="auto"
                              unmountOnExit
                            >
                              {item.collapseItem}
                            </Collapse>
                          </TableCell>
                        </TableRowStyled>
                      )}
                    </Fragment>
                  ))
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {Boolean(page || count) && (
        <DataTablePagination
          currentPage={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          totalCount={count}
          borderTop={1}
          borderColor="divider"
          p={2}
        />
      )}
    </Stack>
  )
}

