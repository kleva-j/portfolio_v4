### Portfolio V4

A modern, content-driven portfolio website built with Next.js 15.3.3, featuring a robust architecture for showcasing projects, blog posts, and technical content.

## 🚀 Features

- 📝 Content-Driven Architecture with MDX support
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 🚀 Next.js 15 with Turbopack for fast development
- 📱 Responsive design for all devices
- 📊 Vercel Analytics integration
- 📖 SEO-optimized with OpenGraph metadata
- 🎨 Theme support (light/dark)
- 🎯 Performance-optimized with SWR and Turbopack
- 📚 Code snippets showcase
- 🎨 Custom typography and animations

## 📦 Tech Stack

- **Framework**: Next.js 15.3.3
- **React**: v19.1.0
- **Styling**:
  - Tailwind CSS
  - Tailwind Typography
  - Tailwind Merge
- **MDX Support**:
  - [@next/mdx](https://www.npmjs.com/package/@next/mdx)
  - [@mdx-js/react](https://www.npmjs.com/package/@mdx-js/react)
  - [remark-gfm](https://www.npmjs.com/package/remark-gfm)
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) components
  - [Lucide React](https://lucide.dev/) icons
  - [Motion](https://framer.com/motion) for animations
- **State Management**: [SWR](https://swr.vercel.sh/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **TypeScript**: v5.1.6

## 📁 Project Structure

```
portfolio_v4/
├── app/                    # Main application routes and pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main landing page
│   ├── post/              # Blog post routes
│   │   └── [slug]/       # Individual blog post pages
│   ├── snippets/          # Code snippets showcase
│   ├── og/              # OpenGraph image generation
│   ├── error.tsx         # Custom error page
│   ├── not-found.tsx     # 404 page
│   └── robots.ts         # SEO robots configuration
├── components/           # Reusable UI components
├── layout/               # Layout components (sidebar, header, etc.)
├── lib/                  # Utility functions and shared code
│   └── utils.ts         # Common utility functions
├── content/              # MDX content files
├── public/              # Static assets
├── types.ts            # TypeScript type definitions
└── mdx-components.tsx  # Custom MDX component mappings
```

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js (latest LTS version)
   - pnpm package manager

2. **Installation**
   ```bash
   # Install dependencies
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   - `SITE_URL`: Your website URL for OpenGraph metadata

4. **Running the Project**
   ```bash
   # Start development server with Turbopack
   pnpm run dev
   
   # Build for production
   pnpm run build
   
   # Start production server
   pnpm run start
   ```

## 📝 Content Management

- **Blog Posts**: Located in `app/post/[slug]` using MDX format
- **Code Snippets**: Managed in `app/snippets`
- **Static Content**: Written in MDX format in the `content` directory
- **OpenGraph Images**: Automatically generated from metadata

## 🎨 Styling & Theming

- **Tailwind CSS** with custom configuration
- **Theme Support**: Light and dark mode using `next-themes`
- **Typography**: Custom typography using Tailwind Typography
- **Animations**: Smooth animations using Motion

## 📊 Performance

- **Turbopack**: Development server for faster builds
- **SWR**: Data fetching with cache and revalidation
- **Image Optimization**: Built-in Next.js image optimization
- **Code Splitting**: Automatic code splitting for faster loads

## 🔧 Development

- **TypeScript**: Full TypeScript support
- **Testing**: [Jest](https://jestjs.io/) for unit tests (to be implemented)
- **Linting**: [ESLint](https://eslint.org/) with Next.js configuration
- **Formatting**: [Prettier](https://prettier.io/) for consistent code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 🙏 Acknowledgments

- [Lee Robinson](https://github.com/leerob) for inspiration and Next.js patterns
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) team for the amazing framework

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Deployment

- **Hosting**: Deployable to Vercel, Netlify, or any static site host
- **CI/CD**: GitHub Actions workflow for automated deployments
- **Environment Variables**: 
  - `NEXT_PUBLIC_SITE_URL`: Base URL for the site
  - `VERCEL_ANALYTICS_ID`: Vercel Analytics ID
  - `NEXT_PUBLIC_API_URL`: API endpoint URL (if applicable)

## 🔒 Security

- **HTTPS**: Enforced via Vercel deployment
- **Content Security Policy**: Configured in Next.js
- **Rate Limiting**: Built-in protection for API routes
- **Authentication**: Session-based authentication
- **Security Headers**: Automatic security headers via Next.js
- **Environment Variables**: Encrypted secrets management

## 📊 Monitoring

- **Analytics**: Vercel Analytics integration
- **Error Tracking**: Built-in error tracking
- **Performance**: Automatic performance monitoring
- **Logs**: Centralized logging system

## 📖 Documentation

For more detailed documentation, check the [docs](docs) directory (to be created).

## 🛠️ Project Maintenance

### Version Control
- **Git**: Main version control system
- **Branching Strategy**: Feature branching with main and develop branches
- **Commit Messages**: Conventional commits format

### Code Quality
- **TypeScript**: Strict mode enabled
- **Code Style**: Prettier for consistent formatting
- **Linting**: ESLint with Next.js and TypeScript rules
- **Code Reviews**: Required for all PRs

### Performance Optimization
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Automatic code splitting
- **Caching**: Browser and CDN caching
- **Minification**: Automatic minification

### Accessibility
- **WCAG Compliance**: ARIA labels and roles
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic HTML structure
- **Color Contrast**: WCAG 2.1 AA compliance

## 🚀 Roadmap

- [ ] Complete documentation
- [ ] Add unit tests
- [ ] Implement E2E testing
- [ ] Add more blog posts
- [ ] Improve performance metrics
- [ ] Add more portfolio projects
- [ ] Implement contact form
- [ ] Add more analytics metrics

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch Support**: Optimized for touch interactions
- **Performance**: Optimized for mobile devices
- **Navigation**: Mobile-friendly navigation

## 🎨 Design System

- **Color Scheme**: Custom color palette
- **Typography**: Custom font stack
- **Spacing**: Consistent spacing system
- **Components**: Reusable UI components
- **Animations**: Subtle animations for better UX

## 📱 Performance Metrics

- **Lighthouse Score**: Target 90+
- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 3s
- **Page Size**: Optimized for mobile
- **JavaScript Bundle**: Minimized size

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

## 📝 Changelog

All notable changes to this project will be documented in the [CHANGELOG.md](CHANGELOG.md) file (to be created).

## 📋 Contributing Guidelines

### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, external dependencies, etc.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md) (to be created). By participating in this project you agree to abide by its terms.

## 🎯 Project Goals

- Maintain a clean and modern design
- Provide excellent user experience
- Ensure high performance
- Follow best practices
- Maintain code quality
- Keep documentation up to date

## 🔍 Project Status

- **Current Version**: 1.0.0 (WIP)
- **Status**: Active development
- **Last Update**: [Insert last update date]
- **Contributors**: [List of contributors]

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.
