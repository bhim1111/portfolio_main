from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Project, Skill, Contact, About, Resume


def home(request):
    """Main portfolio page"""
    projects = Project.objects.filter(featured=True)[:6]
    skills = Skill.objects.all()
    about = About.objects.first()
    resume = Resume.objects.first()
    
    context = {
        'projects': projects,
        'skills': skills,
        'about': about,
        'resume': resume,
    }
    return render(request, 'portfolio/home.html', context)


def projects(request):
    """All projects page"""
    projects = Project.objects.all()
    context = {
        'projects': projects,
    }
    return render(request, 'portfolio/projects.html', context)


def project_detail(request, pk):
    """Individual project detail page"""
    project = Project.objects.get(pk=pk)
    context = {
        'project': project,
    }
    return render(request, 'portfolio/project_detail.html', context)


def contact(request):
    """Contact form page"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        messages.success(request, 'Thank you for your message! I will get back to you soon.')
        return redirect('contact')
    
    return render(request, 'portfolio/contact.html')


