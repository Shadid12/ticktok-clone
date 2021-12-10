
export default function Login() {
	return (
		<div className={styles.container}>
			<form className={styles.loginForm}>
				<input type="text" name="name" placeholder="email"/>
				<input type="text" name="name" placeholder="password"/>
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}