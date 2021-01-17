<template>
	<div class="text-gray-900 antialiased text-center">
		<header class="flex bg-gray-100">
			<button
				@click="leftDrawerOpen = !leftDrawerOpen"
				aria-label="Menu"
				class="w-7 rounded-full m-2 bg-red-500 text-white text-xl font-bold"
			>
				=
			</button>

			<h1 class="p-2 text-lg font-bold">Image Viewer</h1>
		</header>

		<div class="flex">
			<nav v-if="leftDrawerOpen" class="bg-blue-100 p-2 text-left w-96">
				<section>
					<h2>Directories</h2>
					<ul>
						<li v-for="directory in directories" :key="directory">
							<a :href="'#' + directory">
								{{ directory }}
							</a>
						</li>
					</ul>
				</section>
				<LibraryNav />
			</nav>
			<main v-if="displayState === AppDisplayState.ImageList">
				<ImageList />
			</main>
			<main v-if="displayState === AppDisplayState.LibraryForm">
				<LibraryForm />
			</main>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import ImageList from './components/ImageList.vue'
import LibraryNav from './components/LibraryNav.vue'
import LibraryForm from './components/LibraryForm.vue'
import { Context, ctxKey } from './context'
import { AppDisplayState } from './state/app'

export default defineComponent({
	name: 'RootApp',

	components: {
		ImageList,
		LibraryNav,
		LibraryForm,
	},

	setup() {
		const ctx = inject(ctxKey)
		console.log('App ctx', ctx)
		const leftDrawerOpen = ref(false)
		const directories = ctx ? ctx.state.media.directories : []
		const displayState = ctx
			? ctx.state.app.displayState
			: AppDisplayState.ImageList

		return {
			leftDrawerOpen,
			directories,
			displayState,
			AppDisplayState,
		}
	},
})
</script>
