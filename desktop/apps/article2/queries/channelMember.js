export default function ChannelMemberQuery (id) {
  return `
    {
      channel(user_id: "${id}" ) {
        id
      }
    }
  `
}
