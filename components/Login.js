import styles from './login.module.css'

export default function Login({ showModal = false, closeModal }) {
	return (
		<div className={`modal ${showModal ? 'is-active' : ''}`}>
			<div className="modal-background" onClick={() => closeModal()}></div>
			<div className="card">
				<div className="card-content">
					<div className="content">
						<div className="navbar-brand">
							<a className="navbar-item">
								<h1 className={styles.shadowText}>Make Your Day 😎</h1>
							</a>
						</div>
						<form className={styles.form}>
							<input 
								className={`${styles.inputItem} input`} 
								type="text" 
								placeholder="Email" 
							/>
						
							<input 
								className={`${styles.inputItem} input`} 
								type="password" 
								placeholder="Password" 
							/>

							<button className="button is-light">
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
			<button 
				className="modal-close is-large" 
				aria-label="close"
				onClick={() => closeModal()}>
			</button>
		</div>
	);
}