// Efecto de escritura para el texto
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Desarrollador Full Stack',
    'Analista de Sistemas',
    'Creador de Soluciones',
    'Apasionado por la Tecnología'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Iniciar el efecto de escritura
typeEffect();

// Configuración de particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#64ffda'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#64ffda',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Cargar proyectos dinámicamente
const proyectosContainer = document.getElementById('proyectosContainer');

/**
 * Crea una tarjeta HTML para mostrar la información de un proyecto
 * @param {Object} proyecto - Objeto con la información del proyecto
 * @param {string} proyecto.titulo - Título del proyecto
 * @param {string} proyecto.descripcion - Descripción del proyecto
 * @param {string} proyecto.imagen - Nombre del archivo de imagen del proyecto
 * @param {string} proyecto.proceso_automatizacion - Nombre del archivo de imagen del proceso
 * @param {string} proyecto.fecha - Fecha de realización del proyecto
 * @param {string} proyecto.link - URL del demo del proyecto (YouTube u otro)
 * @param {string} [proyecto.github] - URL opcional del repositorio GitHub
 * @param {Array<string>} proyecto.tecnologias - Array de tecnologías usadas
 * @returns {HTMLElement} Elemento div con la tarjeta del proyecto
 */
function createProjectCard(proyecto) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-content">
            <img src="img/proyectos/${proyecto.imagen}" alt="${proyecto.titulo}" loading="lazy">
            <span class="project-date">${proyecto.fecha}</span>
            <div class="project-info">
                <div>
                    <h3>${proyecto.titulo}</h3>
                    <p>${proyecto.descripcion}</p>
                    <hr>
                    <p class="project-creator">${proyecto.creadores}</p>
                    <hr>
                    <p>Proceso de desarrollo:</p>
                    <img src="img/proyectos/${proyecto.proceso_automatizacion}" alt="Proceso" class="process-image">
                    <div class="tecnologias-container">
                        ${getTecnologias(proyecto.tecnologias)}
                    </div>
                </div>
            </div>
            <div class="project-links">
                ${proyecto.link ? `
                    <button class="demo-link" onclick="window.open('${proyecto.link}', '_blank')">
                        <i class="fas fa-play-circle"></i> Ver Demo
                    </button>
                ` : ''}
                ${proyecto.github ? `
                    <button class="github-link" onclick="window.open('${proyecto.github}', '_blank')">
                        <i class="fab fa-github"></i> GitHub
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Formatea las tecnologías como etiquetas HTML
 * @param {Array<string>} tecnologias - Array de nombres de tecnologías
 * @returns {string} HTML con las etiquetas de tecnologías
 */
function getTecnologias(tecnologias) {
    return tecnologias.map(tech => `<span class="tecnologia">${tech}</span>`).join('');
}

// Función para validar el enlace de demo
function validateDemoLink(event, url) {
    if (url === '#' || !url.startsWith('http')) {
        event.preventDefault();
        alert('El enlace de demo no está disponible en este momento.');
        return false;
    }
    return true;
}

// Actualización dinámica de estadísticas
function updateStats() {
    const yearsCount = document.getElementById('yearsCount');
    const projectsCount = document.getElementById('projectsCount');
    const languagesCount = document.getElementById('languagesCount');

    // Calcular años de desarrollo (desde 2022)
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const yearsOfDev = currentYear - startYear;

    // Obtener número real de proyectos únicos
    const uniqueProjects = new Set(proyectos.map(p => p.titulo)).size;

    // Obtener número real de idiomas
    const uniqueLanguages = informacionPersonal.idiomas.length;

    // Animación de conteo para años
    animateCount(yearsCount, 0, yearsOfDev, 1500, true);
    // Animación de conteo para proyectos
    animateCount(projectsCount, 0, uniqueProjects, 1500, false);
    // Animación de conteo para idiomas
    animateCount(languagesCount, 0, uniqueLanguages, 1500, false);
}

function animateCount(element, start, end, duration, addPlus = false) {
    if (!element) return;
    
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + (addPlus ? '+' : '');
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

/**
 * Carga los proyectos en el contenedor con animación
 * Filtra proyectos duplicados y agrega delays para la animación
 */
function loadProjects() {
    // Limpiar el contenedor primero
    proyectosContainer.innerHTML = '';
    
    // Filtrar proyectos duplicados por título
    const uniqueProjects = proyectos.filter((proyecto, index, self) =>
        index === self.findIndex((p) => p.titulo === proyecto.titulo)
    );

    // Cargar proyectos únicos con animación
    uniqueProjects.forEach((proyecto, index) => {
        const card = createProjectCard(proyecto);
        card.style.animationDelay = `${index * 0.2}s`;
        proyectosContainer.appendChild(card);
    });
}

// Cargar proyectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadProjects);

// Animación al hacer scroll
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1
});

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Carrusel de imágenes de perfil
const profileImages = [
    'portadopor.png',
    'imagen-omar.jpg'
];

let currentImageIndex = 0;
const profileImage = document.querySelector('.profile-image');

function changeProfileImage() {
    const nextIndex = (currentImageIndex + 1) % profileImages.length;
    const nextImage = profileImages[nextIndex];
    
    // Crear nueva imagen para precargar
    const tempImage = new Image();
    tempImage.src = `/img/${nextImage}`;
    
    tempImage.onload = () => {
        // Agregar clase para la animación de salida
        profileImage.classList.add('fade-out');
        
        setTimeout(() => {
            profileImage.src = `/img/${nextImage}`;
            // Quitar clase de salida y agregar clase de entrada
            profileImage.classList.remove('fade-out');
            profileImage.classList.add('fade-in');
            
            // Limpiar clase de entrada después de la animación
            setTimeout(() => {
                profileImage.classList.remove('fade-in');
            }, 500);
            
            currentImageIndex = nextIndex;
        }, 500);
    };

    tempImage.onerror = () => {
        console.error(`Error al cargar la imagen: ${nextImage}`);
        // Si hay error, intentar con la siguiente imagen
        currentImageIndex = nextIndex;
        changeProfileImage();
    };
}

// Cambiar imagen cada 3 segundos
const carouselInterval = setInterval(changeProfileImage, 3000);

// Detener el carrusel cuando la pestaña no está visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(carouselInterval);
    } else {
        setInterval(changeProfileImage, 3000);
    }
});

// Permitir pausar el carrusel al hacer hover sobre la imagen
const profileContainer = document.querySelector('.profile-image-container');
profileContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
profileContainer.addEventListener('mouseleave', () => setInterval(changeProfileImage, 3000));

// Iniciar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    loadProjects();
});

// Navbar functionality
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle menú móvil
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Actualizar link activo al hacer scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Terminal functionality
const terminalInput = document.querySelector('.terminal-input');
const terminalOutput = document.querySelector('.terminal-output');
const terminalBody = document.querySelector('.terminal-body');

const commands = {
    help: {
        description: 'Muestra la lista de comandos disponibles',
        execute: () => {
            return `
                <div class="terminal-help">
                    <dt>help</dt><dd>Muestra esta lista de comandos</dd>
                    <dt>clear</dt><dd>Limpia la terminal</dd>
                    <dt>skills</dt><dd>Muestra mis habilidades técnicas</dd>
                    <dt>projects</dt><dd>Lista mis proyectos</dd>
                    <dt>contact</dt><dd>Muestra mi información de contacto</dd>
                    <dt>about</dt><dd>Información sobre mí</dd>
                    <dt>social</dt><dd>Mis redes sociales</dd>
                </div>
            `;
        }
    },
    clear: {
        description: 'Limpia la terminal',
        execute: () => {
            terminalOutput.innerHTML = '';
            return '';
        }
    },
    skills: {
        description: 'Muestra mis habilidades técnicas',
        execute: () => {
            const skillsTable = informacionPersonal.tecnologias.map(([tech, level]) => {
                const stars = '★'.repeat(level) + '☆'.repeat(10 - level);
                return `<tr><td>${tech}</td><td>${stars}</td></tr>`;
            }).join('');

            return `
                <table class="terminal-table">
                    <thead>
                        <tr>
                            <th>Tecnología</th>
                            <th>Nivel</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${skillsTable}
                    </tbody>
                </table>
            `;
        }
    },
    projects: {
        description: 'Lista mis proyectos',
        execute: () => {
            return proyectos.map(p => `
                <div class="terminal-result">
                    <span class="info">→ ${p.titulo}</span>
                    <br>
                    ${p.descripcion}
                    <br>
                    <span class="success">Tecnologías:</span> ${p.tecnologias.join(', ')}
                </div>
            `).join('');
        }
    },
    contact: {
        description: 'Muestra mi información de contacto',
        execute: () => {
            return `
                <div class="terminal-result">
                    <p>📧 Email: <span class="info">omar.rivera@vallegrande.edu.pe</span></p>
                    <p>📱 WhatsApp: <span class="info">+51 930720474</span></p>
                </div>
            `;
        }
    },
    about: {
        description: 'Información sobre mí',
        execute: () => {
            return `
                <div class="terminal-result">
                    <p>${informacionPersonal.nombre}</p>
                    <p>${informacionPersonal.subtitulo}</p>
                    <p>Nacionalidad: ${informacionPersonal.otros[0][1]}</p>
                    <p>Edad: ${informacionPersonal.otros[1][1]}</p>
                </div>
            `;
        }
    },
    social: {
        description: 'Mis redes sociales',
        execute: () => {
            return informacionPersonal.redes.map(([red, url]) => `
                <div class="terminal-result">
                    <span class="info">${red}:</span> ${url}
                </div>
            `).join('');
        }
    }
};

let commandHistory = [];
let historyIndex = -1;

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        
        // Agregar comando al historial
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }

        // Mostrar el comando ingresado
        terminalOutput.innerHTML += `
            <p class="terminal-command">
                <span class="terminal-prompt">omar@portfolio:~$</span> ${command}
            </p>
        `;

        // Ejecutar el comando
        if (command in commands) {
            terminalOutput.innerHTML += commands[command].execute();
        } else if (command) {
            terminalOutput.innerHTML += `
                <p class="error">Command not found: ${command}</p>
                <p class="info">Escribe 'help' para ver los comandos disponibles</p>
            `;
        }

        // Limpiar input y scroll al final
        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }
});

// Mantener el foco en el input
terminalInput.addEventListener('blur', () => {
    setTimeout(() => terminalInput.focus(), 10);
});

// Mostrar mensaje inicial
document.addEventListener('DOMContentLoaded', () => {
    terminalOutput.innerHTML = `
        <p class="info">¡Bienvenido a mi terminal interactiva! 🚀</p>
        <p class="info">Escribe 'help' para ver los comandos disponibles</p>
    `;
});

// Terminal visibility control
document.addEventListener('DOMContentLoaded', () => {
    const terminalSection = document.querySelector('.terminal-section');
    let hasInteracted = false;

    // Mostrar terminal al inicio
    terminalSection.style.display = 'flex';

    // Función para ocultar terminal
    function hideTerminal() {
        if (!hasInteracted) {
            terminalSection.style.opacity = '0';
            setTimeout(() => {
                terminalSection.style.display = 'none';
            }, 300); // Esperar a que termine la transición
            hasInteracted = true;
        }
    }

    // Ocultar terminal al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // Ajusta este valor según necesites
            hideTerminal();
        }
    });

    // Ocultar terminal al hacer clic en enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', hideTerminal);
    });

    // Ocultar terminal al hacer clic fuera de ella
    document.addEventListener('click', (e) => {
        if (!terminalSection.contains(e.target) && !hasInteracted) {
            hideTerminal();
        }
    });
});
