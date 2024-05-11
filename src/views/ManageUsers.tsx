import { SettingsPageTemplate } from "../components/SettingsTemplates"
import deleteIcon from '../assets/delete.svg'
import editIcon from '../assets/edit.svg'
import './Settings.css'

export const ManageUsers = () => {
    return (
        <SettingsPageTemplate title="Manage users">
            <table className="Settings-table">
                <thead>
                    <tr>
                        <th>Device</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>vsl700</td>
                        <td>Owner</td>
                        <td>
                            <button className="Edit-button nitflex-button">
                                <img src={editIcon} alt="" />
                            </button>
                            <button className="Delete-button nitflex-button">
                                <img src={deleteIcon} alt="" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>george1514</td>
                        <td>User</td>
                        <td>
                            <button className="Edit-button nitflex-button">
                                <img src={editIcon} alt="" />
                            </button>
                            <button className="Delete-button nitflex-button">
                                <img src={deleteIcon} alt="" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>simon</td>
                        <td>Admin</td>
                        <td>
                            <button className="Edit-button nitflex-button">
                                <img src={editIcon} alt="" />
                            </button>
                            <button className="Delete-button nitflex-button">
                                <img src={deleteIcon} alt="" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </SettingsPageTemplate>
    )
}