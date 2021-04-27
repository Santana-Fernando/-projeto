import './style.css';
import { useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/posts';
import { Button } from '../../components/Button';
import { TextIput } from '../../components/TextInput';

export const Home = () => {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPages] = useState(10)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPages >= allPosts.length

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )

    }) : posts
  
    
    
    const load = useCallback(async (page, postsPerPages) => {
      const postsAndPhotos = await loadPosts()
      
      setPosts(postsAndPhotos.slice(page, postsPerPages))
      setAllPosts(postsAndPhotos)
    }, [])

    useEffect(() => {
      console.log(new Date().toLocaleString('pt-br'))
      load(0, postsPerPages)
    }, [load, postsPerPages])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPages
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPages)
    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)

  }

  const handleChange = (e) => {
    const { value } = e.target
    setSearchValue(value)
  }



  return (

    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>{searchValue}</h1>
          </>
        )}
        <TextIput
          onChange={handleChange}
          value={searchValue}
        />
      </div>
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}
      {filteredPosts.length === 0 && (
        <h1>Arquivo não encontrado</h1>
      )}


      <div className="buttonContainer">
        {!searchValue && (<Button disabled={noMorePosts} text="Load More posts" onClick={loadMorePosts} />)}
      </div>
    </section>
  );

}

// export default class Home02 extends Component {

//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPages: 2,
//     searchValue: ''
//   }

//   async componentDidMount() {
//     await this.load()
//   }

  //  load = async () => {
  //    const { page, postsPerPages } = this.state

  //    const postsAndPhotos = await loadPosts()

  //    this.setState({ 
  //      posts: postsAndPhotos.slice(page, postsPerPages),
  //      allPosts: postsAndPhotos
  //    })
  //  }

  // loadMorePosts = () => {
  //   const { postsPerPages, allPosts, posts, page } = this.state
  //   const nextPage = page + postsPerPages
  //   const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPages)
  //   posts.push(...nextPosts)

  //    this.setState({ posts, page: nextPage})
  //  }

  //  handleChange = (e) => {
  //    const { value } = e.target
  //    this.setState({ searchValue: value })
  //  }

//   render(){
//     const { postsPerPages, allPosts, posts, page, searchValue  } = this.state
//     const noMorePosts = page + postsPerPages >= allPosts.length

//     const filteredPosts = !!searchValue  ? 
//     allPosts.filter(post => {
//      return post.title.toLowerCase().includes(
//       searchValue.toLowerCase()
//     )

//     }) : posts
//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && (
//             <>
//               <h1>{searchValue}</h1>
//             </>
//           )}
//           <TextIput 
//             onChange={this.handleChange}
//             value={searchValue}
//           />
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts}/>
//         )}

//         {filteredPosts.length === 0 && (
//           <h1>Arquivo não encontrado</h1>
//         )}


//         <div className="buttonContainer">
//           {!searchValue && (<Button disabled={noMorePosts} text="Load More posts" onClick={this.loadMorePosts}/>)}
//         </div>
//       </section>
//     );
//   }
// }
