import { useState } from "react"
import { User } from "../../../types/auth"
import { useGetUsers } from "../../../api/userApi"
import { SortOrder } from "../../../enums/sort-order"
import { useSearchParams } from "react-router-dom"

export const useUserTable = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [searchParams] = useSearchParams()

  const [params, setParams] = useState<{
    page: number
    limit: number
    keyword?: string
    sortBy?: string
    sortOrder?: SortOrder
  }>({
    page: 1,
    limit: rowsPerPage,
    sortBy: 'createdAt',
    sortOrder: SortOrder.DESC,
  })

  const onSort = (sortBy: string, sortOrder?: SortOrder) => {
    setParams((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }))
  }

  const { data: users, isLoading, isFetching } = useGetUsers({ ...params, ...Object.fromEntries(searchParams) })

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
    users,
    isLoading,
    isFetching,
    setParams,
    params,
    onSort,
    setRowsPerPage,
  }
}
