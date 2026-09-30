/**
 * ============================================================================
 * PORTFOLIO JAVASCRIPT - MELES SILESH
 * 4th Year Information Technology Student
 * Features: Typewriter, Canvas Ambient Particles, Dark/Light Mode,
 * Project Filters & Modals, Interactive Resume, Contact Form & Toasts
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('meles-portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('meles-portfolio-theme', newTheme);

      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Navbar Sticky Effect & Active Link Highlight on Scroll
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header background blur intensification
    if (siteHeader) {
      if (scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Active Section Tracking
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Typewriter Effect
  // --------------------------------------------------------------------------
  const typedTextElement = document.getElementById('typed-text');
  const phrases = [
    'Modern Web Applications',
    'Secure IT & Network Systems',
    'Relational & NoSQL Databases',
    'Scalable RESTful APIs',
    'Cloud-Native Solutions'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typedTextElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause after typing
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // --------------------------------------------------------------------------
  // 5. Interactive Ambient Canvas Particles
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 45); // Responsive density

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, ';
        this.alpha = Math.random() * 0.35 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect close particles with subtle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // --------------------------------------------------------------------------
  // 6. Skill Progress Animation On Scroll
  // --------------------------------------------------------------------------
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  skillFills.forEach(fill => skillsObserver.observe(fill));

  // --------------------------------------------------------------------------
  // 7. Project Filtering System
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 8. Project Details Data & Modal Logic
  // --------------------------------------------------------------------------
  const projectData = {
    'campus-connect': {
      title: 'CampusConnect - University Portal & Resource Hub',
      subtitle: 'Senior 4th-Year Capstone Project',
      tech: ['React.js', 'Node.js', 'Express', 'MySQL', 'JWT Auth', 'Tailwind CSS'],
      overview: 'A full-scale institutional web platform engineered to eliminate bureaucratic bottlenecks in academic workflows. Provides student registration, continuous assessment grade recording, dynamic scheduling, and automated QR code lecture attendance check-in.',
      highlights: [
        'Multi-tiered Role-Based Access Control (RBAC) separating Students, Lecturers, Department Heads, and IT Admins.',
        'Normalized MySQL database handling hundreds of course offerings, prerequisite logic, and student transcripts.',
        'Secure RESTful API layer with token verification and parameter validation to prevent unauthorized record alteration.',
        'Responsive dashboard interface built with React hooks and modular UI components.'
      ],
      role: 'Lead Architect & Full-Stack Developer'
    },
    'netshield': {
      title: 'NetShield - Network Analyzer & Port Scanner',
      subtitle: 'Network Security & Packet Inspection Tool',
      tech: ['Python 3', 'Socket Programming', 'Scapy', 'Linux / Bash', 'Tkinter GUI'],
      overview: 'A lightweight, high-performance network diagnostic utility designed to audit active subnet devices, identify open listening ports, analyze protocol flags, and alert network administrators to abnormal packet storms.',
      highlights: [
        'Multi-threaded scanning engine reducing subnet sweeps from minutes to seconds.',
        'Service fingerprinting matching open ports against standard IANA services (HTTP, SSH, FTP, DNS).',
        'Packet capture mode utilizing raw sockets to inspect IP header anomalies.',
        'Exportable scan logs in JSON/CSV formats for security audits.'
      ],
      role: 'Individual Developer (Computer Networks Project)'
    },
    'healthsphere': {
      title: 'HealthSphere - Clinic & Patient Management System',
      subtitle: 'Full-Stack Web Healthcare Application',
      tech: ['Node.js', 'Express', 'MongoDB (Mongoose)', 'Tailwind CSS', 'Nodemailer'],
      overview: 'A digital outpatient portal empowering clinics to manage patient medical histories, schedule appointments, and coordinate physician availability without overlapping bookings.',
      highlights: [
        'NoSQL schema design optimizing patient consultation history and prescription lookups.',
        'Interactive calendar UI for selecting available clinic slots in real-time.',
        'Automated email dispatch for appointment confirmations and check-up reminders.',
        'Full CRUD operations for medical staff and front desk personnel.'
      ],
      role: 'Full-Stack Developer'
    },
    'smartinventory': {
      title: 'SmartStock - Enterprise Inventory & Supply Chain Hub',
      subtitle: 'Database Management Systems Project',
      tech: ['MySQL', 'Java Swing', 'JDBC', 'Stored Procedures & Triggers', 'Chart.js'],
      overview: 'An ERP database engine built to enforce strict relational integrity, automate stock level notifications, and visualize sales performance metrics for commercial distributors.',
      highlights: [
        'Complex SQL queries, indexed views, and stored triggers preventing negative inventory states.',
        'Comprehensive audit log recording every inventory modification, timestamp, and operator ID.',
        'Analytics engine providing monthly profit summaries and top-selling product breakdowns.',
        'ACID-compliant transactions safeguarding simultaneous order fulfillment.'
      ],
      role: 'Database Architect & Java Developer'
    },
    'cloudvault': {
      title: 'CloudVault - Encrypted File Sharing & Backup',
      subtitle: 'Cloud Systems & Storage Management',
      tech: ['Node.js', 'Web Crypto API', 'AWS S3 / MinIO', 'Docker', 'Express'],
      overview: 'A cloud storage solution featuring client-side file encryption before transmission, shareable time-expiring links, and scalable object storage integration.',
      highlights: [
        'Zero-knowledge architecture ensuring files are encrypted before leaving the client browser.',
        'Temporary signed download URLs with expiration intervals.',
        'Containerized with Docker for rapid local deployment and microservice scaling.',
        'Chunked streaming uploads supporting files up to several gigabytes without memory exhaustion.'
      ],
      role: 'Backend & Cloud Systems Engineer'
    },
    'helpdesk': {
      title: 'IT Ops Desk - Campus Ticketing & Asset Tracker',
      subtitle: 'IT Operations & Infrastructure Support',
      tech: ['PHP', 'MySQL', 'Bootstrap 5', 'Network Utilities', 'Mailgun API'],
      overview: 'An incident management system developed for university computer labs to log hardware malfunctions, network outages, and dispatch support technicians with SLA resolution tracking.',
      highlights: [
        'Ticket prioritization matrix (Low, Medium, Critical, Lab Outage).',
        'Asset inventory linking individual tickets to specific PC serial numbers and switch ports.',
        'Departmental analytics reporting average resolution time and recurring hardware failure points.',
        'Real-time status updates for reporting faculty and staff.'
      ],
      role: 'Systems Analyst & Developer'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const closeProjectModalBtn = document.getElementById('close-project-modal');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectSubtitle = document.getElementById('modal-project-subtitle');
  const modalProjectBody = document.getElementById('modal-project-body');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    modalProjectTitle.textContent = data.title;
    modalProjectSubtitle.textContent = data.subtitle;

    const techBadges = data.tech.map(t => `<span>${t}</span>`).join('');
    const highlightsList = data.highlights.map(h => `<li>${h}</li>`).join('');

    modalProjectBody.innerHTML = `
      <div class="modal-project-content">
        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-primary);">System Overview</h4>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">${data.overview}</p>
        
        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-primary);">Technology Stack</h4>
        <div class="modal-project-tech">${techBadges}</div>

        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-primary);">Key Architectural Highlights</h4>
        <ul class="modal-features-list">${highlightsList}</ul>

        <div style="margin-top: 1.8rem; padding: 1rem 1.2rem; background: var(--bg-tertiary); border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); display: block;">Project Role</span>
            <strong style="color: var(--text-accent); font-size: 0.95rem;">${data.role}</strong>
          </div>
          <a href="#contact" class="btn btn-sm btn-primary" onclick="closeAllModals()">
            <span>Inquire About Code</span>
            <i class="fa-regular fa-paper-plane"></i>
          </a>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Bind project modal triggers
  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // --------------------------------------------------------------------------
  // 9. Resume Modal Handlers
  // --------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroResumeTrigger = document.getElementById('hero-resume-trigger');
  const aboutOpenResume = document.getElementById('about-open-resume');
  const closeResumeModal = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroResumeTrigger) heroResumeTrigger.addEventListener('click', openResume);
  if (aboutOpenResume) aboutOpenResume.addEventListener('click', openResume);
  if (closeResumeModal) closeResumeModal.addEventListener('click', closeResume);

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Global close on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Global close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  window.closeAllModals = function() {
    if (resumeModal) resumeModal.classList.remove('active');
    if (projectModal) projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // --------------------------------------------------------------------------
  // 10. Copy Email to Clipboard
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-text');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailTextEl.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Failed to copy. Please manually copy the email.', 'error');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Interactive Contact Form Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name').value.trim();
      const emailInput = document.getElementById('contact-email').value.trim();
      const messageInput = document.getElementById('contact-message').value.trim();

      if (!nameInput || !emailInput || !messageInput) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Button loading state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>`;

      // Simulate network dispatch
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        showToast(`Thank you ${nameInput}! Your message has been sent to Meles.`, 'success');

        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = 'Message received! Meles will get back to you shortly.';
          setTimeout(() => { formFeedback.textContent = ''; }, 6000);
        }

        contactForm.reset();
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 12. Toast Notification Function
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
      toast.style.animation = 'fadeOutToast 0.4s ease forwards';
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // --------------------------------------------------------------------------
  // 13. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
