export default function ChannelMemberQuery (id) {
  return `
    {
      channels(user_id: "${id}", limit: 50 ) {
        id
      }
    }
  `
}
