import { SettingsPageTemplate } from "../components/SettingsTemplates"
import deleteIcon from '../assets/delete.svg'
import editIcon from '../assets/edit.svg'
import './Settings.css'

export const ManageMovies = () => {
    return (
        <SettingsPageTemplate title="Manage movies">
            <table className="Settings-table">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Added by</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
                        <td>vsl700</td>
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
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td>
                        <td>george1514</td>
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