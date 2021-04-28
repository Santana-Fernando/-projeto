import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TextIput } from '.'

describe('<TextIput/>', () => {
    it('should have a value of searchValue', () => {
        const fn = jest.fn()
        render(<TextIput onChange={fn} value={'Testando'}/>)
        
        const input = screen.getByPlaceholderText(/type your search/i)
        expect(input).toBeInTheDocument()
        
        expect(input.value).toBe('Testando')
    })

    it('should call handlechange function on each key pressed', () => {
        const fn = jest.fn()
        render(<TextIput onChange={fn}/>)

        const input = screen.getByPlaceholderText(/type your search/i)
        const value = 'o valor'

        userEvent.type(input, value)

        expect(input.value).toBe(value)
        expect(fn).toHaveBeenCalledTimes(value.length)
    })

    it('should match snapshot', () => {
        const fn = jest.fn()
        const { container } = render(<TextIput onChange={fn} value={'Testando'} />)
       
        expect(container.firstChild).toMatchSnapshot()
        
    })
})