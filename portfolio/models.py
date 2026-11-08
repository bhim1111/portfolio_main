from django.db import models
from django.core.validators import URLValidator


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    technologies = models.CharField(max_length=200, help_text="Comma-separated list of technologies")
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def get_technologies_list(self):
        """Return technologies as a list"""
        return [tech.strip() for tech in self.technologies.split(',')]


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('programming', 'Programming Languages'),
        ('framework', 'Frameworks & Libraries'),
        ('tool', 'Tools & Technologies'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    proficiency = models.IntegerField(default=50, help_text="Proficiency level (0-100)")
    icon = models.CharField(max_length=100, blank=True, help_text="Icon class name (e.g., 'fab fa-python')")

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return self.name


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"


class About(models.Model):
    """Single instance model for about section"""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='about/', blank=True, null=True)
    email = models.EmailField()
    location = models.CharField(max_length=100, blank=True)
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "About"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """Ensure only one About instance exists"""
        self.pk = 1
        super().save(*args, **kwargs)


class Resume(models.Model):
    """The current resume, managed separately from About information."""
    file = models.FileField(
        upload_to='resumes/',
        help_text='Upload a PDF to show an inline preview on the portfolio.',
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Resume'
        verbose_name_plural = 'Resume'

    def __str__(self):
        return 'Resume'

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)



