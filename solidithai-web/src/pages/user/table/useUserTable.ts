import { useEffect, useState } from "react"
import { User } from "../../../types/auth"
import { useGetUsers } from "../../../api/userApi"
import { SortOrder } from "../../../enums/sort-order"
import { useSearchParams } from "react-router-dom"

export const useUserTable = () => {
  const [selectedUser, setSelectedUser] = useState<User>()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState('10')

  const [searchParams, setSearchParams] = useSearchParams()

  const [params, setParams] = useState<{
    page: string
    limit: string
    keyword?: string
    sortBy?: string
    sortOrder?: SortOrder
  }>({
    page: '1',
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

  const searchParamsObject = Object.fromEntries(searchParams)

  const { data: users, isLoading, isFetching, refetch } = useGetUsers({ ...searchParamsObject }, {
    enabled: Object.keys(searchParamsObject).length > 0 
  })

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
    setSelectedUser(undefined)
  }

  const handleOnCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedUser(undefined)
  }

  const handleAddUser = () => {
    setIsAddUserModalOpen(true)
  }

  const handleOnCloseAddUserModal = () => {
    setIsAddUserModalOpen(false)
  }

  useEffect(() => {
    setSearchParams(params, {
      replace: true,
    })
  }, [params])

  return {
    handleEdit,
    handleDelete,
    handleOnCloseEditModal,
    handleOnCloseDeleteModal,
    handleOnCloseAddUserModal,
    handleAddUser,
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
    refetch,
  }
}
