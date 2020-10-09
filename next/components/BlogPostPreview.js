import Link from "next/link"
import { createFragmentContainer, graphql } from "react-relay"

const BlogPostPreview = ({ post }) => {
  return (
    <div key={post.id}>
      <Link href="/feature">{post.title}</Link>
    </div>
  )
}

export default createFragmentContainer(BlogPostPreview, {
  post: graphql`
    fragment BlogPostPreview_post on BlogPost {
      id
      title
    }
  `,
})
