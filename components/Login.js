import { useEffect, useState  } from 'react'
import { useMutation, gql } from '@apollo/client'
import Cookie from 'js-cookie'
import styles from '../styles/login.module.css'


const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String! ) {
    login(
			email: $email,
			password: $password,
		) {
			secret
			email
			userId
		}
  }
`;

export default function Login({ showModal = false, closeModal, openSignup }) {
  const [loginFunc, { data, loading, error }] = useMutation(LOGIN)
	const [state, setState] = useState(null)

	useEffect(() => {
		if(data) {
      console.log(data)
      Cookie.set(
        'fauna-session', 
        JSON.stringify(data.login),
        { expires: data.ttl } // 30 mins from now
      )
			alert('Login Successful')
			closeModal()
    }
	} , [data])

	const loginUser = async (e) => {
		e.preventDefault()
		console.log('HEre')
		loginFunc({
      variables: {
        ...state
      }
    })
		.catch(e => console.log(e))
	}

	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

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
								name='email'
								onChange={handleChange}
							/>
						
							<input 
								className={`${styles.inputItem} input`} 
								type="password" 
								placeholder="Password"
								name='password'
								onChange={handleChange}
							/>

							<button className="button is-light" onClick={loginUser}>
								Login
							</button>
							<div className={styles.msg}>
								Create an account to get started
							</div>
							<button 
								className={`${styles.signupBtn} button is-light`}
								onClick={e => {
									e.preventDefault()
									openSignup()
								}}
							>
								Sign up
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