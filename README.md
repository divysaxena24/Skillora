# Skillora

Skillora is an AI-powered course builder app built natively with React Native and Expo Router. It empowers creators to intelligently design, generate, and launch comprehensive courses in minutes.

## 🚀 Features

* **Quick AI Generation:** Generate stunning curriculum outlines using advanced LLMs.
* **Smart Curriculum:** Manage chapters, lessons, and modern multimedia content.
* **Deep Analytics:** Track student progress and performance with rich metric insights.
* **Modern Cross-Platform Design:** Beautiful native interfaces tailored for iOS, Android, and Web using custom glowing gradients and elegant typography.
* **Secure Backend Architecture:** Utilizes robust Expo API Server Routes bridged directly with Neon DB (Serverless PostgreSQL) using Drizzle ORM.

## 🛠 Tech Stack

* **Framework:** React Native / Expo
* **Routing:** Expo Router
* **Database:** Neon PostgreSQL Serverless
* **ORM:** Drizzle (`drizzle-orm`, `drizzle-kit`)

## 💻 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup your database credentials by opening or creating `.env.local`:
   ```env
   DATABASE_URL=postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require
   ```

3. Run Drizzle migrations to initialize the core database tables:
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. Start the Expo development server:
   ```bash
   npm run start
   ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/divysaxena24/Skillora/issues).
