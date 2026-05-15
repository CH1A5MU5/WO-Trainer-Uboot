

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const allMainButtons = Array.from(document.querySelectorAll('.nav_button'));
    const allSubButtons = Array.from(document.querySelectorAll('.nav_subbutton'));
    const allButtons = [...allMainButtons, ...allSubButtons];
    const contentDiv = document.querySelector('content');

    // ----- Hilfsfunktion zum Laden von Inhalten (vorerst einfacher Text) -----
    function loadContent(pageTitle) {
        if (contentDiv) {
            contentDiv.innerHTML = `<h2>${pageTitle}</h2><p>Inhalt für "${pageTitle}" wird vorbereitet...</p>`;
        } else {
            console.warn('Content-Element nicht gefunden');
        }
    }



    function getSubButtonsFor(mainBtn) {
        const subs = [];
        let next = mainBtn.nextElementSibling;
        while (next && next.classList && next.classList.contains('nav_subbutton')) {
            subs.push(next);
            next = next.nextElementSibling;
        }
        return subs;
    }

    const subMap = new Map();
    allMainButtons.forEach(btn => {
        subMap.set(btn, getSubButtonsFor(btn));
    });

    function hideAllSubButtons() {
        allSubButtons.forEach(sub => sub.classList.remove('visible'));
    }

    function removeActiveFromAll() {
        allButtons.forEach(btn => btn.classList.remove('active'));
    }

    function setActiveMainButton(activeBtn) {
        // Hover-Effekte sofort deaktivieren


        // Hauptbuttons minimieren/aktivieren
        allMainButtons.forEach(btn => {
            if (btn === activeBtn) {
                btn.classList.remove('minimized');
            } else {
                btn.classList.add('minimized');
            }
        });

        hideAllSubButtons();
        const subs = subMap.get(activeBtn);
        if (subs) subs.forEach(sub => sub.classList.add('visible'));

        removeActiveFromAll();
        activeBtn.classList.add('active');

        // Nach der längsten Transition (0,8s) Hover wieder aktivieren

    }

    // Event-Listener für Hauptbuttons
    allMainButtons.forEach(btn => {
        btn.addEventListener('mousedown', function(e) {
            setActiveMainButton(btn);
            window.currentButtonId = btn.id;
            const buttonId = btn.id;
            if (typeof loadContentById === 'function') {
                loadContentById(btn.id);
            } else {
                console.warn('loadContentById nicht gefunden – contentLoader.js vergessen einzubinden?');
            }
            console.log('Hauptbutton geklickt:', btn.querySelector('.button-text')?.innerText);
        });
    });

    // Event-Listener für Unterbuttons
    allSubButtons.forEach(sub => {
        sub.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            LI_preset = null;
            removeActiveFromAll();
            sub.classList.add('active');
            window.currentButtonId = sub.id;
            const subId = sub.id;
            if (typeof loadContentById === 'function') {
                loadContentById(sub.id);
            }
            console.log('Unterbutton geklickt:', sub.id);
            console.log('Unterbutton geklickt:', sub.innerText.trim());
            // Hier später loadContent aufrufen
        });
    });

    // Initial ersten Hauptbutton aktivieren
    if (allMainButtons.length > 0) {
        setActiveMainButton(allMainButtons[0]);
        window.currentButtonId = 'MEN';
        show_Menu();
    }
});