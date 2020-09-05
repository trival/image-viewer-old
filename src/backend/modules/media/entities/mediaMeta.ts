export type IImageMeta = Readonly<{
	width: number
	height: number
	date: number
}>

export type IVideoMeta = IImageMeta &
	Readonly<{
		length: number
	}>
