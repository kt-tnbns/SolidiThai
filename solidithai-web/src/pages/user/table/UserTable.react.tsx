import { Button, Modal } from "@mui/material"
import { DataTable } from "../../../components/table/data-table/DataTable.react"
import { useUserTable } from "./useUserTable"
import { CommonBoxForm } from "../../../components/box/CommonBox.react"

export const UserTable = () => {
  const {
    users,
    columns,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleDeleteSubmit,
    isEditModalOpen,
    isDeleteModalOpen,
    isAddUserModalOpen,
    selectedUser,
    handleOnCloseEditModal,
    handleOnCloseDeleteModal,
    handleOnCloseAddUserModal,
    handleAddUserSubmit,
    handleAddUser,
  } = useUserTable()

  return (
    <>
      <DataTable
        rows={users}
        columns={columns}
        rowsPerPage={10}
        onPageChange={() => { }}
        page={1}
        count={10}
        onEdit={handleEdit}
        onDelete={handleDelete}
        toolbarAction={<Button onClick={handleAddUser}>Add User</Button>}
      />

      <Modal open={isEditModalOpen} onClose={handleOnCloseEditModal}>
        <CommonBoxForm
          title="Edit User"
          description={`Edit user ${selectedUser?.firstName}`}
          submitText="Save"
          cancelText="Cancel"
          onSubmit={handleEditSubmit}
          onClose={handleOnCloseEditModal}
        >
          <div>Edit form content goes here</div>
        </CommonBoxForm>
      </Modal>

      <Modal open={isDeleteModalOpen} onClose={handleOnCloseDeleteModal}>
        <CommonBoxForm
          title="Delete User"
          description={`Are you sure you want to delete user ${selectedUser?.firstName}?`}
          submitText="Delete"
          cancelText="Cancel"
          onSubmit={handleDeleteSubmit}
          onClose={handleOnCloseDeleteModal}
        >
          <div>This action cannot be undone.</div>
        </CommonBoxForm>
      </Modal>

      <Modal open={isAddUserModalOpen} onClose={handleOnCloseAddUserModal}>
        <CommonBoxForm
          title="Add User"
          description="Add a new user"
          submitText="Add"
          cancelText="Cancel"
          onSubmit={handleAddUserSubmit}
          onClose={handleOnCloseAddUserModal}
        >
          <div>Add form content goes here</div>
        </CommonBoxForm>
      </Modal>
    </>
  )
}
