
# News Web Application

A scalable news platform built with Node.js, Express, TypeScript, and PostgreSQL, featuring admin authentication, article management, and search functionality.

## 🚀 Features

- 🔐 Admin Authentication
- 📰 Full Article Management (CRUD)
- 🔍 Search Functionality
- 📱 Responsive Design
- 🎨 Rich Text Editor for Articles
- 🏷️ Tag Management
- 📄 Pagination

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Frontend:** EJS, Bootstrap
- **Database:** PostgreSQL
- **Authentication:** Token Based
- **Other Tools:** WYSIWYG Editor

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## ⚙️ Installation

1. Clone the repository
```bash
git clone https://github.com/mswger001/news-web-app.git
cd news-web-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/news_db
SESSION_SECRET=your_session_secret
```

4. Set up the database
```bash
npm run db:setup
```

5. Start the development server
```bash
npm run dev
```

## 🗄️ Database Schema

```sql
-- Admin Users
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Article Tags
CREATE TABLE article_tags (
    article_id INTEGER REFERENCES articles(id),
    tag_id INTEGER REFERENCES tags(id),
    PRIMARY KEY (article_id, tag_id)
);
```

## 📁 Project Structure

```
news-web-app/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   └── app.ts
├── views/
│   ├── layouts/
│   ├── partials/
│   └── pages/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── tests/
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🔑 Available Scripts

- `npm run dev`: Starts development server
- `npm run build`: Builds the project
- `npm start`: Starts production server
- `npm test`: Runs tests
- `npm run lint`: Runs linter
- `npm run db:setup`: Sets up database

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout

### Articles
- `GET /articles` - Get all articles
- `GET /articles/:id` - Get single article
- `POST /articles` - Create article (Admin only)
- `PUT /articles/:id` - Update article (Admin only)
- `DELETE /articles/:id` - Delete article (Admin only)

### Search
- `GET /search` - Search articles by title/tags

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🤝 Acknowledgments

- Bootstrap for the UI components
- Express.js community
- TypeScript team

## 📧 Contact

Your Name - Gerald Maswoswere
Project Link:
