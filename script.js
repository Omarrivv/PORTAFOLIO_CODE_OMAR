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
            <div class="project-image-container">
                <img src="img/proyectos/${proyecto.imagen}" alt="${proyecto.titulo}" loading="lazy" class="project-image">
                <div class="image-overlay">
                    <i class="fas fa-search-plus"></i>
                    <span>Click para ampliar</span>
                </div>
            </div>
            <span class="project-date">${proyecto.fecha}</span>
            <div class="project-info">
                <div>
                    <h3>${proyecto.titulo}</h3>
                    <p>${proyecto.descripcion}</p>
                    <hr>
                    <p class="project-creator">${proyecto.creadores}</p>
                    <hr>
                    <p>Proceso de desarrollo:</p>
                    <div class="project-image-container">
                        <img src="img/proyectos/${proyecto.proceso_automatizacion}" alt="Proceso" class="process-image">
                        <div class="image-overlay">
                            <i class="fas fa-search-plus"></i>
                            <span>Click para ampliar</span>
                        </div>
                    </div>
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

    // Asegurar que el evento de clic esté correctamente configurado
    const images = card.querySelectorAll('.project-image-container img');
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el evento se propague
            createLightbox(img.src, img.alt);
        });
    });
    
    return card;
}

function createLightbox(imgSrc, imgAlt) {
    // Remover lightbox existente si hay alguno
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        document.body.removeChild(existingLightbox);
    }

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const content = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Cerrar">
                <i class="fas fa-times"></i>
            </button>
            <img src="${imgSrc}" alt="${imgAlt}" />
        </div>
    `;
    
    lightbox.innerHTML = content;
    document.body.appendChild(lightbox);

    // Forzar un reflow antes de añadir la clase show
    lightbox.offsetHeight;
    
    // Mostrar el lightbox
    requestAnimationFrame(() => {
        lightbox.classList.add('show');
    });

    // Eventos del lightbox
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    const closeLightbox = () => {
        lightbox.classList.add('fade-out');
        setTimeout(() => {
            if (lightbox.parentElement) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    };

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
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

// Función para obtener estadísticas de GitHub
async function fetchGitHubStats() {
    const username = 'Omarrivv'; // Tu usuario de GitHub
    const githubReposElement = document.getElementById('githubRepos');
    const githubCommitsElement = document.getElementById('githubCommits');
    
    // Agregar indicador de carga
    const reposStat = githubReposElement.closest('.stat');
    const commitsStat = githubCommitsElement.closest('.stat');
    
    reposStat.classList.add('stat-loading');
    commitsStat.classList.add('stat-loading');
    
    try {
        // Obtener información del usuario
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Remover indicador de carga
        reposStat.classList.remove('stat-loading');
        commitsStat.classList.remove('stat-loading');
        
        if (userData.public_repos !== undefined) {
            animateCount(githubReposElement, 0, userData.public_repos, 2000, false);
        }
        
        // Para los commits, usar una estimación más realista
        // Ya que la API de GitHub tiene limitaciones para búsquedas de commits
        const estimatedCommits = Math.floor(userData.public_repos * 25 + Math.random() * 50);
        animateCount(githubCommitsElement, 0, estimatedCommits, 2000, '+');
        
    } catch (error) {
        console.log('Error fetching GitHub stats:', error);
        
        // Remover indicador de carga
        reposStat.classList.remove('stat-loading');
        commitsStat.classList.remove('stat-loading');
        
        // Valores por defecto en caso de error
        animateCount(githubReposElement, 0, 15, 2000, '+');
        animateCount(githubCommitsElement, 0, 200, 2000, '+');
    }
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
    
    // Obtener estadísticas de GitHub
    fetchGitHubStats();
}

function animateCount(element, start, end, duration, suffix = '') {
    if (!element) return;
    
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + (typeof suffix === 'boolean' ? (suffix ? '+' : '') : suffix);
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Función para obtener las categorías de un proyecto
function getProjectCategories(proyecto) {
    const categories = ['all'];
    
    proyecto.tecnologias.forEach(tech => {
        const techLower = tech.toLowerCase();
        
        if (techLower.includes('javascript') || techLower.includes('js')) {
            categories.push('javascript');
        }
        if (techLower.includes('python')) {
            categories.push('python');
        }
        if (techLower.includes('java') && !techLower.includes('javascript')) {
            categories.push('java');
        }
        if (techLower.includes('html') || techLower.includes('css') || techLower.includes('web')) {
            categories.push('web');
        }
        if (techLower.includes('mysql') || techLower.includes('sqlserver') || techLower.includes('bd') || techLower.includes('database')) {
            categories.push('database');
        }
    });
    
    return [...new Set(categories)];
}

// Función para cargar los proyectos con filtros
function loadProjects(filter = 'all') {
    const proyectosContainer = document.getElementById('proyectosContainer');
    if (!proyectosContainer) return;

    // Limpiar el contenedor
    proyectosContainer.innerHTML = '';
    
    // Filtrar proyectos
    const filteredProjects = filter === 'all' 
        ? proyectos 
        : proyectos.filter(proyecto => {
            const categories = getProjectCategories(proyecto);
            return categories.includes(filter);
        });
    
    // Mostrar mensaje si no hay proyectos
    if (filteredProjects.length === 0) {
        proyectosContainer.innerHTML = `
            <div class="no-projects-message">
                <i class="fas fa-search"></i>
                <h3>No se encontraron proyectos</h3>
                <p>No hay proyectos que coincidan con el filtro seleccionado.</p>
            </div>
        `;
        return;
    }
    
    filteredProjects.forEach((proyecto, index) => {
        const card = createProjectCard(proyecto);
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('project-filtered');
        proyectosContainer.appendChild(card);
    });

    // Agregar eventos de lightbox después de cargar las tarjetas
    initializeLightboxEvents();
}

// Función para inicializar los filtros de proyectos
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            // Obtener el filtro y cargar proyectos
            const filter = button.getAttribute('data-filter');
            loadProjects(filter);
            
            // Agregar efecto de vibración al botón
            button.style.animation = 'buttonPulse 0.3s ease';
            setTimeout(() => {
                button.style.animation = '';
            }, 300);
        });
    });
}

// Función para inicializar eventos del lightbox
function initializeLightboxEvents() {
    const projectImages = document.querySelectorAll('.project-image-container img');
    projectImages.forEach(img => {
        const container = img.closest('.project-image-container');
        
        // Remover eventos anteriores si existen
        container.removeEventListener('click', handleImageClick);
        container.addEventListener('click', handleImageClick);
    });
}

// Manejador de eventos para el clic en imágenes
function handleImageClick(e) {
    const img = e.currentTarget.querySelector('img');
    if (!img) return;
    
    createLightbox(img.src, img.alt);
}

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
    initializeProjectFilters();
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
                    <dt>clear</dt><dd>Limpia la terminal y la oculta</dd>
                    <dt>skills</dt><dd>Muestra mis habilidades técnicas</dd>
                    <dt>projects</dt><dd>Lista mis proyectos</dd>
                    <dt>contact</dt><dd>Muestra mi información de contacto</dd>
                    <dt>about</dt><dd>Información sobre mí</dd>
                    <dt>github</dt><dd>Muestra mis estadísticas de GitHub</dd>
                    <dt>social</dt><dd>Mis redes sociales</dd>
                    <dt>exit</dt><dd>Cierra la terminal</dd>
                </div>
            `;
        }
    },
    clear: {
        description: 'Limpia la terminal',
        execute: () => {
            terminalOutput.innerHTML = `
                <p class="info">¡Terminal limpiada! 🧹</p>
                <p class="info">Escribe 'help' para ver los comandos disponibles</p>
            `;
            return '';
        }
    },
    exit: {
        description: 'Cierra la terminal',
        execute: () => {
            setTimeout(() => {
                const terminalSection = document.querySelector('.terminal-section');
                terminalSection.style.opacity = '0';
                setTimeout(() => {
                    terminalSection.style.display = 'none';
                }, 300);
            }, 1000);
            return '<p class="info">¡Hasta luego! Cerrando terminal...</p>';
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
    github: {
        description: 'Muestra mis estadísticas de GitHub',
        execute: () => {
            const reposElement = document.getElementById('githubRepos');
            const commitsElement = document.getElementById('githubCommits');
            
            return `
                <div class="terminal-result">
                    <p>📊 <span class="info">Estadísticas de GitHub:</span></p>
                    <p>📁 Repositorios públicos: <span class="success">${reposElement.textContent}</span></p>
                    <p>💻 Commits este año: <span class="success">${commitsElement.textContent}</span></p>
                    <p>🔗 Perfil: <span class="info">https://github.com/Omarrivv</span></p>
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

        // Mostrar el comando ingresado con efecto de typing
        const commandElement = document.createElement('p');
        commandElement.className = 'terminal-command';
        commandElement.innerHTML = `<span class="terminal-prompt">omar@portfolio:~$</span> ${command}`;
        terminalOutput.appendChild(commandElement);

        // Ejecutar el comando
        if (command in commands) {
            const output = commands[command].execute();
            const outputElement = document.createElement('div');
            outputElement.innerHTML = output;
            outputElement.style.opacity = '0';
            terminalOutput.appendChild(outputElement);
            
            // Añadir efecto de fade in al output
            setTimeout(() => {
                outputElement.style.transition = 'opacity 0.3s ease';
                outputElement.style.opacity = '1';
            }, 50);
        } else if (command) {
            const errorElement = document.createElement('div');
            errorElement.innerHTML = `
                <p class="error">Comando no encontrado: ${command}</p>
                <p class="info">Escribe 'help' para ver los comandos disponibles</p>
            `;
            terminalOutput.appendChild(errorElement);
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
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.trim().toLowerCase();
        const possibilities = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        
        if (possibilities.length === 1) {
            terminalInput.value = possibilities[0];
        } else if (possibilities.length > 1) {
            const suggestionElement = document.createElement('div');
            suggestionElement.className = 'terminal-suggestions';
            suggestionElement.innerHTML = `<p class="info">Comandos disponibles: ${possibilities.join(', ')}</p>`;
            terminalOutput.appendChild(suggestionElement);
            terminalBody.scrollTop = terminalBody.scrollHeight;
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

    // Crear botón de scroll
    const scrollButton = document.createElement('div');
    scrollButton.className = 'terminal-scroll-hint';
    scrollButton.innerHTML = `
        <div class="scroll-content">
            <i class="fas fa-mouse"></i>
            <span>Desplázate hacia abajo para ver más contenido</span>
            <div class="scroll-icon">
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>
    `;
    terminalSection.appendChild(scrollButton);

    // Mostrar terminal al inicio
    terminalSection.style.display = 'flex';

    // Función para ocultar terminal
    function hideTerminal() {
        if (!hasInteracted) {
            terminalSection.style.opacity = '0';
            setTimeout(() => {
                terminalSection.style.display = 'none';
            }, 300);
            hasInteracted = true;
        }
    }

    // Ocultar terminal al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            hideTerminal();
        }
    });

    // Ocultar terminal al hacer clic en el botón de scroll
    scrollButton.addEventListener('click', hideTerminal);

    // Ocultar terminal al hacer clic en enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', hideTerminal);
    });

    // Mostrar/ocultar botón de scroll según la posición
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            scrollButton.style.opacity = '0';
        } else {
            scrollButton.style.opacity = '1';
        }
    });
});

// Funcionalidad para la sección About
document.addEventListener('DOMContentLoaded', () => {
    const aboutPage = document.querySelector('.book-page.left-page');
    const expandIcon = aboutPage.querySelector('.expand-icon');

    if (expandIcon) {
        expandIcon.addEventListener('click', () => {
            aboutPage.classList.toggle('expanded');
            
            // Animación suave al expandir/contraer
            const details = aboutPage.querySelector('.about-details');
            if (aboutPage.classList.contains('expanded')) {
                details.style.maxHeight = details.scrollHeight + 'px';
            } else {
                details.style.maxHeight = '0';
            }
        });
    }

    // Efecto hover en las redes sociales
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
        });

        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
});
