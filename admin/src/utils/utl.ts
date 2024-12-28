export interface ObjectType {
    [key: string]: ObjectType | unknown;
}

export default {
    json: {
        encode(data: Object | undefined | null, defaults = "") {
            try {
                if (!data) return defaults;
                return JSON.stringify(data);
            }
            catch (_) {
                return defaults;
            }
        },
        decode(data: string | undefined | null, defaults = {}) {
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
            if (obj && Object.hasOwn(obj, key)) {
                return obj[key as keyof ObjectType];
            }
            return undefined;
        }, target as ObjectType);
    }
}