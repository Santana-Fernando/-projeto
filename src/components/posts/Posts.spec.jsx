import { render, screen } from "@testing-library/react"
import { Posts } from '.'

const posts = {
    posts: [
        {
            id:1,
            title: 'Title 1',
            body:'Body 01',
            cover: 'img/img.png'
        },
        {
            id:2,
            title: 'Title 2',
            body:'Body 02',
            cover: 'img/img.png'
        },
        {
            id:3,
            title: 'Title 3',
            body:'Body 02',
            cover: 'img/img3.png'
        },
    ]
}

describe('<Posts/>', () => {
    it('should render Posts', () => {
        render(<Posts posts={posts.posts} />)
       
        expect(screen.getAllByRole('heading', {name: /title/i}))
        .toHaveLength(3)

        expect(screen.getAllByRole('img', {name: /title/i}))
        .toHaveLength(3)

        expect(screen.getAllByText(/Body/i))
        .toHaveLength(3)

        expect(screen.getByRole('img', {name: /title 3/i}))
        .toHaveAttribute('src', 'img/img3.png')
    })

    it('should render Posts with empty array', () => {
        render(<Posts />)
       
        expect(screen.queryByRole('heading', {name: /title/i}))
        .not.toBeInTheDocument()
    })

    it('should match snapshot', () => {
        const { container } = render(<Posts posts={posts.posts} />)
       
        expect(container.firstChild).toMatchSnapshot()
        
    })
})