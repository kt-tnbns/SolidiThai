import { Button, Modal } from "@mui/material"
import { DataTable } from "../../../components/table/data-table/DataTable.react"
import { useUserTable } from "./useUserTable"
import { CommonBoxForm } from "../../../components/box/CommonBox.react"
import { SortOrder } from "../../../enums/sort-order"
import { userColumns } from "./userColumn"
import { Fragment } from "react/jsx-runtime"

export const UserTable = () => {
  const {
    users,
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
    setParams,
    params,
    onSort,
    isLoading,
  } = useUserTable()

  const addUserButton = (
    <Button onClick={handleAddUser} variant="contained" color="primary" size="large">Add User</Button>
  )

  return (
    <Fragment>
      <DataTable
        loading={isLoading}
        rows={users?.items || []}
        columns={userColumns}
        rowsPerPage={params.limit}
        onPageChange={(page) => setParams({ ...params, page })}
        page={params.page}
        count={users?.total || 0}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSort={onSort}
        sortBy={params.sortBy}
        sortOrder={params.sortOrder as SortOrder}
        toolbarAction={addUserButton}
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
    </Fragment>
  )
}
