# Django Portfolio App

A modern, responsive portfolio website built with Django. Showcase your projects, skills, and connect with visitors through a beautiful interface.

## Features

- **Project Showcase**: Display your projects with images, descriptions, and links
- **Skills Section**: Showcase your technical skills with proficiency levels
- **About Section**: Personal information and bio
- **Contact Form**: Allow visitors to send you messages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Admin Panel**: Easy content management through Django admin

## Installation

1. **Create a virtual environment** (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Run migrations**:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Create a superuser** (to access admin panel):
```bash
python manage.py createsuperuser
```

5. **Collect static files**:
```bash
python manage.py collectstatic --noinput
```

6. **Run the development server**:
```bash
python manage.py runserver
```

7. **Access the application**:
- Portfolio: http://127.0.0.1:8000/
- Admin Panel: http://127.0.0.1:8000/admin/

## Setup Instructions

### 1. Add Your Information

1. Go to the admin panel: http://127.0.0.1:8000/admin/
2. Click on "About" and add your personal information:
   - Name
   - Title/Job Title
   - Bio
   - Profile Image (optional)
   - Email, Location
   - Social Media Links (GitHub, LinkedIn, Twitter)
   - Resume file (optional)

### 2. Add Your Skills

1. In the admin panel, go to "Skills"
2. Click "Add Skill"
3. Fill in:
   - Name (e.g., "Python", "JavaScript")
   - Category (Programming Languages, Frameworks, Tools, etc.)
   - Proficiency (0-100)
   - Icon class (optional, e.g., "fab fa-python" for Font Awesome icons)

### 3. Add Your Projects

1. In the admin panel, go to "Projects"
2. Click "Add Project"
3. Fill in:
   - Title
   - Description
   - Image (upload a project screenshot)
   - Technologies (comma-separated, e.g., "Django, Python, PostgreSQL")
   - GitHub URL (optional)
   - Live URL (optional)
   - Mark as "Featured" if you want it on the homepage

### 4. View Messages

When visitors submit the contact form, you can view their messages in the admin panel under "Contacts".

## Project Structure

```
portfolio_project/
├── manage.py
├── requirements.txt
├── portfolio_project/
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── portfolio/
│   ├── models.py      # Database models
│   ├── views.py       # View functions
│   ├── urls.py        # URL routing
│   ├── admin.py       # Admin configuration
│   └── templates/
│       └── portfolio/
│           ├── base.html
│           ├── home.html
│           ├── projects.html
│           ├── project_detail.html
│           └── contact.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Customization

### Colors

Edit the CSS variables in `static/css/style.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Content

All content is managed through the Django admin panel. No need to edit templates for basic content changes.

## Technologies Used

- Django 4.2.7
- Python
- HTML5/CSS3
- JavaScript
- Font Awesome (icons)
- Google Fonts (Poppins)

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please check the Django documentation or create an issue in the repository.



