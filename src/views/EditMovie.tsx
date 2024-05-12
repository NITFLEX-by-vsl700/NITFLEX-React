import { SettingsPageTemplate } from "../components/SettingsTemplates"
import './Settings.css'

export const EditMovie = () => {
    return (
        <SettingsPageTemplate title="Edit movie">
            <div className="Settings-vertical-form">
                <label htmlFor="path">Movie path</label>
                <input type="text" name="path" defaultValue="path/to/movie" />
                <label htmlFor="name">Movie name</label>
                <input type="text" name="name" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                <button className="Settings-save-button nitflex-button">Save settings</button>
            </div>
        </SettingsPageTemplate>
    )
}