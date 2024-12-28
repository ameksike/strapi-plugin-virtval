import { useParams } from 'react-router-dom';
import { TextInput, Field } from '@strapi/design-system';
import useFetch from '../services/useFetch';
import { CmpAttrs } from '../models/CmpAttrs';

interface Response {
    credit: number,
    debit: number,
    balance: number
}

export default function DynamicField(attrs: any) {
    const { error, hint, label } = attrs as CmpAttrs;
    const { id } = useParams();
    const { data, error: errorApi, isLoading, refetch } = useFetch<Response>(
        `/api/transactions/${id}/balance`
    );

    console.log(">>>>>> NEW >>>>>>>>>>>>>>>>>>>", attrs);
    if (isLoading) return <p>Loading...</p>;
    if (errorApi) return <p>Error: {errorApi.message}</p>;

    return (
        <div>
            <Field.Root
                id="with_field"
                error={error}
                hint={hint}
            >
                <Field.Label>{label || "Value"}</Field.Label>
                <TextInput
                    placeholder="This is a content placeholder"
                    size="M"
                    type="text"
                    defaultValue={data?.balance}
                />
                <Field.Error />
                <Field.Hint />
            </Field.Root >
        </div>
    );
};