export default function MeQuery(id) {
  return `{
    me {
      id
      bidders(sale_id: "${id}") {
        qualified_for_bidding
      }
    }
  }`
}
