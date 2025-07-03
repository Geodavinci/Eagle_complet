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

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("pub-video");
    const source = document.getElementById("video-source");

    const playlist = [
        "../videos/n8.mp4",
        "../videos/n1.mp4",
        "../videos/n6.mp4",
        "../videos/n7.mp4"        
    ];

    let current = 0;

    video.addEventListener('ended', () => {
        current = (current + 1) % playlist.length;
        source.src = playlist[current];
        video.load();
        video.play();
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(video);
});


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
});


