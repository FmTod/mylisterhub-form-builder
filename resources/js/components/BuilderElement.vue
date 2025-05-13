<template>
    <Component
        v-bind="element.props"
        :is="element.component"
        :class="{ selected }"
        class="builder-element"
        @click="emits('select', element)"
    >
        <template #after>
            <div class="element-overlay" @click.prevent="emits('select', element)" />
            <MdbBtn class="btn-delete z-depth-0" color="danger" size="sm" @click.prevent="$emit('remove', element)">
                <iconify-icon icon="fa-solid:trash" />
            </MdbBtn>
        </template>
    </Component>
</template>

<script setup lang="ts">
import type { FormElement } from '@/types';
import MdbBtn from 'mdb4-vue/lib/components/mdbBtn';

const props = withDefaults(defineProps<{
    element: FormElement;
    selected?: boolean;
}>(), {
    selected: false,
});

const emits = defineEmits<{
    (event: 'select', element: FormElement): void;
    (event: 'remove', element: FormElement): void;
}>();

console.log('BuilderElement', props.element);
</script>

<style scoped>
.element-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
}

.builder-element {
    position: relative;
    padding: 5px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;
}

.btn-delete {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 2;
}

.builder-element:hover {
    background-color: rgba(0, 123, 255, 0.1);
    border: 1px solid #007bff;
}

.builder-element:hover .element-overlay {
    background-color: rgba(0, 123, 255, 0.3);
}

.builder-element:hover .btn-delete {
    display: block;
}

.builder-element.selected {
    border: 1px solid #007bff;
}

.builder-element.selected .element-overlay {
    background-color: rgba(0, 123, 255, 0.2);
}
</style>
