
export const useUserFilter = () => {
  const setParams = (params: URLSearchParams) => {
    params.set('page', '1')
  }

  return {
    setParams,
  }
}
