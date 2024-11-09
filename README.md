# Star Wars Movie Search Application

A modern web application for searching and exploring Star Wars movies, built with Next.js and TypeScript.

## Features

- Movie search functionality with real-time results
- Responsive design for all devices
- Sorting capabilities for search results
- Caching mechanism for improved performance

## Technologies

- Next.js 15
- TypeScript
- React
- SWAPI (Star Wars API)
- OMDB (Open Movie Database)
## Getting Started

### Environment Setup

1. Create a `.env` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key_here
```

2. Get your OMDB API key:
   - Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Register for a free API key
   - Copy the API key to your `.env` file

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_OMDB_API_KEY` | API key for OMDB API | Yes |

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/antonzeno/fe-star-wars.git]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
