export interface ElementPropBlueprint {
    type: string;
    label: string;
    [key: string]: any;
}

export interface FormElementBlueprint {
    component: string;
    props: ElementPropBlueprint;
    configSchema?: {
        [key: string]: ElementPropBlueprint;
    };
}

export interface BuilderElement {
    label: string;
    icon: string;
    element: FormElementBlueprint;
}

export interface ElementProps extends ElementPropBlueprint {
    name: string;
}

export interface FormElement extends Omit<FormElementBlueprint, 'props'> {
    props: ElementProps;
}
