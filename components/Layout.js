
import { useState } from 'react'
import styles from './layout.module.css'
import Login from './Login'

export default function Layout({ children }) {
	const [showLogin, setShowLogin] = useState(false)
	return (
		<>
			<nav className={`${styles.navContainer} navbar`} role="navigation" >
				<div className="container">
				<div className="navbar-brand">
					<a className="navbar-item">
						<h1 className={styles.brandName}>Flick Tok</h1>
					</a>
				</div>

					<div className={`${styles.menuContainer} navbar-menu`}>
						<div className={`${styles.search} navbar-item`}>
							<input 
								className="input is-rounded ds-input" 
								type="text" 
								placeholder="Search accounts and videos" />						
						</div>
					</div>

				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<a className="button is-light">
								<strong>Upload</strong>
							</a>
							<a 
								onClick={() => setShowLogin(!showLogin)}
								className={`${styles.loginBtn} button is-light"`}
							>
								Log in
							</a>
						</div>
					</div>
				</div>
				</div>
				<Login 
					showModal={showLogin}
					closeModal={() => setShowLogin(false)}
				/>
			</nav>
			{children}
		</>
	)
}