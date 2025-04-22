<template>
    <div class="container-fluid h-100 overflow-hidden">
        <div id="formBuilder" class="row h-100 overflow-hidden">
            <div
                v-if="!preview"
                class="col-3 h-100 d-flex flex-column overflow-hidden align-self-start grey lighten-3"
                style="max-width: 260px;"
            >
                <div class="d-flex flex-column flex-grow-1 overflow-hidden">
                    <h6 class="text-center bg-white my-2 p-2">
                        Form Elements
                    </h6>
                    <div class="form-inputs">
                        <div
                            v-for="(builderElement, index) in builderElements"
                            :key="index"
                            class="row gx-2 align-items-center bg-white rounded border-1 mx-0 my-2 shadow-sm"
                        >
                            <div class="col-auto d-flex align-items-center py-2 pr-1">
                                <iconify-icon :icon="builderElement.icon" />
                            </div>
                            <div class="col flex-column-center py-2 pl-1">
                                <h6 class="mb-0">
                                    {{ builderElement.label }}
                                </h6>
                            </div>
                            <div class="col-auto py-2 d-flex align-items-center">
                                <MdbBtn v-if="builderElement.element.component === 'GroupElement'" size="sm">
                                    <iconify-icon icon="fa-solid:plus" />
                                </MdbBtn>
                                <MdbBtn v-else size="sm" @click="addElement(builderElement.element)">
                                    <iconify-icon icon="fa-solid:plus" />
                                </MdbBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col px-0 h-100 form-elements overflow-hidden">
                <div v-if="loading" class="form-loading-container">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div class="mx-auto h-100 d-flex flex-column overflow-hidden" style="max-width: 1200px;">
                    <div class="actions row bg-white flex-grow-0 px-3">
                        <div class="col my-2">
                            <MdbBtnGroup>
                                <MdbBtn class="my-0 ml-0" @click="previewToggle()">
                                    {{ preview ? 'Editor' : 'Preview' }}
                                </MdbBtn>
                            </MdbBtnGroup>
                        </div>
                        <div class="col-auto my-2">
                            <MdbBtn
                                v-if="!preview && history.length > 0"
                                class="m-0"
                                @click="undo()"
                            >
                                Undo
                            </MdbBtn>
                            <MdbBtn
                                v-if="!preview && history.length > 0"
                                class="m-0"
                                @click="redo()"
                            >
                                Redo
                            </MdbBtn>
                        </div>
                    </div>

                    <div v-if="preview" class="preview p-2 flex-grow-1 px-3 overflow-y-auto">
                        <!-- <Vueform v-if="!preview" :schema="schema" /> -->
                    </div>
                    <div v-else class="form-builder nested-sortable d-flex flex-row flex-wrap flex-grow-1 align-content-start justify-content-start px-3 overflow-y-auto">
                        <Vueform>
                            <BuilderElement
                                v-for="(element, index) in formElements"
                                :key="index"
                                :element="element"
                                @select="selectedElement = $event"
                            />
                        </Vueform>
                    </div>
                </div>
            </div>

            <div v-if="!preview" class="col-3 px-0 h-100 align-self-end" style="max-width: 380px;">
                <div class="form-config grey lighten-3 h-100 px-2 overflow-hidden">
                    <h6 class="text-center bg-white my-2 p-2">
                        Form Configuration
                    </h6>

                    <Vueform v-if="selectedElement?.configSchema" :schema="selectedElement.configSchema" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BuilderElement as FormBuilderElement, FormElement, FormElementBlueprint } from '@/types';
import { useDebouncedRefHistory, useToggle } from '@vueuse/core';
import MdbBtn from 'mdb4-vue/lib/components/mdbBtn';
import MdbBtnGroup from 'mdb4-vue/lib/components/mdbBtnGroup';
import { ref } from 'vue';
import BuilderElement from '@/components/BuilderElement.vue';

const [preview, previewToggle] = useToggle(false);
const loading = ref<boolean>(false);

const builderElements = ref<FormBuilderElement[]>([
    {
        label: 'Text',
        icon: 'fa-solid:font',
        element: {
            component: 'TextElement',
            props: {
                type: 'text',
                label: 'Text',
            },
            configSchema: {
                label: {
                    type: 'text',
                    label: 'Label',
                },
            },
        },
    },
    {
        label: 'Textarea',
        icon: 'fa-solid:font',
        element: {
            component: 'TextareaElement',
            props: {
                type: 'textarea',
                label: 'Text Area',
            },
        },
    },
    {
        label: 'Select',
        icon: 'fa-solid:chevron-down',
        element: {
            component: 'SelectElement',
            props: {
                type: 'select',
                label: 'Select',
                items: [
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                ],
            },
        },
    },
]);

const formElements = ref<FormElement[]>([]);
const selectedElement = ref<FormElement>();

function newSlug(initial: string) {
    if (!formElements.value.some(({ props }) => props.name === initial)) {
        return initial;
    }

    let i = 1;

    while (formElements.value.some(({ props }) => props.name === `${initial}${i}`)) {
        i++;
    }

    return `${initial}${i}`;
}

function addElement(element: FormElementBlueprint, name?: string) {
    formElements.value.push({
        ...element,
        props: {
            ...element.props,
            name: newSlug(name ?? element.props.label),
        },
    });
}

const { history, undo, redo } = useDebouncedRefHistory(formElements, { deep: true, debounce: 1000 });
</script>

<style scoped>

</style>
