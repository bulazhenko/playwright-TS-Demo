# Playwright TypeScript Demo

This is a demo project showcasing automated testing using Playwright with TypeScript. The project demonstrates best practices for:
- Page Object Model implementation
- API testing
- Test organization
- Logging
- Error handling

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Show test report
npm run report
```

## Project Structure

```
playwright-ts-demo/
├── tests/
│   ├── api/              # API client classes
│   ├── pages/            # Page Object classes
│   ├── utils/            # Utility functions
│   └── game.spec.ts      # Test specifications
├── playwright.config.ts  # Playwright configuration
└── package.json         # Project dependencies
```

## Features

- TypeScript support
- Page Object Model pattern
- API testing capabilities
- Comprehensive logging
- Error handling
- Test reporting

## License

ISC
