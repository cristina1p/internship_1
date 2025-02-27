export const filterEmptyParams = (params: Record<string, string | number>) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== '',
    ),
  )
