<template>
    <div class="welcome-name">
        <span v-if="!!name">Welcome: {{name}}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMsal } from '../../infrastructure/composition-api/useMsal';

const { accounts } = useMsal();

console.log(accounts.value[0]);

const name = computed(() => {
    if (accounts.value.length > 0) {
        const name = accounts.value[0].name;
        return name;
    }
    return "";
});
</script>

<style>
.welcome-name {
    color: #fff;
}
</style>
