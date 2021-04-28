import './styles.css'
export const PostCard = ({ post }) => {
    return (
        <div className="post">
          <img src={post.cover} alt={post.title}/>
          <div className="post-content" key={post.id}>
            <h1>{post.id}</h1>
            <h2>{post.title}</h2>
            <h3>{post.body}</h3>
          </div>
        </div>
    )
}