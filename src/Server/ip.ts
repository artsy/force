const ipv6Regex = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i

export const isV6Format = ip => {
  return ipv6Regex.test(ip)
}
