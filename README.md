# Express TypeScript API Template Documentation

## Overview
This template provides a robust foundation for building APIs using Express.js and TypeScript. It includes essential development tools, linting configurations, and commit standards to ensure code quality and consistency.

## Project Structure
```
.
├── src/
│   └── index.ts          # Main application entry point
├── commitlint.config.js  # Commit message linting rules
├── eslint.config.js      # ESLint configuration
├── package.json         # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── tslint.json        # TSLint configuration (legacy)
```

## Technology Stack
- **Node.js**: Runtime environment (Version ≥18)
- **Express.js**: Web application framework (Version 4.21.2)
- **TypeScript**: Programming language for type-safe development (Version ~5.5.0)
- **Yarn**: Package manager (Version 1.22.21)

## Setup and Installation

### Prerequisites
- Node.js (Version 18 or higher)
- Yarn package manager

### Installation Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

## Available Scripts

### Development
- `yarn dev`: Starts the development server with hot-reload using ts-node-dev
- `yarn start`: Starts the server using ts-node
- `yarn build`: Compiles TypeScript code to JavaScript in the dist directory

### Code Quality
- `yarn lint`: Runs ESLint to check code quality
- `yarn lint:fix`: Automatically fixes ESLint issues
- `yarn format`: Formats code using Prettier

### Testing
- `yarn test`: Runs all tests using Jest
- `yarn test:watch`: Runs tests in watch mode
- `yarn test:coverage`: Generates test coverage report

### Maintenance
- `yarn clean`: Removes the dist directory
- `yarn nd:remove`: Removes node_modules and lock files
- `yarn prepare`: Sets up Husky git hooks

## Configuration Details

### TypeScript Configuration (tsconfig.json)
The TypeScript configuration is optimized for Node.js development:
- Target: ES2016
- Module System: CommonJS
- Strict Type Checking: Enabled
- Source Directory: ./src
- Output Directory: ./dist
- Module Resolution: Node.js style

### ESLint Configuration (eslint.config.js)
Advanced ESLint setup with:
- TypeScript support
- Prettier integration
- Custom rules:
  - No console statements (warning)
  - No unused variables (error)
  - Prettier formatting enforcement
  - TypeScript-specific rules

### Jest Configuration (jest.config.js)
The Jest configuration is set up for TypeScript and includes:
- TypeScript support via ts-jest
- Test files located in `__tests__` directory or with `.test.ts` extensions
- Coverage report generation

Example configuration:
```

### Commit Standards (commitlint.config.js)
Enforces conventional commit messages with the following types:
- main: main branch changes
- build: build system or dependencies
- chore: maintenance tasks
- ci: ci configuration
- docs: documentation
- feat: new features
- fix: bug fixes
- perf: performance improvements
- refactor: code refactoring
- revert: reverting changes
- style: code style updates
- test: testing
- translation: translations
- security: security improvements

Commit message rules:
- Header length: Maximum 100 characters
- Body length: Maximum 100 characters per line
- Subject case: lower-case
- No period at the end of subject
- Empty subject is not allowed

## API Structure

### Current Endpoints
1. Root Endpoint (/)
   ```typescript
   GET /
   Response: "Hello, world!"
   ```

### Error Handling
The template includes basic Express error handling capabilities, which can be extended based on project requirements.

## Development Practices

### Code Style
- Uses Prettier for consistent formatting
- Enforces TypeScript best practices through ESLint
- Follows conventional commit standards

### Type Safety
- Strict TypeScript configuration
- Type checking enabled for better code reliability
- Complete type definitions for Express

## Extending the Template

### Adding New Routes
1. Create new route files in the `src/routes` directory
2. Define typed request and response interfaces
3. Implement route handlers using Express Router
4. Import and use routes in the main application

Example:
```typescript
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/new-route', (req: Request, res: Response) => {
  res.json({ message: 'New route response' });
});

export default router;
```

### Adding Middleware
Create middleware functions in a separate directory:
```typescript
import { Request, Response, NextFunction } from 'express';

export const customMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Middleware logic
  next();
};
```

## Security Considerations
- Dependencies are regularly updated through yarn
- Security-focused ESLint rules
- Type safety prevents common vulnerabilities
- Proper error handling prevents information leakage

## Performance Optimization
- TypeScript compilation optimizations
- Development hot-reload for faster development
- Efficient module resolution configuration

## Testing
The template includes Jest configuration for testing. Add tests in a `__tests__` directory or with `.test.ts` extensions.

## Deployment
1. Build the project using `yarn build`
2. Deploy the contents of the `dist` directory
3. Ensure proper environment variables are set
4. Use process managers like PM2 in production

## Contributing
1. Follow the commit message conventions
2. Ensure all linting passes
3. Add appropriate tests
4. Update documentation as needed

## Troubleshooting
Common issues and solutions:
1. Type errors: Ensure TypeScript definitions are up to date
2. Linting errors: Run `yarn lint:fix` to attempt automatic fixes
3. Build errors: Check TypeScript configuration and import paths