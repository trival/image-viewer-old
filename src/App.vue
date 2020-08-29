<template>
	<div>
		<header>
			<button @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
				=
			</button>

			<div>Image Viewer</div>
		</header>

		<nav v-if="leftDrawerOpen">
			<h3>Directories</h3>
			<ul>
				<li v-for="directory in directories" :key="directory">
					<a :href="'#' + directory">
						{{ directory }}
					</a>
				</li>
			</ul>
		</nav>
		<main>
			<ImageList />
		</main>
	</div>
</template>

<script lang="ts">
import { modules } from './lib'
import { defineComponent, ref } from 'vue'
import ImageList from './components/ImageList.vue'

export default defineComponent({
	name: 'MyLayout',

	components: {
		ImageList,
	},

	setup() {
		const leftDrawerOpen = ref(false)

		return {
			leftDrawerOpen,
			directories: modules.images.shortDirectories,
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
