export function scrollToId(id: string) {
  const element = document.getElementById(id)
  const top = element.getBoundingClientRect().top + window.pageYOffset - 80
  window.scrollTo({ top })
}
