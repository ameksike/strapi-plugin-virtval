import { getTranslation } from "../utils/getTranslation";
import * as yup from 'yup';
import utl from '../utils/utl';

export function getConfig() {
    return {
        base: [
            {
                name: 'options.fetch.url' as any,
                type: 'string' as any,
                defaultValue: '/api/test/:id',
                intlLabel: {
                    id: getTranslation('basic.source-url-label'),
                    defaultMessage: 'Fetch URL',
                },
                description: {
                    id: getTranslation('basic.options.fetch.url.des'),
                    defaultMessage: 'The string "{:id}" in the url will be replaced with the Document ID',
                }
            },
            {
                name: 'options.fetch.map' as any,
                type: 'textarea' as any,
                intlLabel: {
                    id: getTranslation('basic.source-url-map'),
                    defaultMessage: 'Response mapping',
                },
                defaultValue: '{}',
                description: {
                    id: getTranslation('basic.options.fetch.url.des'),
                    defaultMessage: 'Create a JSON to define the response mapping options. By default, it will try to use root with the same property name. Ex: { <ATTRIBUTE_NAME> : <RESPONSE_PATH> }',
                }
            },
            {
                name: 'options.fetch.defaults' as any,
                type: 'textarea' as any,
                intlLabel: {
                    id: getTranslation('basic.source-url-defaults'),
                    defaultMessage: 'Default value',
                },
                defaultValue: '',
                description: {
                    id: getTranslation('basic.options.fetch.defaults.des'),
                    defaultMessage: "Map of default values ​​in JSON format, especially if you don't define the URL or if you want to set static values ​​without requesting anything from the server",
                }
            }
        ],
        advanced: [
            {
                sectionTitle: {
                    id: getTranslation('basic.section-label-source'),
                    defaultMessage: 'Fetch data options'
                },
                items: [
                    {
                        name: 'options.fetch.body' as any,
                        type: 'textarea' as any,
                        defaultValue: '{}',
                        intlLabel: {
                            id: getTranslation('basic.fetch-body-label'),
                            defaultMessage: 'Fetch options request body',
                        },
                        description: {
                            id: getTranslation('basic.fetch-body-note'),
                            defaultMessage: 'Custom fetch options request body in JSON format.',
                        }
                    },
                    {
                        name: 'options.fetch.headers' as any,
                        type: 'textarea' as any,
                        intlLabel: {
                            id: getTranslation('basic.fetch-headers-label'),
                            defaultMessage: 'Fetch options request custom headers',
                        },
                        defaultValue: '{}',
                        description: {
                            id: getTranslation('basic.fetch-headers-note'),
                            defaultMessage: 'Custom fetch options request headers in JSON format.',
                        }
                    },
                    {
                        name: 'options.fetch.method' as any,
                        type: 'select',
                        defaultValue: 'GET',
                        intlLabel: {
                            id: getTranslation('basic.fetch-method-label'),
                            defaultMessage: 'HTTP method',
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
                        name: 'options.ui.editable' as any,
                        type: 'checkbox',
                        intlLabel: {
                            id: getTranslation('basic.editable'),
                            defaultMessage: 'Editable field',
                        },
                        description: {
                            id: 'form.attribute.item.editable.description',
                            defaultMessage: "You won't be able to edit an entry if this field is empty",
                        },
                        defaultValue: false
                    },
                ]
            }
        ],
        validator: () => ({
            fetch: yup.object().shape({
                url: yup.string().optional(),
                method: yup.string().oneOf(['GET', 'POST', 'PUT']).required(),
                body: yup.string().optional().test('is-json', 'The field must be a valid JSON Format', (value) => utl.json.isValid(value as string)),
                headers: yup.string().optional().test('is-json', 'The field must be a valid JSON Format', (value) => utl.json.isValid(value as string)),
                defaults: yup.string().optional().test('is-json', 'The field must be a valid JSON Format', (value) => utl.json.isValid(value as string)),
                map: yup.string().optional().test('is-json', 'The field must be a valid JSON Format', (value) => utl.json.isValid(value as string)),
            })
        }),
    }
}