// help.js – öffnet das Hilfefenster für die aktuell aktive Button-ID
document.addEventListener('DOMContentLoaded', function() {
    const helpButton = document.getElementById('HelpButton');
    if (!helpButton) {
        console.warn('HelpButton nicht gefunden');
        return;
    }

    helpButton.addEventListener('click', function() {
        const activeId = window.currentButtonId;
        let helpPath;
        if (!activeId) {
            alert('Keine aktive Übung ausgewählt.');
            return;
        }

        // Extrahieren des Hauptbutton-Teils (erste 3 Zeichen, z.B. 'DOT' aus 'DOT_30M')
        let mainPart = activeId.length >= 3 ? activeId.slice(0, 3) : activeId;
        // Konstruiere Pfad: content/[hauptteil]/[activeId]_help.html
        if (mainPart === 'SRE') {
            helpPath = `content/SRE/SRE_help.html`
        }
        else {
            helpPath = `content/${mainPart}/${activeId}_help.html`;
        }

        // Fenster öffnen
        const helpWindow = window.open(helpPath, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
        if (!helpWindow) {
            alert('Bitte erlauben Sie Pop-ups für diese Seite, um die Hilfe zu öffnen.');
        }
    });
});