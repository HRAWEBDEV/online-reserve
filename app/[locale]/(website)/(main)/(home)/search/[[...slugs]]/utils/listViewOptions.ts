const listViewOptions = ['list', 'grid'] as const;

type ListViewOptions = (typeof listViewOptions)[number];

export { type ListViewOptions, listViewOptions };
