import type { StrapiApp } from '@strapi/strapi/admin';
import type { Core } from '@strapi/strapi';
import { getTranslation } from '../utils/getTranslation';
import { PluginIcon } from '../components/PluginIcon';
import { PLUGIN_ID } from '../pluginId';
import { getConfig } from './config';

export function registerApp(app: StrapiApp, component: string = PLUGIN_ID): void {
    app.customFields.register({
        name: component,
        pluginId: PLUGIN_ID,
        type: 'string',
        intlLabel: {
            id: getTranslation(PLUGIN_ID + '.label'),
            defaultMessage: 'Virtual Value',
        },
        intlDescription: {
            id: getTranslation(PLUGIN_ID + '.description'),
            defaultMessage: 'Virtual field value with remote option for data fetching',
        },
        icon: PluginIcon,
        components: {
            Input: async () => import(/* webpackChunkName: "DynamicField" */ '../components/DynamicField'),
        },
        options: getConfig()
    });
}

export function registerServer(strapi: Core.Strapi, component: string = PLUGIN_ID): void {
    strapi.customFields.register({
        name: component,
        plugin: PLUGIN_ID,
        type: 'string',
    });
}

export default {
    registerServer,
    registerApp,
    name: PLUGIN_ID
}