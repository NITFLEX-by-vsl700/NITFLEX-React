import { HorizontalSetting, SettingSection, SettingsPageTemplate } from "../components/SettingsTemplates"
import deleteIcon from '../assets/delete.svg'
import './Settings.css'
import './ProfileSettings.css'

export const ProfileSettings = () => {
    return (
        <SettingsPageTemplate title="Profile Settings" additionalInfo="vsl700">
            <SettingSection title="Device sessions">
                <table className="Settings-table">
                    <tr>
                        <th>Device</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td>Android 12</td>
                        <td>
                            <button className="Delete-button nitflex-button">
                                <img src={deleteIcon} alt="" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Android 12</td>
                        <td>
                            <button className="Delete-button nitflex-button">
                                <img src={deleteIcon} alt="" />
                            </button>
                        </td>
                    </tr>
                </table>
            </SettingSection>
            <SettingSection title="Settings" separatorLine>
                <HorizontalSetting label="Profile state">
                    <input type="radio" name="state" id="state-active" value="active" checked />
                    <label htmlFor="state-active">✔Active</label>
                    <input type="radio" name="state" id="state-banned" value="banned" />
                    <label htmlFor="state-banned">❌Banned</label>
                </HorizontalSetting>
                <HorizontalSetting label="User role">
                    <select name="role" id="role">
                        <option value="owner">Owner</option>
                        <option value="admin" selected>Admin</option>
                        <option value="user">User</option>
                    </select>
                </HorizontalSetting>
                <HorizontalSetting label="Device limit">
                    <input type="number" name="devlimit" id="device-limit" min={1} value={3} />
                </HorizontalSetting>
                <button className="nitflex-button" id="btn-save">Save settings</button>
            </SettingSection>
        </SettingsPageTemplate>
    )
}