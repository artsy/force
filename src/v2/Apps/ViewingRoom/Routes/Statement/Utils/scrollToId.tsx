export function scrollToId(id: string) {
  const element = document.getElementById(id)
  // @ts-expect-error STRICT_NULL_CHECK
  const top = element.getBoundingClientRect().top + window.pageYOffset - 80
  window.scrollTo({ top })
}
