import { ref } from 'vue'

export enum AppDisplayState {
	ImageList,
	LibraryForm,
}

export function createAppState() {
	const displayState = ref(AppDisplayState.ImageList)

	function setDisplayState(state: AppDisplayState) {
		displayState.value = state
	}

	return {
		displayState,
		setDisplayState,
	}
}
