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
		<main><ImageList :ctx="ctx" /></main>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ImageList from './components/ImageList.vue'
import { Context } from './context'

export default defineComponent({
	name: 'RootApp',

	components: {
		ImageList,
	},

	setup(props: { ctx: Context }) {
		console.log(props)
		// eslint-disable-next-line vue/no-setup-props-destructure
		const { ctx } = props
		const leftDrawerOpen = ref(false)

		return {
			leftDrawerOpen,
			directories: ctx.state.media.directories,
			ctx,
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
