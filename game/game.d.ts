declare namespace Game {
	type AnimationState = "idle" | "running" | "ascending" | "falling" | "stunned"

	interface BuildFrameDataOptions {
		name: AnimationState
		skip?: number
		length: number
		row: number
		offset: {
			x: number
			y: number
		}
		step: {
			x: number
			y: number
		}
		w: number
		h: number
	}
}
