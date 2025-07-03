document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    
    // Vérifier si les éléments existent
    if (hamburger && menu) {
        hamburger.addEventListener("click", function () {
            menu.classList.toggle("visible"); // Afficher ou cacher le menu
        });
        
        // Fermer le menu si on clique en dehors (uniquement en mode mobile)
        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !hamburger.contains(event.target) && window.innerWidth <= 768) {
                menu.classList.remove("visible");
            }
        });
        
        // Assurer que le menu reste visible sur les grands écrans
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                menu.classList.add("visible");
            } else {
                menu.classList.remove("visible");
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const miniBtn = document.querySelector('.mini-btn');
    const domainList = document.querySelector('#domain-list');

    // Toggle l'affichage de la liste
    miniBtn.addEventListener('click', () => {
        domainList.classList.toggle('show');
    });

    // Cacher la liste si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!miniBtn.contains(e.target) && !domainList.contains(e.target)) {
            domainList.classList.remove('show');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Fonction pour gérer un slider spécifique
    function initSlider(sliderId) {
        let currentIndex = 0; // Index de l'image actuellement affichée
        let interval; // Pour stocker l'intervalle de défilement automatique
        let isAutoSliding = true; // Flag pour vérifier si le défilement automatique est actif

        const sliderWrapper = document.getElementById(sliderId);
        const sliderContainer = sliderWrapper.querySelector('.slider-container');
        const slides = sliderWrapper.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const prevBtn = sliderWrapper.querySelector('.prev-btn');
        const nextBtn = sliderWrapper.querySelector('.next-btn');

        // Fonction pour ajuster la largeur des images selon la taille de l'écran
        function adjustSliderLayout() {
            if (window.innerWidth <= 480) {
                slides.forEach(slide => {
                    slide.style.width = '100%';
                });
            } else {
                slides.forEach(slide => {
                    slide.style.width = '50%';
                    slide.style.margin = '0';
                });
            }
        }

        // Fonction pour démarrer le défilement automatique toutes les 5 secondes
        function startAutoSlide() {
            interval = setInterval(() => {
                moveSlide(1); // Défilement automatique vers la droite
            }, 5000);
        }

        // Fonction pour faire défiler les images
        function moveSlide(direction) {
            clearInterval(interval);
            currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

            // Déplacement du slider avec transition fluide
            if (window.innerWidth > 768) {
                sliderContainer.style.transform = `translateX(-${(currentIndex * 50)}%)`;
            } else {
                sliderContainer.style.transform = `translateX(-${(currentIndex * 100)}%)`;
            }

            if (isAutoSliding) {
                startAutoSlide();
            }
        }

        // Fonction pour ouvrir l'image en grand dans la modale
        function openModal(img) {
            const modal = document.getElementById('modal');
            const modalImage = document.getElementById('modalImage');
            modalImage.src = img.src;
            modal.style.display = 'flex';

            clearInterval(interval); // Arrêter le défilement automatique pendant que la modale est ouverte
        }

        // Fonction pour fermer la modale et reprendre le défilement
        function closeModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';

            if (isAutoSliding) {
                startAutoSlide();
            }
        }

        // Initialisation du slider
        function startSlider() {
            adjustSliderLayout();
            startAutoSlide(); // Démarrer le défilement automatique
        }

        // Fonction pour rendre le slider cyclique (boucle continue)
        function enableCyclicSlider() {
            sliderContainer.addEventListener("transitionend", () => {
                if (currentIndex === totalSlides) {
                    currentIndex = 0;
                    sliderContainer.style.transition = "none";
                    sliderContainer.style.transform = `translateX(0)`;
                    setTimeout(() => {
                        sliderContainer.style.transition = "transform 0.5s ease-in-out";
                    }, 50);
                } else if (currentIndex === -1) {
                    currentIndex = totalSlides - 1;
                    sliderContainer.style.transition = "none";
                    sliderContainer.style.transform = `translateX(-${(totalSlides - 1) * 50}%)`;
                    setTimeout(() => {
                        sliderContainer.style.transition = "transform 0.5s ease-in-out";
                    }, 50);
                }
            });
        }

        // Pré-charger les images pour de meilleures performances
        function preloadImages() {
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                const newImg = new Image();
                newImg.src = img.src;
            });
        }

        // Ajouter les écouteurs pour les boutons précédent/suivant
        prevBtn.addEventListener('click', () => moveSlide(-1));
        nextBtn.addEventListener('click', () => moveSlide(1));

        // Lancer le slider dès que la page est prête
        startSlider();
        enableCyclicSlider();
        preloadImages();
        window.addEventListener('resize', adjustSliderLayout);
    }

    // Initialisation de tous les sliders
    initSlider('slider1');
    initSlider('slider2');
    initSlider('slider3');
});

// Fonction pour ouvrir l'image dans le modal
function openModal(img) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = img.src; // Mettre l'image dans le modal
    modal.style.display = 'flex'; // Afficher le modal

    // Arrêter le défilement automatique pendant que la modale est ouverte
    clearInterval(interval);
}

// Fonction pour fermer le modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; // Masquer le modal

    // Reprendre le défilement automatique après la fermeture du modal
    if (isAutoSliding) {
        startAutoSlide();
    }
}

// Exemple d'événement d'ouverture du modal sur les images du slider
document.querySelectorAll('.slider-container .slide img').forEach(img => {
    img.addEventListener('click', () => openModal(img));
});

// Fonction pour initialiser le slider
function startSlider() {
    adjustSliderLayout();
    startAutoSlide();  // Démarrer le défilement automatique

    // Lier l'ouverture du modal pour chaque image
    document.querySelectorAll('.slider-container .slide img').forEach(img => {
        img.addEventListener('click', () => openModal(img));
    });
}
