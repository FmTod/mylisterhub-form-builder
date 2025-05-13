import { defaultsDeep } from 'lodash-es';

const defaultGridOptions = [
    { value: 12, label: '100%' },
    { value: 11, label: '90%' },
    { value: 10, label: '80%' },
    { value: 8, label: '70%' },
    { value: 7, label: '60%' },
    { value: 6, label: '50%' },
    { value: 4, label: '40%' },
    { value: 3, label: '30%' },
    { value: 2, label: '20%' },
    { value: 1, label: '10%' },
];

export function useBaseConfig(overrides: Record<string, any> = {}) {
    // eslint-disable-next-line ts/no-unsafe-return
    return defaultsDeep({}, overrides, {
        name: {
            type: 'hidden',
        },
        label: {
            type: 'text',
            label: 'Label',
        },
        description: {
            type: 'text',
            label: 'Description',
        },
        size: {
            type: 'select',
            label: 'Size',
            items: [
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
            ],
        },
        columns: {
            type: 'select',
            label: 'Width',
            items: defaultGridOptions,
        },
    });
}

export function useSelectConfig(overrides: Record<string, any> = {}) {
    // eslint-disable-next-line ts/no-unsafe-return
    return defaultsDeep({}, useBaseConfig(overrides), {
        items: {
            type: 'list',
            label: 'Options',
            element: {
                type: 'object',
                schema: {
                    label: {
                        type: 'text',
                        label: 'Label',
                        columns: 6,
                    },
                    value: {
                        type: 'text',
                        label: 'Value',
                        columns: 6,
                    },
                },
            },
        },
    });
}
