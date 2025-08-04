# Real-Time Web Search

A modern, responsive web application built with Next.js that provides real-time web search functionality using the RapidAPI Real-Time Web Search service. Users can search for any topic and get comprehensive results including web pages, videos, forum discussions, and more.

## 🚀 Features

- **Real-time web search** with comprehensive results
- **Rich result display** including:
  - Web pages with snippets and rankings
  - Video results with thumbnails and duration
  - Forum/discussion results with answer counts
  - Source attribution and external links
- **User API key management** - Users provide their own RapidAPI keys
- **Responsive design** with modern UI components
- **Error handling** and loading states
- **Secure API key handling** - Keys never stored on server

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Icons**: Lucide React
- **API**: RapidAPI Real-Time Web Search
- **TypeScript**: Full type safety

## 📋 Prerequisites

Before running this project, you'll need:

1. **Node.js** (version 18 or higher)
2. **npm**, **yarn**, **pnpm**, or **bun** package manager
3. **RapidAPI account** and subscription to Real-Time Web Search API

## 🔧 Installation

1. **Clone the repository**:
```bash
git clone <your-repository-url>
cd real-time-web-search
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configure external images** (required for displaying search result images):

Create or update `next.config.js` in the root directory:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-vtbn0.gstatic.com',
        port: '',
        pathname: '/video/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn1.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn2.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn3.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 't1.gstatic.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 't2.gstatic.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 't3.gstatic.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
```

## 🚀 Getting Started

1. **Run the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

3. **Configure your API key**:
   - Click "Configure API Key" on the main page
   - Get your RapidAPI key (see instructions below)
   - Enter your API key in the secure input field
   - Start searching!

## 🔑 Getting Your RapidAPI Key

To use this application, you need to subscribe to the Real-Time Web Search API on RapidAPI:

1. **Visit the API page**: [RapidAPI Real-Time Web Search](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-web-search)
2. **Sign up or log in** to RapidAPI
3. **Subscribe to the API** (free tier available)
4. **Copy your API key** from the dashboard
5. **Enter the key** in the application's configuration section

## 🏗️ Project Structure

```
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts          # API endpoint for search requests
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main search interface
├── components/
│   └── ui/                      # Shadcn/UI components
├── lib/
│   └── utils.ts                 # Utility functions
├── next.config.js               # Next.js configuration
└── README.md
```

## 🎨 Key Components

### Frontend (`app/page.tsx`)
- **Search Interface**: Clean, responsive search input with API key management
- **Results Display**: Rich cards showing search results with proper formatting
- **State Management**: React hooks for search state, API keys, and loading states
- **Error Handling**: User-friendly error messages and validation

### Backend (`app/api/search/route.ts`)
- **API Integration**: Connects to RapidAPI Real-Time Web Search
- **Security**: Validates API keys and handles authentication
- **Error Handling**: Proper HTTP status codes and error messages

## 🔒 Security Features

- **No server-side API key storage**: Users provide their own keys
- **Secure header transmission**: API keys sent via HTTP headers
- **Password-type inputs**: API keys are masked in the UI
- **Client-side validation**: Prevents searches without valid configuration

## 🎯 Usage Examples

### Basic Search
```
Query: "how to build a website"
Results: Web pages, tutorials, video guides, forum discussions
```

### Video Search
```
Query: "JavaScript tutorial"
Results: YouTube videos with thumbnails, duration, and descriptions
```

### Technical Questions
```
Query: "React hooks best practices"
Results: Documentation, Stack Overflow discussions, blog posts
```

## 🛠️ Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- Customize Shadcn/UI components in `components/ui/`

### API Integration
- Update `app/api/search/route.ts` to modify API parameters
- Add new search parameters or filters as needed
- Implement result caching if desired

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured interface with all components
- **Tablet**: Optimized layout with touch-friendly interactions
- **Mobile**: Streamlined interface optimized for small screens

## 🐛 Troubleshooting

### Common Issues

**Images not loading**: Make sure `next.config.js` is properly configured with the image domains listed above.

**API key errors**: Verify your RapidAPI subscription is active and the key is correctly entered.

**Build errors**: Ensure all dependencies are installed and TypeScript errors are resolved.

### Error Messages

- `"API key is required"`: Configure your RapidAPI key in the interface
- `"Invalid API key"`: Check your RapidAPI subscription and key validity
- `"Failed to fetch results"`: Check your internet connection and API limits

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - re-usable components built with Radix UI and Tailwind CSS
- [RapidAPI Documentation](https://docs.rapidapi.com/) - API marketplace and integration guides

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Deploy with default settings
4. Your app will be live with automatic HTTPS

### Other Platforms

This Next.js app can also be deployed on:
- **Netlify**: Static site hosting with serverless functions
- **Railway**: Full-stack application hosting
- **DigitalOcean App Platform**: Container-based hosting
- **AWS Amplify**: AWS-managed hosting with CI/CD

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and RapidAPI