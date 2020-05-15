
// Truncate title with ellipses
export const getTitle = options => {
  let title = options.filter(o => o.selected).map(o => o.label).join()
  if(title.length>20)
    title = title.slice(0, 19)+'...'
  return title
}
