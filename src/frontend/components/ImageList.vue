<template>
	<div>
		<label>
			Path
			<input :value="path" @change="onPathChange" />
		</label>
		<button @click="submitPath">Set path</button>
		<section
			v-for="directory in directories"
			:key="directory.directory"
			class="directory-section"
		>
			<h3 :id="directory.directory">{{ directory.directory }}</h3>
			<div
				v-for="image in directory.images"
				:key="directory.directory + image"
				class="image-container"
			>
				<img :data-src="image" class="lzy_img" />
			</div>
		</section>
	</div>
</template>

<style scoped>
.directory-section {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.directory-section h3 {
	width: 100%;
	padding: 10px;
}

.image-container {
	position: relative;
	width: 230px;
	height: 230px;
	background-color: #f3f3f3;
	margin: 10px;
}
.image-container img {
	object-fit: contain;
	width: 100%;
	height: 100%;
}
</style>

<script lang="ts">
import { modules } from '../../lib/index'
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
	setup: () => {
		const path = ref('')

		function submitPath() {
			modules.images.setPath(path.value)
		}

		const onPathChange = (e: any) => {
			path.value = e.target.value
		}

		watchEffect(() => {
			console.log('watching: ', modules.images.directories.value)
			setTimeout(() => {
				const imageObserver = new IntersectionObserver(
					(entries, imgObserver) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								const lazyImage = entry.target as HTMLImageElement
								console.log('lazy loading ', lazyImage)
								lazyImage.src =
									'local-resource://' + (lazyImage.dataset.src as string)
								lazyImage.classList.remove('lzy_img')
								imgObserver.unobserve(lazyImage)
							}
						})
					},
				)
				const arr = document.querySelectorAll('img.lzy_img')
				arr.forEach((v) => {
					imageObserver.observe(v)
				})
			}, 1000)
		})

		return {
			path,
			submitPath,
			onPathChange,
			directories: modules.images.directories,
		}
	},
})
</script>
