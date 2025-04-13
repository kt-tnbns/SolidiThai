import Page from "../../components/page/Page.react"
import { UserFilter } from "./filter/UserFIlter.react"
import { UserTable } from "./table/UserTable.react"

export const UserPage = () => {

  return (
    <Page
      title="User Information"
      gap={2}
    >
      <UserFilter />
      <UserTable />
    </Page>
  )
}

