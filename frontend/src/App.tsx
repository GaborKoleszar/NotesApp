import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { User } from "./models/user";
import styles from "./styles/NotesPage.module.css";
import * as UserApi from "./network/user_api";
import SignUpModal from './components/SignUpModal';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotePageLoggeOutView from './components/NotePageLoggeOutView';

function App() {

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await UserApi.getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);

	return (
		<div>
			<NavBar
				loggedInUser={loggedInUser}
				onLoginClicked={() => setShowLoginModal(true)}
				onSignUpClicked={() => setShowSignUpModal(true)}
				onLogoutSuccessful={() => setLoggedInUser(null)}
			/>
			<Container className={styles.notesPage}>
				<>
					{loggedInUser
						? <NotesPageLoggedInView />
						: <NotePageLoggeOutView />
					}
				</>
			</Container>
			{showSignUpModal &&
				<SignUpModal
					onDismiss={() => setShowSignUpModal(false)}
					onSignUpSuccessful={(user) => {
						setLoggedInUser(user);
						setShowSignUpModal(false);
					}}
				/>
			}
			{showLoginModal &&
				<LoginModal
					onDismiss={() => setShowLoginModal(false)}
					onLoginSuccessful={(user) => {
						setLoggedInUser(user);
						setShowLoginModal(false);
					}}
				/>
			}
		</div>
	);
}

export default App;
