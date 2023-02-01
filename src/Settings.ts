export interface Settings {
    viewsDirectory: string;
    outDirectory: string;
    locales: string[];
    defaultLocale: string;
    title: string,
    profile: {
        name: string;
        baselines?: string[];
    },
    about: {
        title: string;
        content: string;
        avatar?: string;
    },
    projects: {
        title: string,
        items: SettingsProjectItem[]
    }
    sections: string[]
}

interface SettingsProjectItem {
    title: string;
    description: string;
    skills?: string[];
    url?: string;
    img?: string;
}