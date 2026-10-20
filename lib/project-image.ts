/** Paths that should not be loaded as real images. */
const PLACEHOLDER_PATTERNS = [/placeholder/i, /^$/, /^\/placeholder\.(svg|png|jpe?g)$/i]

export function getProjectImageSrc(image?: string): string | null {
  const src = image?.trim() ?? ""
  if (!src) return null
  if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(src))) return null
  return src
}
