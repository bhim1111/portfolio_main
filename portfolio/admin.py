from django.contrib import admin
from .models import Project, Skill, Contact, About, Resume


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'created_at']
    list_filter = ['featured', 'created_at']
    search_fields = ['title', 'description']
    prepopulated_fields = {}


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency']
    list_filter = ['category']
    search_fields = ['name']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'read', 'created_at']
    list_filter = ['read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'updated_at']


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    fields = ['file', 'updated_at']
    readonly_fields = ['updated_at']
    list_display = ['file', 'updated_at']

    def has_add_permission(self, request):
        return not Resume.objects.exists()



