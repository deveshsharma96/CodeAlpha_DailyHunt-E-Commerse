# E Commerse Website

My Name is Devesh Sharma, This is my e-commerce website.

Online shopping platform (Name-DailyHunt) where users can browse, and purchase products easily. It provides a user-friendly interface with categories of products (Like - Trending Products, Special Offer & Food 5 min Delivery) a shopping cart and a secure checkout system.

The website allows customers to add items to the cart, manage quantities, and proceed with orders.
It is designed to give a smooth and reliable online shopping experience with responsive design for both desktop and mobile users.


## Project Structure

.
├── .env                  # Environment variables (e.g., API keys, base URLs)
├── .gitignore            # Specifies files and folders to be ignored by Git
├── eslint.config.js      # Configuration for ESLint (code linter)
├── index.html            # The main HTML entry point for the application
├── node_modules/         # Directory where all project dependencies are installed
├── package.json          # Lists project dependencies, scripts, and metadata
├── package-lock.json     # Records the exact version of each installed dependency
├── postcss.config.js     # Configuration for PostCSS (used by Tailwind CSS)
├── tailwind.config.js    # Configuration file for the Tailwind CSS framework
├── tsconfig.json         # Main TypeScript compiler options for the project
├── tsconfig.app.json     # Specific TypeScript configuration for the application source code
├── tsconfig.node.json    # Specific TypeScript configuration for Node.js scripts (like vite.config.ts)
├── vite.config.ts        # Configuration file for the Vite build tool
│
├── image/                # Directory for storing static image assets
│
├── prompt/
│   └── config.json       # Custom configuration, possibly for a script or generator
│   └── prompt            # Could contain templates or prompts for code generation or AI
│
└── src/                  # Main directory containing all the application's source code
    ├── App.tsx           # The root component of the React application
    ├── index.css         # Global CSS styles, often used for Tailwind base styles
    ├── main.tsx          # The application's entry point, where React is mounted to the DOM
    ├── vite-env.d.ts     # TypeScript type definitions for Vite environment variables
    │
    ├── components/       # Reusable UI components
    │   ├── AuthModal.tsx      # Modal component for user login/registration
    │   ├── CartSidebar.tsx    # A sidebar component to display the shopping cart
    │   ├── CategoryNav.tsx    # Navigation component for product categories
    │   ├── Checkout.tsx       # Component for the checkout process
    │   ├── Header.tsx         # The main site header/navigation bar
    │   ├── ProductCard.tsx    # A card to display a single product's summary
    │   ├── ProductDetail.tsx  # A component to display the full details of a product
    │   └── UserProfile.tsx    # Component for displaying and editing user profile information
    │
    ├── contexts/              # For React Context API to manage global state
    │   ├── AuthContext.tsx    # Manages user authentication state (e.g., logged in user)
    │   ├── CartContext.tsx    # Manages the state of the shopping cart
    │   └── ThemeContext.tsx   # Manages the application's theme (e.g., light/dark mode)
    │
    ├── data/              # For static or mock data
    │   └── mockData.ts    # Contains mock data for development (e.g., product list)
    │
    └── types/            # For shared TypeScript type definitions and interfaces
        └── index.ts      # Central file to define and export shared types


    
## Features
- Light/dark mode toggle
- Search Bar for Product find
- Categories of products [Like - Trending Products, Special Offer & Food 5 min Delivery]
- Shopping cart & manage quantities
- Secure checkout system
- Cross platform - Design for both desktop and mobile users.
