export const sizes: Facets[] = [
    {
        label: 'Small',
        form: 'small'
    },
    {
        label: 'Medium',
        form: 'medium'
    },
    {
        label: 'Large',
        form: 'large'
    },
    {
        label: 'X-Large',
        form: 'xLarge'
}
];

export const languages: Facets[] = [
    {
      label: 'English',
      form: 'english',
    },
    {
      label: 'English (US)',
      form: 'englishUS',
    },
    {
      label: 'English (UK)',
      form: 'englishUK',
    },
    {
      label: 'Spanish',
      form: 'spanish'
    },
    {
      label: 'German',
      form: 'german'
    }
];

export interface Facets {
    label: string;
    form: string;
}
