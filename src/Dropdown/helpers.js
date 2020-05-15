
// Truncate title with ellipses
export const getTitle = (options, defaultTitle) => {
  let title = options.filter(o => o.selected).map(o => o.label).join()
  if(title.length>20)
    title = title.slice(0, 19)+'...'
  else if(title.length===0)
    title = defaultTitle
  return title
}
