<template>
	<div>
		<header>
			<button @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
				=
			</button>

			<h1>Image Viewer</h1>
		</header>

		<nav v-if="leftDrawerOpen">
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
		<main v-if="displayState === AppDisplayState.ImageList"><ImageList /></main>
		<main v-if="displayState === AppDisplayState.LibraryForm">
			<LibraryForm />
		</main>
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

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
