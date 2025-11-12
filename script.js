document.addEventListener('DOMContentLoaded', () => {
  
  // Para scrollar de volta ao topo
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  
  // Tema (Dark e Light Mode)
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.checked = false; 
  } else {
    body.classList.remove('light-mode');
    themeToggle.checked = true; 
    if (!savedTheme) {
      localStorage.setItem('theme', 'dark');
    }
  }

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  });

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a.nav-link');

  const updateActiveLink = () => {
    let currentSectionId = 'home'; // Padrão
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const activationPoint = window.pageYOffset + (window.innerHeight * 0.4); 

      if (activationPoint >= sectionTop && activationPoint < (sectionTop + sectionHeight)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);


  // Funcionalidade do Menu Mobile, mas ainda preciso corrigir 
  const nav = document.querySelector('nav');
  const navToggle = document.querySelector('.mobile-nav-toggle');

  // Abrir e fechar o menu clicando no botão
  navToggle.addEventListener('click', () => {
    const isVisible = nav.classList.toggle('nav-visible');
    navToggle.setAttribute('aria-expanded', isVisible);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('nav-visible')) {
        nav.classList.remove('nav-visible');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const emailBtn = document.getElementById('email-copy-btn');
  const copyMsg = document.getElementById('copy-success-msg');

  if(emailBtn) {
    emailBtn.addEventListener('click', () => {
      const email = 'kaiannlima@gmail.com';
      
      navigator.clipboard.writeText(email).then(() => {
        // Sucesso
        copyMsg.innerText = 'Copiado!';
        copyMsg.classList.add('show');
        
        setTimeout(() => {
          copyMsg.classList.remove('show');
        }, 2500); 
        
      }).catch(err => {
        console.error('Falha ao copiar e-mail: ', err);
        copyMsg.innerText = 'Falha ao copiar.';
        copyMsg.classList.add('show');
        
        setTimeout(() => {
          copyMsg.classList.remove('show');
        }, 2500);
      });
    });
  }

});