import { useParams } from 'react-router-dom';
import { TextInput, Field } from '@strapi/design-system';
import useFetch from '../services/useFetch';
import { CmpAttrs } from '../models/CmpAttrs';
import utl from '../utils/utl';
import { useMemo } from 'react';

export default function DynamicField(attrs: any) {
    const { error, hint, label, attribute } = attrs as CmpAttrs;
    const { id } = useParams();

    const url = useMemo(() => {
        return (attribute?.options?.fetch?.url || "").replace(new RegExp(":id", 'g'), id || "-");
    }, [attribute?.options?.fetch?.url, id]);

    const resMap = useMemo(() => {
        return utl.json.decode(attribute?.options?.fetch?.map, { [label as string]: label });
    }, [attribute?.options?.fetch?.map]);

    const defaults = useMemo(() => utl.json.decode(
        attribute?.options?.fetch?.defaults,
        { [label as string]: "Loading external data..." }
    ), [attribute?.options?.fetch?.defaults]);

    const options = useMemo(() => ({
        method: attribute?.options?.fetch?.method || "GET",
        headers: utl.json.decode(attribute?.options?.fetch?.headers, undefined),
        body: utl.json.decode(attribute?.options?.fetch?.body, undefined)
    }), [
        attribute?.options?.fetch?.method,
        attribute?.options?.fetch?.headers,
        attribute?.options?.fetch?.body,
    ]);

    const disabled = !attribute?.options?.ui?.editable;
    const { data, error: errorApi, isLoading } = url ? useFetch<any>(url, options, [url, options]) : { data: defaults };

    if (isLoading) return <p>Loading external data...</p>;
    if (errorApi) return <p>Error: {errorApi.message}</p>;

    return (
        <div>
            {Object.keys(resMap).map((key: string) => (
                <Field.Root
                    id="with_field"
                    error={error}
                    hint={hint}
                    key={key}
                >
                    <Field.Label>{key || "Value"}</Field.Label>
                    <TextInput
                        placeholder="This is a content placeholder"
                        size="M"
                        type="text"
                        defaultValue={utl.get(data, resMap[key])}
                        disabled={disabled}
                    />
                    <Field.Error />
                    <Field.Hint />
                </Field.Root>
            ))}
        </div>
    );
}
