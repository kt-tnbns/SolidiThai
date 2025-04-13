import { Button, Modal, Typography } from "@mui/material"
import { DataTable } from "../../../components/table/data-table/DataTable.react"
import { useUserTable } from "./useUserTable"
import { CommonBoxForm } from "../../../components/box/CommonBox.react"
import { SortOrder } from "../../../enums/sort-order"
import { userColumns } from "./userColumn"
import { Fragment } from "react/jsx-runtime"
import { FaPlus } from "react-icons/fa6"
import { CreateUserForm } from "../manage-user/create/CreateUserForm.react"
import { UpdateUserForm } from "../manage-user/update/UpdateUserForm.react"
import { DeleteUserForm } from "../manage-user/delete/DeleteUserForm.react"

export const UserTable = () => {
  const {
    users,
    handleEdit,
    handleDelete,
    refetch,
    isEditModalOpen,
    isDeleteModalOpen,
    isAddUserModalOpen,
    selectedUser,
    handleOnCloseEditModal,
    handleOnCloseDeleteModal,
    handleOnCloseAddUserModal,
    handleAddUser,
    setParams,
    params,
    onSort,
    isLoading,
    isFetching,
  } = useUserTable()

  const addUserButton = (
    <Button onClick={handleAddUser} variant="contained" color="primary" size="large" sx={{ gap: 1 }}>
      <FaPlus />
      <Typography variant="body1">Add User</Typography>
    </Button>
  )

  return (
    <Fragment>
      <DataTable
        isLoading={isFetching || isLoading}
        rows={users?.items || []}
        columns={userColumns}
        rowsPerPage={parseInt(params.limit)}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={(page) => setParams({ ...params, page: page.toString() })}
        onRowsPerPageChange={(rowsPerPage) => setParams({ ...params, limit: rowsPerPage.toString(), page: '1' })}
        page={parseInt(params.page)}
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
          onClose={handleOnCloseEditModal}
        >
          <UpdateUserForm onClose={handleOnCloseEditModal} refetch={refetch} user={selectedUser!} />
        </CommonBoxForm>
      </Modal>

      <Modal open={isDeleteModalOpen} onClose={handleOnCloseDeleteModal}>
        <CommonBoxForm
          title="Delete User"
          description={`Are you sure you want to delete user ${selectedUser?.email}?`}
          onClose={handleOnCloseDeleteModal}
        >
          <DeleteUserForm onClose={handleOnCloseDeleteModal} refetch={refetch} user={selectedUser!} />
        </CommonBoxForm>
      </Modal>

      <Modal open={isAddUserModalOpen} onClose={handleOnCloseAddUserModal}>
        <CommonBoxForm
          title="Add User"
          description="Add a new user"
          onClose={handleOnCloseAddUserModal}
        >
          <CreateUserForm onClose={handleOnCloseAddUserModal} refetch={refetch} />
        </CommonBoxForm>
      </Modal>
    </Fragment>
  )
}
