import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows the shared header chrome on the product list', () => {
    render(<App />)

    expect(screen.getByRole('banner')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: 'Company Logo' }).getAttribute('href'),
    ).toBe('/')
    expect(
      screen.getByRole('button', { name: 'Artículos en la cesta: 0' }),
    ).toBeTruthy()
    expect(screen.getByRole('main').textContent).toContain('Listado')
  })
})
