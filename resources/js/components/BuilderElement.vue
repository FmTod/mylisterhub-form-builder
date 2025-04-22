<template>
    <div @click.prevent="emits('select', element)">
        <div class="element-overlay" @click.prevent="emits('select', element)" />
        <Component
            :is="element.component"
            v-bind="element.props"
        />
    </div>
</template>

<script setup lang="ts">
import type { FormElement } from '@/types';

defineProps<{
    element: FormElement;
}>();

const emits = defineEmits<{
    (event: 'select', element: FormElement): void;
}>();
</script>

<style scoped>
.element-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
</style>
