import { NoLayout } from "../components/NoLayout"

export const Login = () => {
    return (
        <NoLayout>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" />
                <button className="Submit-button nitflex-button">Login</button>
            </form>
        </NoLayout>
    )
}