import type { PageLoad } from "./$types"

import { init } from "./game"

export const ssr = false

export const load = (async () => {
  const { appView, player } = await init()
  return { title: "Foxy", appView, player }
}) satisfies PageLoad
