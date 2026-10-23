# Fishermen Movement

## Project structure

```text
fishermen-movement/
├── public/
│   └── assets/              # Logos, images, and static icons
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Buttons, section titles, and cards
│   │   │   ├── Button.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   └── StatCard.jsx
│   │   ├── layout/          # Structural components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MainLayout.jsx
│   │   └── specific/        # Page-specific components
│   │       ├── CurriculumModule.jsx
│   │       ├── TeamMember.jsx
│   │       └── ContactForm.jsx
│   ├── pages/               # Route-level components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Curriculum.jsx
│   │   ├── Impact.jsx
│   │   ├── Contact.jsx
│   │   ├── Gallery.jsx      # Referenced in the footer
│   │   └── News.jsx         # Referenced in the footer
│   ├── data/                # Static data that keeps components clean
│   │   ├── modulesData.js   # Curriculum topics
│   │   ├── statsData.js     # Impact numbers
│   │   └── teamData.js      # Founder and team information
│   ├── hooks/               # Custom hooks (for example, useForm)
│   ├── App.jsx              # Routing setup
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles (Tailwind or standard CSS)
├── package.json
└── vite.config.js
```
