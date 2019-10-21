<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					@click="leftDrawerOpen = !leftDrawerOpen"
					icon="menu"
					aria-label="Menu"
				/>

				<q-toolbar-title>
					Quasar App
				</q-toolbar-title>

				<div>foobar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			bordered
			content-class="bg-grey-2"
		>
			<q-list>
				<q-item-label header>Essential Links</q-item-label>
				<q-item
					v-for="directory in directories"
					:key="directory"
					clickable
					tag="a"
					:href="'#' + directory"
				>
					<q-item-section>
						<q-item-label>{{ directory }}</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { createComponent, ref } from '@vue/composition-api'
import { modules } from '../lib'

export default createComponent({
	name: 'MyLayout',

	setup() {
		const leftDrawerOpen = ref(false)

		return {
			leftDrawerOpen,
			directories: modules.images.shortDirectories,
		}
	},
})
</script>
