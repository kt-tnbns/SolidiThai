import { Button, Modal } from "@mui/material"
import { DataTable } from "../../../components/table/data-table/DataTable.react"
import { User } from "../../../types/auth"
import { DataTableColDef } from "../../../types/dataTable"
import { useUserTable } from "./useUserTable"
import { CommonBoxForm } from "../../../components/box/CommonBox.react"
import { useState } from "react"

export const UserTable = () => {
  const { userTable } = useUserTable()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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

  const handleEditSubmit = () => {
    // Implement your edit logic here
    console.log('Editing user:', selectedUser?.id)
    setIsEditModalOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteSubmit = () => {
    console.log('Deleting user:', selectedUser?.id)
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <>
      <DataTable
        rows={userTable}
        columns={columns}
        rowsPerPage={10}
        onPageChange={() => { }}
        page={1}
        count={10}
        onEdit={handleEdit}
        onDelete={handleDelete}
        toolbarAction={<Button>Add User</Button>}
      />

      {/* Edit Modal */}
      {isEditModalOpen && (
        <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <CommonBoxForm
            title="Edit User"
            description={`Edit user ${selectedUser?.firstName}`}
            submitText="Save"
            cancelText="Cancel"
            onSubmit={handleEditSubmit}
            onClose={() => {
              setIsEditModalOpen(false)
              setSelectedUser(null)
            }}
          >
            <div>Edit form content goes here</div>
          </CommonBoxForm>
        </Modal>

      )}

      {isDeleteModalOpen && (
        <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <CommonBoxForm
            title="Delete User"
            description={`Are you sure you want to delete user ${selectedUser?.firstName}?`}
            submitText="Delete"
            cancelText="Cancel"
            onSubmit={handleDeleteSubmit}
            onClose={() => {
              setIsDeleteModalOpen(false)
              setSelectedUser(null)
            }}
          >
            <div>This action cannot be undone.</div>
          </CommonBoxForm>
        </Modal>
      )}
    </>
  )
}
