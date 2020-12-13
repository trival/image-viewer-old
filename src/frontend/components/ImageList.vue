<template>
	<div>
		<section
			v-for="(medias, directory) in directories"
			:key="directory"
			class="directory-section"
		>
			<h3 :id="directory">{{ directory }}</h3>
			<div v-for="image in medias" :key="image.id" class="image-container">
				<img :data-src="image.fullPath" class="lzy_img" />
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
import { defineComponent, inject, ref, watchEffect } from 'vue'
import { Context, ctxKey } from '../context'

export default defineComponent({
	setup: () => {
		const ctx = inject(ctxKey)
		console.log('ImageList ctx', ctx)

		const path = ref('')

		watchEffect(() => {
			console.log('watching: ', ctx && ctx.state.media.directories.value)
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
			directories: ctx ? ctx.state.media.directories : [],
		}
	},
})
</script>
