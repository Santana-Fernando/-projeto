import { render, screen } from "@testing-library/react"
import { PostCard } from '.'

const mock = {
    id:1,
    title: 'Fernando lindo',
    body:'Body 01',
    cover: 'porno/porno.png'
}

describe('<PostCard/>', () => {
    it('should render PostCard correctly', () => {
        render(<PostCard post={mock} />)

        expect(screen.getByRole('img', {name: /Fernando/i}))
        .toHaveAttribute('src', mock.cover)

        expect(screen.getByRole('heading', {name: /Fernando lindo/i}))
        .toBeInTheDocument()

        expect(screen.getByText('Body 01'))
        .toBeInTheDocument()

    })
    it('should match snapshot', () => {
        const {container} = render(<PostCard post={mock} />)
    
        expect(container.firstChild).toMatchSnapshot()
    })
})