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
				<button @click="refresh(library.id)">refresh</button>
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

		const refresh = (id: ID) => {
			ctx?.state.collections // TODO: create refresh api
		}

		return {
			libraries,
			onLibrarySelect,
			addLibrary,
			refresh,
		}
	},
})
</script>

<style></style>
