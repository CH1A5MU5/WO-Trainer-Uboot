document.addEventListener('DOMContentLoaded', function() {
    // ---------- Sliderfeld öffnen/schließen (wie gehabt) ----------
    const toggleButton = document.getElementById('SliderToggleButton'); // Achtung: Groß-/Kleinschreibung prüfen!
    const sliderField = document.querySelector('.sliderfield');
    if (toggleButton && sliderField) {
        toggleButton.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            console.log('Slider fährt');
            sliderField.classList.toggle('visible');
            toggleButton.classList.toggle('active');
        });
    }
    // Klick außerhalb schließt


    // ---------- Rechenschieber: mittleres Bild verschieben ----------
    // ---------- Rechenschieber: Mittleres Bild verschieben (max. ±20 % der Containerbreite) ----------
    const sliderImage = document.getElementById('slidermitte');
    if (sliderImage) {
        const container = document.querySelector('.sliderfield');
        if (container) {
            let isDragging = false;
            let startX = 0;
            let currentTranslate = 0;
            let initialTranslate = 0;
            let minTranslate = 0, maxTranslate = 0;

            // Begrenzung: maximal 20 % der Containerbreite nach links/rechts
            function updateBounds() {
                const containerWidth = container.getBoundingClientRect().width;
                const maxOffset = containerWidth * 0.9;   // 20 % der Breite
                minTranslate = -maxOffset;
                maxTranslate = maxOffset;
            }

            function applyTranslate(translate) {
                translate = Math.min(maxTranslate, Math.max(minTranslate, translate));
                currentTranslate = translate;
                sliderImage.style.transform = `translateX(${translate}px)`;
            }

            function onMouseDown(e) {
                e.preventDefault();
                isDragging = true;
                startX = e.clientX;
                initialTranslate = currentTranslate;
                updateBounds();                // aktuelle Containerbreite
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
            }

            function onMouseMove(e) {
                if (!isDragging) return;
                const deltaX = e.clientX - startX;
                let newTranslate = initialTranslate + deltaX;
                applyTranslate(newTranslate);
            }

            function onMouseUp() {
                isDragging = false;
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            }

            sliderImage.addEventListener('mousedown', onMouseDown);
            sliderImage.setAttribute('draggable', 'false');

            // Initialisierung
            updateBounds();
            applyTranslate(0);   // Startposition in der Mitte
            window.addEventListener('resize', () => {
                if (!isDragging) {
                    updateBounds();
                    applyTranslate(currentTranslate);  // ggf. begrenzen
                }
            });
        }
    }

});