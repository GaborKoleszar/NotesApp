import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as UserApi from "../network/user_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

export default function NavBarLoggedInView({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) {

    async function logout() {
        try {
            await UserApi.logOut();
            onLogoutSuccessful();
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    )
}
