const allowedViews = new Set(['dev', 'client'])

export function getPortfolioView() {
  try {
    const view = localStorage.getItem('portfolio_view')
    return allowedViews.has(view) ? view : null
  } catch {
    return null
  }
}

export function savePortfolioView(view) {
  if (!allowedViews.has(view)) return
  try {
    localStorage.setItem('portfolio_view', view)
  } catch {
    // Navigation still works when storage is unavailable.
  }
}

export function assetUrl(path) {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
