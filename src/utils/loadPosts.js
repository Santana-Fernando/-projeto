export const loadPosts = async () => {
    let response = fetch('https://jsonplaceholder.typicode.com/posts')
    let responsePhotos = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, phots] = await Promise.all([response, responsePhotos])

    const postsJson = await posts.json()
    const photosJson = await phots.json()

    const postsAndPhotos = postsJson.map((post, index) => {
      return {
        ...post, cover: photosJson[index].url
      }
    })

    return postsAndPhotos
}