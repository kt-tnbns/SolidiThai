import { User } from "../../../types/auth"
import { DataTableColDef } from "../../../types/dataTable"

export const userColumns: DataTableColDef<User>[] = [
  {
    headerName: 'First name',
    field: 'firstName',
    sortable: true,
  },
  {
    headerName: 'Last name',
    field: 'lastName',
    sortable: true,
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    headerName: 'Create at',
    field: 'createdAt',
    renderCell: (params) => new Date(params.createdAt).toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    sortable: true,
  },
  {
    headerName: 'Updated at',
    field: 'updatedAt',
    renderCell: (params) => new Date(params.updatedAt).toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    sortable: true,
  },
]