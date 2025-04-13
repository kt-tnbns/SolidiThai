import { useTheme, useMediaQuery } from '@mui/material'

export const useScreen = () => {
  const theme = useTheme()
  const isMoreSm = useMediaQuery(theme.breakpoints.up('sm')) //  >= 480
  const isMoreMd = useMediaQuery(theme.breakpoints.up('md')) // >= 768
  const isMoreLg = useMediaQuery(theme.breakpoints.up('lg')) // >= 1024
  const isMoreXl = useMediaQuery(theme.breakpoints.up('xl')) // >= 1200
  const isMobile = !isMoreMd // [0,768)
  const isMobilePortrait = !isMoreSm // [0,480)
  const isMobileLandscape = isMoreSm && !isMoreMd // [480,768)
  const isTablet = isMoreMd && !isMoreXl // [768,1200)
  const isTabletPortrait = isMoreMd && !isMoreLg // [768,1024)
  const isTabletLandscape = isMoreLg && !isMoreXl // [1024,1200)
  const isDesktop = isMoreXl // >= 1200

  return {
    isMoreSm,
    isMoreMd,
    isMoreLg,
    isMoreXl,
    isMobile,
    isMobilePortrait,
    isMobileLandscape,
    isTablet,
    isTabletPortrait,
    isTabletLandscape,
    isDesktop,
  }
}
