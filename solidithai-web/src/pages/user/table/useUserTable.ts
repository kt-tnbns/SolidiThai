import { useState } from "react"
import { User } from "../../../types/auth"
import { DataTableColDef } from "../../../types/dataTable"
import { useGetUsers } from "../../../api/userApi"

export const useUserTable = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const { data: users, isLoading } = useGetUsers({
    page: 1,
    limit: 10,
  })
  
  const columns: DataTableColDef<User>[] = [
    {
      headerName: 'Name',
      field: 'firstName',
      sortable: true,
    },
    {
      headerName: 'Last Name',
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

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleOnCloseEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedUser(null)
  }

  const handleOnCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
  }

  const handleEditSubmit = () => {
    setIsEditModalOpen(false)
  }

  const handleDeleteSubmit = () => {
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
  }

  const handleAddUser = () => {
    setIsAddUserModalOpen(true)
  }

  const handleAddUserSubmit = () => {
    setIsAddUserModalOpen(false)
  }

  const handleOnCloseAddUserModal = () => {
    setIsAddUserModalOpen(false)
  }

  return {
    columns,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleDeleteSubmit,
    handleOnCloseEditModal,
    handleOnCloseDeleteModal,
    handleOnCloseAddUserModal,
    handleAddUser,
    handleAddUserSubmit,
    isEditModalOpen,
    isDeleteModalOpen,
    isAddUserModalOpen,
    selectedUser,
    users: users?.items || [],
    isLoading,
  }
}
