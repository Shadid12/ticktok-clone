
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import styles from '../styles/layout.module.css'
import Login from './Login'
import Signup from './Signup'

export default function Layout({ children }) {
	const [showLogin, setShowLogin] = useState(false)
	const [showSignup, setShowSignup] = useState(false)

	const [isAuthenticated, setIsAuthenticated] = useState(false)
	
	const router = useRouter()
	
	useEffect(() => { 
		if(Cookie.get('fauna-session')) {
			setIsAuthenticated(true)
		}
	}, [])

	const logout = () => {
		Cookie.remove('fauna-session')
		setIsAuthenticated(false)
	}

	return (
		<>
			<nav className={`${styles.navContainer} navbar`} role="navigation" >
				<div className="container">
				<div className="navbar-brand">
					<a className="navbar-item" onClick={() => router.push('/')}>
						<h1 className={styles.brandName}>Flick Tok</h1>
					</a>
				</div>

				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<a className="button is-light" onClick={() => router.push('/upload')}>
								<strong>Upload</strong>
							</a>
							{isAuthenticated ? ( 
								<a 
									onClick={ logout}
									className={`button is-warning`}
								>
									Logout
								</a>
							) : ( 
								<a 
									onClick={() => setShowLogin(!showLogin)}
									className={`${styles.loginBtn} button is-light"`}
								>
									Log in
								</a>
							)}
						</div>
					</div>
				</div>
				</div>
				<Login 
					showModal={showLogin}
					closeModal={() => setShowLogin(false)}
					openSignup={() => {
						setShowLogin(false)
						setShowSignup(true)
					}}
				/>
				<Signup 
					showModal={showSignup}
					closeModal={() => setShowSignup(false)}
					openLogin={() => {
						setShowSignup(false)
						setShowLogin(true)
					}}
				/>
			</nav>
			{children}
		</>
	)
}