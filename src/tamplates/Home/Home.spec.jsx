import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { Home } from '.'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from "@testing-library/user-event"

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*',
    async (req, res, ctx) => {
      return res(ctx.json([
        {
          userId: 1,
          id: 1,
          title: "title 01",
          body: "body 01",
          url: 'img1.png'
        },
        {
          userId: 1,
          id: 2,
          title: "title 02",
          body: "body 02",
          url: 'img2.png'
        },
        {
          userId: 1,
          id: 3,
          title: "title 03",
          body: "body 03",
          url: 'img3.png'
        },
      ]))
    }
  ),
]

const server = setupServer(...handlers)

describe('<Home/>', () => {

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => { server.resetHandlers() })

  afterAll(() => {
    server.close()
  })

  it('should render search, posts and load more', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Arquivo não encontrado')

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)
    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img', {name: /title/i})
    expect(images).toHaveLength(2)

    const button = screen.getByRole('button', {name: /Load More posts/i})
    expect(button).toBeInTheDocument()

  });

  it('should search for posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Arquivo não encontrado')

    expect.assertions(11)
    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)

    expect(screen.getByRole('heading', {name: 'title 01'}))
    .toBeInTheDocument()
    expect(screen.getByRole('heading', {name: 'title 02'}))
    .toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: 'title 03'}))
    .not.toBeInTheDocument()

    userEvent.type(search, 'title')

    expect(screen.getByRole('heading', {name: 'title 01'}))
    .toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: 'title 0 2'}))
    .not.toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: 'title 0 3'}))
    .not.toBeInTheDocument()
    expect(screen.getByRole('heading', {name: 'title'}))
    .toBeInTheDocument()

    userEvent.clear(search)

    expect(screen.getByRole('heading', {name: 'title 01'}))
    .toBeInTheDocument()
    expect(screen.getByRole('heading', {name: 'title 02'}))
    .toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: 'title 0 3'}))
    .not.toBeInTheDocument()

    userEvent.type(search, 's')

    expect(screen.getByText('Arquivo não encontrado'))
    .toBeInTheDocument()

  });

  it('should load more post', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Arquivo não encontrado')

    //expect.assertions()
    await waitForElementToBeRemoved(noMorePosts)

    const button = screen.getByRole('button', {name: /Load More posts/i})

    userEvent.click(button)
    expect(screen.getByRole('heading', {name: 'title 03'}))
    .toBeInTheDocument()

    expect(button).toBeDisabled()
  });
})
