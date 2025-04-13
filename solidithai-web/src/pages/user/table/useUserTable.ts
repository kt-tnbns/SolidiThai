import { useState } from "react"
import { User } from "../../../types/auth"
import { DataTableColDef } from "../../../types/dataTable"
import { useGetUsers } from "../../../api/userApi"

export const useUserTable = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
      headerName: 'Email',
      field: 'email',
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

  return {
    columns,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleDeleteSubmit,
    handleOnCloseEditModal,
    handleOnCloseDeleteModal,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedUser,
    users: users?.items || [],
    isLoading,
  }
}
