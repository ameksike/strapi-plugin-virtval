export interface ObjectType {
    [key: string]: ObjectType | unknown;
}

export default {
    json: {
        encode(data: Object | undefined | null, defaults: string | undefined = "") {
            try {
                if (!data) return defaults;
                return JSON.stringify(data);
            }
            catch (_) {
                return defaults;
            }
        },
        decode(data: string | undefined | null, defaults: Object | undefined | null = {}) {
            try {
                if (!data) return defaults;
                return JSON.parse(data);
            }
            catch (_) {
                return defaults;
            }

        },
        isValid(value: string) {
            if (!value) return true;
            try {
                JSON.parse(value);
                return true;
            } catch (error) {
                return false;
            }
        }
    },
    get<T>(target: ObjectType, path: string): T | undefined {
        return path.split('.').reduce((obj: any, key) => {
            if (obj && (Object.hasOwn(obj, key) || obj[key])) {
                return obj[key as keyof ObjectType];
            }
            return undefined;
        }, target as ObjectType);
    },
    /**
     * Retrieves a value from a nested object based on the provided path.
     * Supports array indexing in the path (e.g., "arrayField.0.property").
     * @param target The object to retrieve the value from.
     * @param path The path string to the desired value (e.g., "field1.field2.0.field3").
     * @returns The value at the specified path, or undefined if the path is invalid.
     */
    getFrom<T>(target: ObjectType, path: string): T | undefined {
        if (!path || !target) return undefined;

        const keys = path.split('.');
        return keys.reduce((current: any, key: string) => {
            if (current == null) return undefined;
            const arrayIndexMatch = key.match(/^\d+$/);
            if (Array.isArray(current) && arrayIndexMatch) {
                const index = parseInt(key, 10);
                return current[index];
            }
            return Object.hasOwn(current, key) ? current[key] : undefined;
        }, target as ObjectType) as T;
    }
}