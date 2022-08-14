<template>
	<form @submit="onSubmit">
		<h2>Create an new library</h2>
		<label>Name::: <input v-model="name" /></label>
		<label>Root path: <input v-model="path" /></label>
		<button>Create</button>
	</form>
</template>

<script>
import { inject, ref } from 'vue'
import { ctxKey } from '../context'
export default {
	setup() {
		const ctx = inject(ctxKey)

		const path = ref('')
		const name = ref('')

		async function onSubmit(e) {
			e.preventDefault()
			await ctx.state.collections.createLibrary(path.value, name.value)
			path.value = ''
			name.value = ''
		}

		return { path, name, onSubmit }
	},
}
</script>

<style></style>
