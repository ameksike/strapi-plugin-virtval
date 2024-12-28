import { useParams } from 'react-router-dom';
import { TextInput, Field } from '@strapi/design-system';
import useFetch from '../services/useFetch';
import { CmpAttrs } from '../models/CmpAttrs';
import utl from '../utils/utl';

export default function DynamicField(attrs: any) {
    const { error, hint, label, attribute } = attrs as CmpAttrs;
    const { id } = useParams();
    
    const map = utl.json.decode(attribute?.options?.fetch?.map, { [label as string]: label });
    const body = utl.json.decode(attribute?.options?.fetch?.body, undefined);
    const method = attribute?.options?.fetch?.method || "GET";
    const headers = utl.json.decode(attribute?.options?.fetch?.headers, undefined);
    const url = (attribute?.options?.fetch?.url || "").replace(new RegExp(":id", 'g'), id || "-");
    const disabled = !attribute?.options?.ui?.editable;

    if (!url) return <p>Loading...</p>;

    const { data, error: errorApi, isLoading } = useFetch<any>(url, { headers, method });

    console.log(">>>>>> NEW >>>>>>>>>>>>>>>>>>>", { url, map, data, body, headers, method });

    if (isLoading) return <p>Loading...</p>;
    if (errorApi) return <p>Error: {errorApi.message}</p>;

    return (
        <div>
            {Object.keys(map).map((key: string) => (
                <Field.Root
                    id="with_field"
                    error={error}
                    hint={hint}
                    key={key}
                >
                    <Field.Label>{label || "Value"}</Field.Label>
                    <TextInput
                        placeholder="This is a content placeholder"
                        size="M"
                        type="text"
                        defaultValue={utl.get(data, map[key])}
                        disabled={disabled}
                    />
                    <Field.Error />
                    <Field.Hint />
                </Field.Root >
            ))}
        </div>
    );
};