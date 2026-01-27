# Contributing to Ramadan Tracker

Thank you for your interest in contributing to Ramadan Tracker! This is a website that helps Muslims monitor their prayers, duas, and Quran recitation during Ramadan. This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ramadan-tracker.git
   cd ramadan-tracker
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-prayer-reminder`
- `fix/calendar-display-bug`
- `docs/update-readme`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add prayer reminder notifications
fix: correct Islamic calendar date calculation
docs: update installation instructions
style: format code with prettier
refactor: simplify state management
```

### Code Style

- Use TypeScript for all new files
- Follow the existing code style
- Run `pnpm run lint` before submitting

## Pull Request Process

1. Create a new branch from `master`
2. Make your changes
3. Run tests and linting:
   ```bash
   pnpm run lint
   pnpm run type-check
   pnpm run build
   ```
4. Commit your changes with a descriptive message
5. Push to your fork and open a Pull Request
6. Fill out the PR template completely

## Reporting Issues

- Use the bug report template for bugs
- Use the feature request template for new features
- Search existing issues before creating a new one

## Questions?

Feel free to open a discussion on GitHub if you have questions.
