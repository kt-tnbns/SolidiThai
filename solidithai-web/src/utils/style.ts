export const getResponsiveWidth = (width?: number): number | undefined => {
  if (!width) return width
  const widthByRatio = Math.floor((width / 1440) * window.innerWidth)
  return Math.max(widthByRatio, width)
}
