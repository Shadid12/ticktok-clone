import styles from './login.module.css'

export default function Signup({ showModal = false, closeModal, openLogin }) {
	return (
		<div className={`modal ${showModal ? 'is-active' : ''}`}>
			<div className="modal-background" onClick={() => closeModal()}></div>
			<div className="card">
				<div className="card-content">
					<div className="content">
						<div className="navbar-brand">
							<a className="navbar-item">
								<h1 className={styles.shadowText}>Signup and Post</h1>
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

              <input 
								className={`${styles.inputItem} input`} 
								type="password" 
								placeholder="Confirm Password" 
							/>

							<button className="button is-light">
								Sign up
							</button>
              <div className={styles.msg}>
								Already have an account? 
							</div>
              <button 
                className="button is-light"
                openLogin={openLogin}
                onClick={e => {
									e.preventDefault()
									openLogin()
								}}
              >
								Login 
							</button>
						</form>
					</div>
				</div>
			</div>
			<button 
				className="modal-close is-large" 
				aria-label="close"
				onClick={e => {
          e.preventDefault()
          openLogin()
        }}>
			</button>
		</div>
	);
}