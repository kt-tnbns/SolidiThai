import { Box, StackProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface DataTableEmptyProps extends StackProps {
  title?: string
  description?: string
  children?: ReactNode
}

export const DataTableEmpty = ({
  title,
  description,
  children,
  ...props
}: DataTableEmptyProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...props}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
      {children}
    </Box>
  )
}
