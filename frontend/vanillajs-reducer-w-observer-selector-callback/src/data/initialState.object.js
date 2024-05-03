const initialState = {
    items: {
        qw: {
            title: 'Home',
            url: '/',
            active: false,
            level: 0,
            submenu: {
                asd: {
                    title: 'Private Area',
                    url: '/private-area',
                    active: false,
                    level: 1,
                    submenu: {
                        asdf: {
                            title: 'Consulting',
                            url: '/private-area/consulting',
                            active: false,
                            level: 2,
                            submenu: {},
                        },
                        zxcv: {
                            title: 'Mortages',
                            url: '/private-area/mortages',
                            active: false,
                            level: 2,
                            submenu: {
                                plmna: {
                                    title: 'Mortages 1',
                                    url: '/private-area/mortages/mortages-1',
                                    active: false,
                                    level: 3,
                                    submenu: {},
                                },
                                okija: {
                                    title: 'Mortages 2',
                                    url: '/private-area/mortages/mortages-2',
                                    active: false,
                                    level: 3,
                                    submenu: {},
                                },
                                ujhya: {
                                    title: 'Mortages 3',
                                    url: '/private-area/mortages/mortages-3',
                                    active: false,
                                    level: 3,
                                    submenu: {},
                                },
                                ikjua: {
                                    title: 'Mortages 4',
                                    url: '/private-area/mortages/mortages-4',
                                    active: false,
                                    level: 3,
                                    submenu: {},
                                },
                            },
                        },
                        qazw: {
                            title: 'Investments',
                            url: '/private-area/investments',
                            active: false,
                            level: 2,
                            submenu: {},
                        },
                        sxed: {
                            title: 'Insurance',
                            url: '/private-area/insurance',
                            active: false,
                            level: 2,
                            submenu: {},
                        },
                        qsxe: {
                            title: 'Retirement',
                            url: '/private-area/retirement',
                            active: false,
                            level: 2,
                            submenu: {},
                        },
                    },
                },
                zxc: {
                    title: 'Client Area',
                    url: '/client-area',
                    active: false,
                    level: 1,
                    submenu: [],
                },
                rty: {
                    title: 'About Us',
                    url: '/about-us',
                    active: false,
                    level: 1,
                    submenu: [],
                },
                fgh: {
                    title: 'Tools and Resources',
                    url: '/tools-and-resources',
                    active: false,
                    level: 1,
                    submenu: [],
                },
                vbn: {
                    title: 'Knowledge Base',
                    url: '/knowledge-base',
                    active: false,
                    level: 1,
                    submenu: [],
                },
            },
        },
        selected: null,
    },
};

export default initialState;
