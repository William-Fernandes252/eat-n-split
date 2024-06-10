import { adventurer } from "@dicebear/collection";
import { type Options, type Style, createAvatar } from "@dicebear/core";
import { useMemo } from "react";

function mergeWithDefaultOptions(options: Partial<Options>): Options {
	return {
		seed: "",
		...options,
	};
}

/**
 * Generate an avatar using the DiceBear Avatar API
 *
 * @param seed The seed to generate the avatar
 * @param style The style to use
 * @param options The generator options
 * @returns The avatar as a data URI
 */
export function useAvatar(
	seed: string,
	style: Style<object> = adventurer,
	options?: Options,
): string {
	return useMemo(
		() =>
			createAvatar(style, {
				seed,
				...mergeWithDefaultOptions(options ?? {}),
			}).toDataUriSync(),
		[options, seed, style],
	);
}
