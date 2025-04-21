<template>
    <div @click.prevent="">
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

</style>
