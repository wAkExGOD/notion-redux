import { Button, Heading } from "@/components/ui"
import { formatDate } from "@/lib/formatDate"
import { routes } from "@/lib/routes"
import { Link } from "react-router-dom"
import { UserSkeleton } from "./UserSkeleton"
import { AppStore } from "@/redux/store"
import { connect } from "react-redux"
import { User } from "@/types"

type HomeComponentProps = {
  user: User | null
}

const HomeComponent: React.FC<HomeComponentProps> = ({ user }) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading>About me</Heading>
      {user ? (
        <>
          <ul className="flex flex-col gap-2">
            <li className="space-x-1">
              <b>Email:</b>
              <span>{user.email}</span>
            </li>
            <li className="space-x-1">
              <b>Date sign up:</b>
              <span>{formatDate(user.createdAt)}</span>
            </li>
          </ul>
          <Link to={routes.notes.root}>
            <Button>Go to Notes</Button>
          </Link>
        </>
      ) : (
        <UserSkeleton />
      )}
    </div>
  )
}

const mapStateToProps = function (state: AppStore) {
  return {
    user: state.user.user,
  }
}

export const Home = connect(mapStateToProps)(HomeComponent)
