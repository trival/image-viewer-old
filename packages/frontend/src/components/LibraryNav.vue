<template>
	<section>
		<h2 class="font-bold text-lg">Libraries</h2>
		<ul>
			<li v-for="library in libraries" :key="library.id" class="flex">
				<a
					href="#"
					@click="onLibrarySelect(library.id)"
					class="p-4 w-72 left-ellipsis"
					:title="library.rootPath"
				>
					{{ library.name }}
					<br />
					<small class="block truncate">{{ library.rootPath }}</small>
				</a>
				<button @click="refresh(library.id)" class="btn">refresh</button>
			</li>
		</ul>
		<button @click="addLibrary()" class="btn">Add a Library</button>
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

<style scoped>
.left-ellipsis {
	direction: rtl;
}
.btn {
	@apply p-2 my-4 bg-white font-bold rounded-lg;
}
</style>
