export function buildCharacterAtlasData(options: Game.BuildFrameDataOptions) {
	const entries = Array.from({ length: options.length }, (_, i) => [
		`${options.name}${i}`,
		{
			frame: {
				x: options.offset.x + options.step.x * (i + (options.skip || 0)),
				y: options.offset.y + options.step.y * options.row,
				w: options.w,
				h: options.h
			}
		}
	])

	const frames = Object.fromEntries(entries)

	return { frames, animations: { [options.name]: Object.keys(frames) } }
}
