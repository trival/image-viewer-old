<template>
	<section>
		<h2>Libraries</h2>
		<ul>
			<li v-for="library in libraries" :key="library.id">
				<a href="#" @click="onLibrarySelect(library.id)">
					{{ library.name }}
					<br />
					<small>{{ library.rootPath }}</small>
				</a>
			</li>
		</ul>
		<button @click="addLibrary()">Add a Library</button>
	</section>
</template>

<script lang="ts">
import { ID } from '@/backend/types'
import { defineComponent, inject, ref } from 'vue'
import { Context, ctxKey } from '../context'
import { AppDisplayState } from '../state/app'

export default defineComponent({
	setup() {
		const ctx = inject(ctxKey)
		const libraries = ctx ? ctx.state.collections.libraries : []
		const onLibrarySelect = (id: ID) => {
			if (ctx) {
				ctx.state.collections.setCurrentLibrary(id)
				ctx.state.app.setDisplayState(AppDisplayState.ImageList)
			}
		}

		const addLibrary = () => {
			ctx?.state.app.setDisplayState(AppDisplayState.LibraryForm)
		}

		return {
			libraries,
			onLibrarySelect,
			addLibrary,
		}
	},
})
</script>

<style></style>
