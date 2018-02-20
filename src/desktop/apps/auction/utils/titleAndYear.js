import { compact } from 'underscore'

export default function titleAndYear (title, date) {
  return compact([
    title && `<em>${title}</em>`, date
  ]).join(', ')
}
