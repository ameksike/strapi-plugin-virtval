import { getTranslation } from "../utils/getTranslation";

export function getConfig() {
    return {
        base: [
            {
                sectionTitle: {
                    // Add a "Format" settings section
                    id: getTranslation('basic.section-label-source'),
                    defaultMessage: 'Options fetching configuration'
                },
                items: [
                    {
                        name: 'options.fetch.url' as any,
                        type: 'string' as any,
                        intlLabel: {
                            id: getTranslation('basic.source-url-label'),
                            defaultMessage: 'Fetch options url',
                        },
                        description: 'The string "{q}" in the url will be replaced with the search phrase'
                    },
                    {
                        name: 'options.fetch.method' as any,
                        type: 'select',
                        defaultValue: 'GET',
                        intlLabel: {
                            id: getTranslation('basic.fetch-method-label'),
                            defaultMessage: 'Fetch options method',
                        },
                        description: {},
                        options: [
                            {
                                key: 'GET',
                                defaultValue: 'GET',
                                value: 'GET',
                                metadatas: {
                                    intlLabel: {
                                        id: getTranslation('basic.fetch-method-option-get'),
                                        defaultMessage: 'GET',
                                    },
                                },
                            },
                            {
                                key: 'POST',
                                value: 'POST',
                                metadatas: {
                                    intlLabel: {
                                        id: getTranslation('basic.fetch-method-option-post'),
                                        defaultMessage: 'POST',
                                    },
                                },
                            },
                            {
                                key: 'PUT',
                                value: 'PUT',
                                metadatas: {
                                    intlLabel: {
                                        id: getTranslation('basic.fetch-method-option-put'),
                                        defaultMessage: 'PUT',
                                    },
                                },
                            },
                        ],
                    } as any,
                    {
                        name: 'options.fetch.body' as any,
                        type: 'textarea' as any,
                        intlLabel: {
                            id: getTranslation('basic.fetch-body-label'),
                            defaultMessage: 'Fetch options request body',
                        },
                        description: ''
                    },
                    {
                        name: 'options.fetch.headers' as any,
                        type: 'textarea' as any,
                        intlLabel: {
                            id: getTranslation('basic.fetch-headers-label'),
                            defaultMessage: 'Fetch options request custom headers',
                        },
                        description: {
                            id: getTranslation('basic.fetch-headers-note'),
                            defaultMessage: 'Custom fetch options request headers in raw format, one header per line. For example:\nContent-type: application/json',
                        }
                    }
                ]
            }
        ],
        advanced: []
    }
}