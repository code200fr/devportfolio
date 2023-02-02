export interface Settings {
    viewsDirectory: string;
    outDirectory: string;
    locales: string[];
    defaultLocale: string;
    title: string,
    meta_description?: string;
    profile?: {
        name: string;
        baselines?: string[];
    },
    about?: {
        title: string;
        content: string;
        avatar?: string;
    },
    projects?: {
        title: string,
        items: SettingsProjectItem[]
    },
    skills?: {
        title: string,
        items: SettingsSkillItem[]
    },
    contact?: {
        title: string,
        mail: {
            "address": string,
            "obfuscate": boolean,
            "phrasing": string
        },
        social: SettingsContactSocial[]
    },
    sections: string[],
}

interface SettingsProjectItem {
    title: string;
    description: string;
    skills?: string[];
    url?: string;
    img?: string;
}

interface SettingsSkillItem {
    name: string;
    duration?: string;
    percent: number;
}

interface SettingsContactSocial {
    url: string;
    type: string;
}