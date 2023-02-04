export interface Settings {
    // Array of locales, ISO. Ex: ["us", "es", "fr"]
    locales: string[];

    // Locale for the index.html file
    defaultLocale: string;

    // Which flag to use to link to this locale (leave blank if only one locale)
    flag?: string;

    // <title> of the page
    title: string,

    // <meta type="description"> of the page
    meta_description?: string;

    profile?: {
        // Right in the splash screen center
        title: string;

        // A list of the main things you can do
        baselines?: string[];
    },
    about?: {
        // "About me" title
        title: string;

        // A description of yourself
        content: string;

        // <img src> relative to ./assets/ for your portrait
        avatar?: string;
    },
    projects?: {
        // "Projects" title
        title: string,

        // See below
        items: SettingsProjectItem[]
    },
    skills?: {
        // "Skills" title
        title: string,

        // See below
        categories: SettingsSkillCategory[]
    },
    contact?: {
        // "Contact" title
        title: string,
        mail: {
            // Your mail address
            "address": string,

            // true to obfuscate your email. Nothing fancy, can block some spammers though
            "obfuscate": boolean,

            // Sentence to display in the contact section. {{mail}} will be replace by a mailto: link to your email address
            "phrasing": string
        },

        // See below
        social: SettingsContactSocial[]
    },

    // A list of sections you wish to display. Don't want the "contact" section ? Remove it from here
    sections: string[],
}

// Each of these is a project your worked on
interface SettingsProjectItem {
    // Self-explanatory
    title: string;

    // Self-explanatory
    description: string;

    // A list of languages, tools or skills you used on this project
    skills?: string[];

    // Will display a link
    url?: string;

    // A screenshot or image for the project
    img?: string;
}

// A skill category
interface SettingsSkillCategory {
    // Ex: "Design", "Frontend development", "Cloud"
    title: string;

    // List of skills
    items: string[];
}

// Social media
interface SettingsContactSocial {
    // Link to your social media
    url: string;

    // Will display an icon from https://fontawesome.com/v6/search?o=r&m=free&f=brands
    // Using "twitter" will display: https://fontawesome.com/v6/icons/twitter?s=&f=brands
    type: string;
}