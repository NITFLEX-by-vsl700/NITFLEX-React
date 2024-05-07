import { SettingSection, SettingsPageTemplate } from "../components/SettingsTemplates"

export const ProfileSettings = () => {
    return (
        <SettingsPageTemplate title="Profile Settings" additionalInfo="vsl700">
            <SettingSection title="Device sessions">
                <input />
                <input />
            </SettingSection>
            <SettingSection title="Settings" separatorLine>
                <input />
            </SettingSection>
        </SettingsPageTemplate>
    )
}