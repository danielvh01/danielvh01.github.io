/**
 * Daniel Velásquez — Executive Portfolio Logic
 * High-performance, zero-dependency ES6 module for GitHub Pages
 */

(function () {
  'use strict';

  // State Management
  const state = {
    lang: localStorage.getItem('daniel_portfolio_lang') || 'es',
    activeFilter: 'all',
    activeTerminalTab: 'profile.py'
  };

  // Translations dictionary for dynamic elements
  const translations = {
    es: {
      toggleBtn: 'EN',
      toastCopied: 'Copiado al portapapeles',
      toastFormSuccess: 'Preparando mensaje...',
      sending: 'Procesando...',
      viewArch: 'Ver Arquitectura ▸',
      modalClose: 'Cerrar'
    },
    en: {
      toggleBtn: 'ES',
      toastCopied: 'Copied to clipboard',
      toastFormSuccess: 'Opening email client...',
      sending: 'Processing...',
      viewArch: 'Inspect Architecture ▸',
      modalClose: 'Close'
    }
  };

  // Project Architecture Blueprints Data
  const projectBlueprints = {
    'mental-health': {
      title_es: 'Asistente de Salud Mental con RAG & Audio Multimodal',
      title_en: 'Generative AI Mental Health Assistant with Multimodal Audio & RAG',
      stack: ['Python', 'LangChain', 'Pinecone', 'Milvus', 'Whisper', 'AWS Transcribe', 'Azure / AWS'],
      diagram: `[User Voice / Chat] 
       │
       ▼
[Whisper / AWS Transcribe] ──► [Structured Transcript]
                                      │
                                      ▼
             [LangChain Orchestrator] ◄──► [Vector Search (Pinecone/Milvus)]
                         │                        ▲
                         │                        │ Clinical Knowledge Base
                         ▼
             [LLM Grounded Synthesis] ──► [Hallucination Guardrails]
                         │
                         ▼
             [Empathetic & Compliant Response]`,
      summary_es: 'Arquitectura diseñada para procesar consultas médicas/psicológicas mediante voz y texto. Las respuestas se anclan estrictamente en bases de conocimiento vectorizadas para erradicar alucinaciones, aplicando guardrails de seguridad y privacidad según estándares HIPAA/GDPR.',
      summary_en: 'Architecture designed to process patient audio and text queries. Responses are strictly grounded in vector databases to eliminate hallucinations, implementing security and privacy guardrails following clinical and regulatory standards.'
    },
    'marketing-agent': {
      title_es: 'Agente Autónomo de Marketing Multimodal',
      title_en: 'Autonomous Multi-Modal Marketing Agent',
      stack: ['Python', 'n8n', 'AWS Rekognition', 'LLMs', 'Workflow Automation'],
      diagram: `[Event Trigger / RSS / Schedule]
              │
              ▼
[n8n Workflow Engine] ──► [Image & Video Assets]
              │                   │
              │                   ▼
              │          [AWS Rekognition] (Label & Face Analysis)
              ▼                   │
    [Contextual Prompt Chaining] ◄┘
              │
              ▼
    [Generative Content & Copy Engine] ──► [Multi-Channel Publishing API]`,
      summary_es: 'Sistema de automatización inteligente que ingesta recursos audiovisuales, ejecuta análisis semántico mediante visión por computadora en AWS, y orquesta flujos de copywriting y publicación autónoma con LLMs.',
      summary_en: 'Intelligent automation system that ingests audiovisual assets, performs semantic computer vision analysis via AWS Rekognition, and orchestrates copywriting and automated publication pipelines with LLMs.'
    },
    'multi-cloud': {
      title_es: 'Despliegue Multi-Cloud con Terraform & Observabilidad',
      title_en: 'Multi-Cloud Infrastructure Deployment with Terraform & Observability',
      stack: ['Terraform', 'AWS Bedrock', 'AWS Lambda', 'GCP Compute', 'Jenkins', 'GitHub Actions', 'Docker'],
      diagram: `[Git Repo (GitHub / Jenkins)]
              │  (CI/CD Pipeline)
              ▼
    [Terraform Cloud / IaC]
         ┌────┴────────────────────────┐
         ▼                             ▼
   [AWS Ecosystem]              [GCP Ecosystem]
    • Bedrock (GenAI APIs)       • GCP Compute Engine
    • Lambda (Serverless)        • Cloud Storage
    • S3 Data Lake               • VPC Peering
         │                             │
         └─────────────┬───────────────┘
                       ▼
    [Centralized Observability & IAM Zero-Trust]`,
      summary_es: 'Plataforma de infraestructura como código modular tolerante a fallos entre AWS y Google Cloud Platform. Incorpora políticas de mínimo privilegio (IAM) y observabilidad integral continua con Jenkins y GitHub Actions.',
      summary_en: 'Modular, fault-tolerant Infrastructure as Code platform provisioned across AWS and Google Cloud Platform. Integrates zero-trust IAM policies and continuous observability via Jenkins and GitHub Actions.'
    },
    'core-modernization': {
      title_es: 'Fachadas API & Modernización del Core Bancario',
      title_en: 'RESTful API Facades & Banking Core Modernization',
      stack: ['Python', 'REST APIs', 'ETLT Pipelines', 'Microservices', 'CI/CD', 'Banrural Ecosystem'],
      diagram: `[Channel Clients / Modern Web & Mobile]
                   │
                   ▼
       [API Gateway & Governance Policies]
                   │
                   ▼
       [Python RESTful API Facades] (Microservices)
         ┌─────────┴─────────┐
         ▼                   ▼
   [Async ETLT Queue]   [Decoupled Services]
         │                   │
         ▼                   ▼
    [Legacy Banking Core Systems / Datastores]`,
      summary_es: 'Estrategia de desacoplamiento seguro y escalable de sistemas bancarios monolíticos hacia entornos de microservicios ágiles, respaldada por pipelines ETLT en Python y despliegues continuos automatizados.',
      summary_en: 'Secure, high-availability decoupling strategy for monolithic banking core systems into agile microservice architectures, supported by Python ETLT pipelines and automated continuous deployment.'
    }
  };

  // Terminal Code Snippets for Interactive Tabs
  const terminalSnippets = {
    'profile.py': `<span class="syntax-keyword">class</span> <span class="syntax-fn">DanielVelasquez</span>:
    <span class="syntax-variable">title</span> = <span class="syntax-string">"IT Services Governance Analyst & Cloud Architect"</span>
    <span class="syntax-variable">company</span> = <span class="syntax-string">"Banrural"</span>
    <span class="syntax-variable">education</span> = <span class="syntax-string">"B.S. Computer Science & Systems (URL)"</span>
    <span class="syntax-variable">location</span> = <span class="syntax-string">"Guatemala City"</span>
    <span class="syntax-variable">focus_areas</span> = [
        <span class="syntax-string">"Enterprise API Governance"</span>,
        <span class="syntax-string">"Core Banking Modernization"</span>,
        <span class="syntax-string">"Production Generative AI & RAG"</span>,
        <span class="syntax-string">"Multi-Cloud & Terraform IaC"</span>
    ]
    <span class="syntax-variable">status</span> = <span class="syntax-string">"Available for Strategic & Technical Challenges"</span>

<span class="syntax-comment"># Instantiating operator</span>
daniel = DanielVelasquez()
<span class="syntax-keyword">print</span>(f<span class="syntax-string">"Operator online: {daniel.title} @ {daniel.company}"</span>)`,

    'architecture.yaml': `<span class="syntax-tag">governance_framework</span>:
  <span class="syntax-attr">version</span>: <span class="syntax-string">"2026.1"</span>
  <span class="syntax-attr">standards</span>:
    - <span class="syntax-string">"API-First Enterprise Contract Governance"</span>
    - <span class="syntax-string">"Zero-Trust IAM Policy Enforcement"</span>
    - <span class="syntax-string">"Shift-Left Security in CI/CD Deployments"</span>
  <span class="syntax-attr">clouds</span>:
    <span class="syntax-attr">primary</span>: [<span class="syntax-string">"AWS"</span>, <span class="syntax-string">"OCI"</span>]
    <span class="syntax-attr">hybrid</span>: [<span class="syntax-string">"Azure"</span>, <span class="syntax-string">"GCP"</span>, <span class="syntax-string">"On-Premise Core"</span>]
  <span class="syntax-attr">resilience_sla</span>: <span class="syntax-number">99.99</span>`,

    'certs.json': `{
  <span class="syntax-string">"certifications"</span>: [
    { <span class="syntax-string">"code"</span>: <span class="syntax-string">"CKAD"</span>, <span class="syntax-string">"name"</span>: <span class="syntax-string">"Certified Kubernetes Application Developer"</span> },
    { <span class="syntax-string">"code"</span>: <span class="syntax-string">"CompTIA"</span>, <span class="syntax-string">"name"</span>: <span class="syntax-string">"Security+ (SY0-701)"</span> },
    { <span class="syntax-string">"code"</span>: <span class="syntax-string">"OCI-ARCH"</span>, <span class="syntax-string">"name"</span>: <span class="syntax-string">"OCI Architect Associate"</span> },
    { <span class="syntax-string">"code"</span>: <span class="syntax-string">"OCI-GENAI"</span>, <span class="syntax-string">"name"</span>: <span class="syntax-string">"OCI Generative AI Professional"</span> }
  ],
  <span class="syntax-string">"verified"</span>: <span class="syntax-boolean">true</span>
}`
  };

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const langToggleBtn = document.getElementById('lang-toggle');
  const toastEl = document.getElementById('toast');
  const modalOverlay = document.getElementById('arch-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-content');
  const terminalContent = document.getElementById('hero-terminal-code');
  const terminalTabBtns = document.querySelectorAll('.terminal-tab-btn');

  // Initialize
  function init() {
    applyLanguage(state.lang);
    setupScrollSpy();
    setupNavbarScroll();
    setupFilterButtons();
    setupTerminalTabs();
    setupCopyButtons();
    setupModalListeners();
    setupContactForm();
    setupSmoothScroll();
  }

  // Smooth Scroll
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Language Switcher
  function applyLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('daniel_portfolio_lang', lang);
    document.documentElement.setAttribute('lang', lang);

    if (langToggleBtn) {
      langToggleBtn.textContent = translations[lang].toggleBtn;
    }

    // Update all elements with data-lang-es / data-lang-en
    document.querySelectorAll('[data-lang-es]').forEach(el => {
      const text = el.getAttribute(`data-lang-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Update elements that display/hide based on lang class
    document.querySelectorAll('.lang-es, .lang-en').forEach(el => {
      if (el.classList.contains(`lang-${lang}`)) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = state.lang === 'es' ? 'en' : 'es';
      applyLanguage(nextLang);
      showToast(nextLang === 'es' ? 'Idioma: Español' : 'Language: English');
    });
  }

  // Navbar background on scroll
  function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Scroll Spy for Top Nav, Floating Dots & Mobile Dock
  function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sideNavItems = document.querySelectorAll('.side-nav-item');
    const mobileDockBtns = document.querySelectorAll('.mobile-dock-btn');

    function onScroll() {
      const scrollPos = window.scrollY + 180;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          // Top nav
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });

          // Floating side dots
          sideNavItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
          });

          // Mobile dock
          mobileDockBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('href') === `#${id}`);
          });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Terminal Window Tabs in Hero
  function setupTerminalTabs() {
    terminalTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (!tab || !terminalSnippets[tab]) return;

        terminalTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (terminalContent) {
          terminalContent.innerHTML = terminalSnippets[tab];
        }
      });
    });
  }

  // Project Category Filtering
  function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category?.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  // Modal Architecture Blueprint
  function setupModalListeners() {
    document.querySelectorAll('[data-inspect-project]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-inspect-project');
        const data = projectBlueprints[projectId];
        if (!data) return;

        const isEs = state.lang === 'es';
        modalTitle.textContent = isEs ? data.title_es : data.title_en;

        const tagsHtml = data.stack.map(s => `<span class="tech-tag">${s}</span>`).join(' ');

        modalBody.innerHTML = `
          <div style="margin-bottom: 16px;">
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
              ${isEs ? data.summary_es : data.summary_en}
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;">
              ${tagsHtml}
            </div>
          </div>
          <div style="margin-top: 10px;">
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan); margin-bottom: 6px;">
              // Architecture Diagram Blueprint
            </div>
            <pre class="arch-flow-box">${data.diagram}</pre>
          </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    modalCloseBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function closeModal() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Copy to Clipboard Buttons
  function setupCopyButtons() {
    document.querySelectorAll('[data-copy-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy-target');
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(translations[state.lang].toastCopied + `: ${textToCopy}`);
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(translations[state.lang].toastCopied);
        });
      });
    });
  }

  // Toast Notification
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // Contact Form Handling (Generates Mailto with encoded parameters)
  function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const subject = document.getElementById('form-subject')?.value || 'Executive Opportunity / Contact';
      const message = document.getElementById('form-message')?.value || '';

      const recipient = 'danielvelasquez32@gmail.com';
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      showToast(translations[state.lang].toastFormSuccess);
      window.location.href = mailtoUrl;
    });
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
