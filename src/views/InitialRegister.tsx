import { NoLayout } from "../components/NoLayout"

export const InitialRegister = () => {
    return (
        <NoLayout>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" />
                <label htmlFor="role">User role:</label>
                <select name="role" id="role" defaultValue="user">
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <label htmlFor="devlimit">Device limit:</label>
                <input type="number" name="devlimit" id="device-limit" min={1} defaultValue={3} />
                <button className="Submit-button nitflex-button">Register</button>
            </form>
        </NoLayout>
    )
}