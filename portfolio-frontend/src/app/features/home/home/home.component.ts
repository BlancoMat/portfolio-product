import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  activeSection: string = 'hero';
  showAllProjects: boolean = false;

  toggleProjects() {
    this.showAllProjects = !this.showAllProjects;
  }

  ngOnInit() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }

      // detectar sección activa
      const sections = ['hero', 'sobre-mi', 'proyectos', 'experiencia', 'contacto'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            this.activeSection = id;
          }
        }
      }
    });
  }
}
