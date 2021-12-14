import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import Cookie from 'js-cookie'
import styles from '../styles/login.module.css'


const SIGN_UP = gql`
  mutation UserSignUp($email: String!, $name: String!, $password: String! ) {
    registerUser(email: $email, name: $name, password: $password) {
      _id
      name
      email
    }
  }
`;

const INITAL_STATE = {
  name: '',
  email: '',
  password: '',
}

export default function Signup({ showModal = false, closeModal, openLogin }) {
  const [signupUserFunc, { data, loading, error }] = useMutation(SIGN_UP)
	const [state, setState] = useState(INITAL_STATE)

	useEffect(() => {
    if(data) {
      alert('Signup Complete')
			closeModal()
    }
  }, [data])

	const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

	const doSignup = e => {
    e.preventDefault(); 
    Cookie.remove('fauna-session')
		console.log(state)
    signupUserFunc({
      variables: {
        ...state,
      },
    }).catch(err => {
			console.log(err)
		})
  }

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
								placeholder="User Name" 
								onChange={handleChange}
								name="name"
								value={state.name}
							/>
							<input 
								className={`${styles.inputItem} input`} 
								type="text" 
								placeholder="Email" 
								onChange={handleChange}
								name="email"
								value={state.email}
							/>
						
							<input 
								className={`${styles.inputItem} input`} 
								type="password" 
								placeholder="Password" 
								onChange={handleChange}
								name='password'
								value={state.password}
							/>

              <input 
								className={`${styles.inputItem} input`} 
								type="password"
								name="confirmPassword"
								placeholder="Confirm Password" 
								onChange={handleChange}
							/>

							<button className="button is-light" onClick={doSignup}>
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