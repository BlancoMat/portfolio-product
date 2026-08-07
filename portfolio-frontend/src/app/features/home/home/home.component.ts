import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../core/api/contact.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  activeSection: string = 'hero';
  showAllProjects: boolean = false;

  contactForm!: FormGroup;
  contactStatus: 'idle' | 'sending' | 'sent' | 'error' = 'idle';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  toggleProjects() {
    this.showAllProjects = !this.showAllProjects;
  }

  submitContact() {
    if (this.contactForm.invalid || this.contactStatus === 'sending') {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactStatus = 'sending';
    this.contactService.send(this.contactForm.getRawValue() as { nombre: string; email: string; mensaje: string }).subscribe({
      next: () => {
        this.contactStatus = 'sent';
        this.contactForm.reset();
      },
      error: () => {
        this.contactStatus = 'error';
      },
    });
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
