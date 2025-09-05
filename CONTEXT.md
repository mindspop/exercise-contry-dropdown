# Context File

## What is this file for?

Please use this file to give some context and meaning to the decisions you've made when implementing a solution to the exercise.

## What are we looking for?

You are welcome to keep it brief but please jot down a few notes on:

- Why you have chosen a library?
- What other libraries you have considered (if any)

The headings below are just there to guide you, feel free to remove them or add new ones based on your selection of tools.

---

## Requirements

- Support both controlled and uncontrolled select components.
- Select input states: hover, focused, error, disabled.
- Support placeholder text.
- Option states: enabled, hover, selected, selected(hover), disabled.
- Dropdown:
  - Has a max-height.
  - Supports empty and loading states (to be confirmed with designer).
- Support keyboard shortcuts.

### Interaction

- Hovering over the select button shows the hover style.
- Clicking the select button shows the dropdown and focuses the input.
- Double-clicking the select button hides the dropdown.
- Clicking an option updates the input value and hides the dropdown.
- Clicking outside the component hides the dropdown and removes input focus.

### Style

- Follow styles from Figma UI design.
- Ensure consistent dropdown scrollbar style across browsers.
- Consider responsiveness (to be confirmed with designer).
- Consider mobile support (to be confirmed with designer).

## Unit Test

`npm run test`

Why Vitest？

- Jest is not supported by Vite.
- Vitest provides a Jest-compatible API. Although I haven’t used Vitest before, the learning curve is low.
- Vitest and Vite are highly compatible.

Why React Testing Library?

- It encourages writing tests that reflect how users actually interact with your app.

References

- [Jest Docs – Using Vite](https://jestjs.io/docs/getting-started#using-vite)
- [Vitest with React Testing Library in Vite](https://victorbruce82.medium.com/vitest-with-react-testing-library-in-react-created-with-vite-3552f0a9a19a)

### State Management

### CSS Styling

### Data Fetching
