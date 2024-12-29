import { useParams } from 'react-router-dom';
import { TextInput, Field } from '@strapi/design-system';
import useFetch from '../services/useFetch';
import { CmpAttrs } from '../models/CmpAttrs';
import utl from '../utils/utl';
import { useMemo } from 'react';
import { Grid } from '@strapi/design-system';

export default function DynamicField(attrs: any) {
    const { error, hint, label, attribute } = attrs as CmpAttrs;
    const { id } = useParams();
    const msgNotfound = "Loading external data...";

    const url = useMemo(() => (attribute?.options?.fetch?.url || "").replace(new RegExp(":id", 'g'), id || "-"), [attribute?.options?.fetch?.url, id]);
    const resMap = useMemo(() => utl.json.decode(attribute?.options?.fetch?.map, { [label as string]: label }), [attribute?.options?.fetch?.map]);
    const cols = useMemo(() => (Math.trunc(12 / (attribute?.options?.ui?.col || 1))), [attribute?.options?.ui?.col]);

    const defaults = useMemo(() => {
        let res = utl.json.decode(attribute?.options?.fetch?.defaults, null);
        return typeof res === "object" ? res : { [label as string]: attribute?.options?.fetch?.defaults }
    }, [attribute?.options?.fetch?.defaults]);

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
    const { data, error: errorApi, isLoading } = url ? useFetch<any>(url, options, [url, options]) : { data: defaults, isLoading: false, error: null };

    if (isLoading) return <p>{msgNotfound}</p>;
    if (errorApi) return <p>Error: {errorApi.message}</p>;

    console.log({ cols, data, resMap });
    return (
        <div>
            <Grid.Root>
                {Object.keys(resMap).map((key: string, index: number) => (
                    <Grid.Item col={cols} s={12} marginBottom={4} marginRight={2} key={`${key}_${index}`}>
                        <Field.Root
                            id="with_field"
                            error={error}
                            hint={hint}
                            width="100%"
                        >
                            <Field.Label>{key || "Value"}</Field.Label>
                            <TextInput
                                placeholder="This is a content placeholder"
                                type="text"
                                defaultValue={utl.get(data, resMap[key]) ?? msgNotfound}
                                disabled={disabled}
                            />
                            <Field.Error />
                            <Field.Hint />
                        </Field.Root>
                    </Grid.Item>
                ))}
            </Grid.Root>
        </div>
    );
}
