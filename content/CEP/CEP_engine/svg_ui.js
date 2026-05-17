// ==================== HAUPTFUNKTION ====================
function create_ui() {
    split_ui_field();
    create_input('own');
    create_input('target');
    create_real_situation();
    updateTargetDisplay(); // initiale Anzeige
}

// ==================== LAYOUT-ERZEUGUNG ====================
function split_ui_field() {
    const body_down = document.getElementById('content_body_down');
    body_down.style.flexGrow = '0';

    // Container für die beiden Eingabebereiche (65 % Breite)
    const input_container = document.createElement('div');
    input_container.style.width = '65%';
    input_container.style.display = 'flex';
    input_container.style.flexDirection = 'row';
    input_container.style.gap = '5px';

    // Bereich Eigenboot (weiß)
    const own_input = document.createElement('div');
    own_input.id = 'own_input';
    own_input.style.width = '50%';
    own_input.style.height = '100%';
    own_input.style.padding = '10px';

    // Bereich Gegner
    const target_input = document.createElement('div');
    target_input.id = 'target_input';
    target_input.style.width = '50%';
    target_input.style.height = '100%';
    target_input.style.padding = '10px';

    input_container.append(own_input, target_input);

    // Bereich für die reale Situation (35 % Breite, quadratisch)
    const real_sit = document.createElement('div');
    real_sit.style.width = '35%';
    real_sit.style.aspectRatio = '1/1';
    real_sit.id = 'real_sit_display';

    // Einheitliche Basisstile für alle drei Behälter
    [own_input, target_input, real_sit].forEach(container => {
        container.style.borderRadius = '10px';
        container.style.border = '1px solid var(--unselected-lightgrey)';
        container.style.backgroundColor = 'white';
    });

    body_down.append(input_container, real_sit);
}

// ==================== EINGABEFELD ERZEUGEN (Eigen/Gegner) ====================
function create_input(side) {
    const config = side === 'own'
        ? { title: 'Eigenboot:', id: 'own_input', accent: '#697a88' }
        : { title: 'Gegner:', id: 'target_input', accent: '#004471' };

    const container = document.getElementById(config.id);
    container.style.display = 'flex';
    container.style.flexDirection = 'column';

    // Unterer Bereich: links Kurs, rechts Geschwindigkeit
    const downside = document.createElement('div');
    downside.style.display = 'flex';
    downside.style.flexDirection = 'row';
    downside.style.flex = '1';

    // Linke Seite (66.66 %) – Kurseingabe
    const leftside = document.createElement('div');
    leftside.style.width = '66.66666%';
    leftside.style.height = '100%';
    leftside.style.display = 'flex';
    leftside.style.flexDirection = 'column';
    leftside.style.justifyContent = 'space-between';
    create_course_input(leftside, config.accent, side);

    // Rechte Seite (33.33 %) – Geschwindigkeitseingabe
    const rightside = document.createElement('div');
    rightside.style.width = '33.33333%';
    rightside.style.height = '100%';
    rightside.style.display = 'flex';
    rightside.style.flexDirection = 'column';
    rightside.style.justifyContent = 'space-between';
    create_speed_input(rightside, config.accent, side);

    downside.append(leftside, rightside);

    // Überschrift
    const titleDiv = document.createElement('div');
    titleDiv.style.height = '18px';
    titleDiv.style.display = 'flex';
    titleDiv.style.flexDirection = 'column';
    titleDiv.style.justifyContent = 'center';
    titleDiv.style.marginBottom = '10px';
    titleDiv.textContent = config.title;

    container.append(titleDiv, downside);
}

function create_real_situation() {
    // TODO: Implementierung (z. B. Canvas für die reale Situation)
}

// ==================== SPEZIFISCHE EINGABEHILFEN ====================
function create_course_input(container, accent, side) {
    return create_input_ui(container, accent, '360', 'course', '', '$\\mathrm{K_e}$' + '=', side);
}

function create_speed_input(container, accent, side) {
    // Gegner: 0-24 kn, Eigenboot: 0-8 kn
    const maxSpeed = (side === 'target') ? 24 : 8;
    return create_input_ui(container, accent, '0.0', 'speed', 'kn', '$\\mathrm{v_e}$' + '=', side, maxSpeed);
}


// ==================== ALLGEMEINE EINGABE-UI (Ist/Slider/Soll) ====================
function create_input_ui(container, accent, baseValue, inputType, unit, label, side, maxSpeed = 8) {
    // Istwert-Anzeige (Label, Wert, Platzhalter)
    const istwert = document.createElement('div');
    istwert.style.display = 'flex';
    istwert.style.flexDirection = 'row';
    istwert.style.width = '100%';

    const sign = document.createElement('div');
    sign.textContent = label;
    //sign.style.width = '20px';
    sign.style.textAlign = 'left';
    sign.style.flex = '1 1 0';
    sign.style.minWidth = '0';
    sign.style.whiteSpace = 'nowrap';
    sign.style.overflow = 'hidden';
    sign.style.textOverflow = 'ellipsis';

    const value = document.createElement('div');
    value.textContent = baseValue;
    value.style.textAlign = 'center';
    value.style.flex = '0 0 auto';
    value.className = `istwert-${inputType}`;



    const rightspace = document.createElement('div');
    //rightspace.style.width = '20px';
    rightspace.innerHTML = unit;
    rightspace.style.textAlign = 'right';
    rightspace.style.flex = '1 1 0';
    rightspace.style.minWidth = '0';
    rightspace.style.whiteSpace = 'nowrap';
    rightspace.style.overflow = 'hidden';
    rightspace.style.textOverflow = 'ellipsis';

    istwert.append(sign, value, rightspace);

    // Slider (SVG-Drehregler oder Schieberegler)
    const sliderContainer = document.createElement('div');
    if (inputType === 'course') {
        createDialSVG(sliderContainer, accent, 0, side);
    } else if (inputType === 'speed') {
        createSliderSVG(sliderContainer, accent, 0, maxSpeed, 0, side);
    }

    // Gemeinsame Höhe für beide SVG-Container erzwingen
    sliderContainer.style.height = '70%';
    sliderContainer.style.display = 'flex';
    sliderContainer.style.alignItems = 'center';
    sliderContainer.style.justifyContent = 'center';

    // Das enthaltene SVG skalieren
    if (sliderContainer.children.length > 0) {
        const svg = sliderContainer.children[0];
        svg.style.height = '100%';
        svg.style.width = 'auto';
    }

    // Sollwert-Anzeige (mit Klasse für späteres Update)
    const sollwert_container = document.createElement('div');
    sollwert_container.style.display = 'flex';
    sollwert_container.style.flexDirection = 'row';
    sollwert_container.style.width = '100%';

    const left_sollwert = document.createElement('div');

    left_sollwert.innerHTML = '';
    left_sollwert.style.textAlign = 'right';
    left_sollwert.style.flex = '1 1 0';
    left_sollwert.style.minWidth = '0';
    left_sollwert.style.whiteSpace = 'nowrap';
    left_sollwert.style.overflow = 'hidden';
    left_sollwert.style.textOverflow = 'ellipsis';

    const sollwert = document.createElement('div');
    sollwert.className = `sollwert-${inputType}`;   // z. B. "sollwert-course" oder "sollwert-speed"
    sollwert.textContent = '123';
    sollwert.style.textAlign = 'center';

    const right_sollwert = document.createElement('div');

    right_sollwert.innerHTML = unit;
    right_sollwert.style.textAlign = 'right';
    right_sollwert.style.flex = '1 1 0';
    right_sollwert.style.minWidth = '0';
    right_sollwert.style.whiteSpace = 'nowrap';
    right_sollwert.style.overflow = 'hidden';
    right_sollwert.style.textOverflow = 'ellipsis';

    sollwert_container.append(left_sollwert, sollwert, right_sollwert);

    container.append(istwert, sliderContainer, sollwert_container);
    return container;
}

// ==================== SVG-DREHREGLER (Kurs) ====================
function createDialSVG(parentContainer, accentcolor, initialDeg = 0, side) {
    const svgNS = "http://www.w3.org/2000/svg";
    const width = '150', height = '150';
    const cx = width/2, cy = height/2;
    const radius = '72';

    const black_color = '#000000';
    const background_grey = '#bec8d7';

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.cursor = "grab";

    // Hintergrundkreise
    const bgCircle = document.createElementNS(svgNS, "circle");
    bgCircle.setAttribute("cx", cx);
    bgCircle.setAttribute("cy", cy);
    bgCircle.setAttribute("r", radius);
    bgCircle.setAttribute("fill", background_grey);
    bgCircle.setAttribute("stroke", accentcolor);
    bgCircle.setAttribute("stroke-width", "3");
    svg.appendChild(bgCircle);

    const innerRing = document.createElementNS(svgNS, "circle");
    innerRing.setAttribute("cx", cx);
    innerRing.setAttribute("cy", cy);
    innerRing.setAttribute("r", radius-8);
    innerRing.setAttribute("fill", background_grey);
    innerRing.setAttribute("stroke", accentcolor);
    innerRing.setAttribute("stroke-width", "1.5");
    svg.appendChild(innerRing);

    // Markierungsstriche alle 30°
    const markers = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    markers.forEach(deg => {
        const rad = deg * Math.PI / 180;
        const x1 = cx + (radius-8) * Math.cos(rad);
        const y1 = cy + (radius-8) * Math.sin(rad);
        const x2 = cx + (radius-1) * Math.cos(rad);
        const y2 = cy + (radius-1) * Math.sin(rad);
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", accentcolor);
        line.setAttribute("stroke-width", deg % 90 === 0 ? "2.5" : "1.2");
        svg.appendChild(line);
    });

    // Himmelsrichtungen
    const labels = [{deg:0, char:"E"},{deg:90, char:"S"},{deg:180, char:"W"},{deg:270, char:"N"}];
    labels.forEach(l => {
        const rad = l.deg * Math.PI/180;
        const textX = cx + (radius-20) * Math.cos(rad);
        const textY = cy + (radius-20) * Math.sin(rad);
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", textX);
        text.setAttribute("y", textY);
        text.setAttribute("fill", black_color);
        text.setAttribute("font-size", "12");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = l.char;
        svg.appendChild(text);
    });

    // Zeiger (Linie vom Mittelpunkt nach außen)
    const pointer = document.createElementNS(svgNS, "line");
    pointer.setAttribute("x1", cx);
    pointer.setAttribute("y1", cy);
    const pointerLength = radius - 8;
    pointer.setAttribute("x2", cx + pointerLength);
    pointer.setAttribute("y2", cy);
    pointer.setAttribute("stroke", accentcolor);
    pointer.setAttribute("stroke-width", "5.5");
    pointer.setAttribute("stroke-linecap", "round");
    svg.appendChild(pointer);

    // Mittelpunkt
    const centerDot = document.createElementNS(svgNS, "circle");
    centerDot.setAttribute("cx", cx);
    centerDot.setAttribute("cy", cy);
    centerDot.setAttribute("r", 7);
    centerDot.setAttribute("fill", accentcolor);
    centerDot.setAttribute("stroke", black_color);
    centerDot.setAttribute("stroke-width", "1");
    svg.appendChild(centerDot);

    parentContainer.appendChild(svg);

    // Zeiger setzen
// Setzt den Zeiger basierend auf Kompasswinkel (N=0°)
    function setPointerAngle(compassDeg) {
        // Kompass → Bildschirm (0°=rechts): screen = (compass - 90) mod 360
        let screenDeg = (compassDeg - 90 + 360) % 360;
        const rad = screenDeg * Math.PI / 180;
        const endX = cx + pointerLength * Math.cos(rad);
        const endY = cy + pointerLength * Math.sin(rad);
        pointer.setAttribute("x2", endX);
        pointer.setAttribute("y2", endY);
    }

    // Mausposition → Kompasswinkel
    const getAngleFromEvent = (e) => {
        const rect = svg.getBoundingClientRect();
        const scaleX = svg.viewBox.baseVal.width / rect.width;
        const scaleY = svg.viewBox.baseVal.height / rect.height;
        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        const mouseX = (clientX - rect.left) * scaleX;
        const mouseY = (clientY - rect.top) * scaleY;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        let screenRad = Math.atan2(dy, dx);
        let screenDeg = screenRad * 180 / Math.PI;
        screenDeg = (screenDeg + 360) % 360;
        // Bildschirmwinkel (0° rechts) → Kompass (0° Norden)
        let compassDeg = (screenDeg + 90) % 360;
        return compassDeg;
    };

    // Drag-Handler
    let dragging = false;

    function onDragStart(e) {
        e.preventDefault();
        dragging = true;
        svg.style.cursor = "grabbing";
        let newAngle = getAngleFromEvent(e);
        if (newAngle !== undefined) {
            if (side === 'own') CEP_K_e_tv = newAngle;
            else CEP_K_d_tv = newAngle;
            setPointerAngle(side === 'own' ? CEP_K_e_tv : CEP_K_d_tv);
            updateTargetDisplay();
        }
    }

    function onDragMove(e) {
        if (!dragging) return;
        e.preventDefault();
        const newAngle = getAngleFromEvent(e);
        if (newAngle !== undefined) {
            if (side === 'own') CEP_K_e_tv = newAngle;
            else CEP_K_d_tv = newAngle;
            setPointerAngle(side === 'own' ? CEP_K_e_tv : CEP_K_d_tv);
            updateTargetDisplay();
        }
    }

    function onDragEnd() {
        dragging = false;
        svg.style.cursor = "grab";
    }

    // Event-Listener
    svg.addEventListener("mousedown", onDragStart);
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
    svg.addEventListener("touchstart", onDragStart);
    window.addEventListener("touchmove", onDragMove);
    window.addEventListener("touchend", onDragEnd);

    // Initialwert setzen
    if (side === 'own') {
        CEP_K_e_tv = initialDeg;
        setPointerAngle(CEP_K_e_tv);
    } else {
        CEP_K_d_tv = initialDeg;
        setPointerAngle(CEP_K_d_tv);
    }
    return svg;
}

// ==================== SVG-SCHIEBEREGLER (Geschwindigkeit) ====================
function createSliderSVG(parentContainer, accentcolor, minVal = 0, maxVal = 30, initialVal = 0, side) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const width = 75;
    const height = 150;
    const trackCenterX = width / 2;
    const knobRadius = 7;
    const trackTopY = knobRadius;
    const trackBottomY = height - knobRadius;


    const black_color = '#000000';
    const background_grey = '#bec8d7';

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.cursor = 'default';

    // Hintergrundspur
    const trackBg = createSvgElement('line', {
        x1: trackCenterX, y1: trackTopY,
        x2: trackCenterX, y2: trackBottomY,
        stroke: background_grey, 'stroke-width': '9', 'stroke-linecap': 'round'
    });

    // Aktive Spur (wird später aktualisiert)
    const trackActive = createSvgElement('line', {
        x1: trackCenterX, y1: trackBottomY,
        x2: trackCenterX, y2: trackBottomY,
        stroke: accentcolor, 'stroke-width': '9', 'stroke-linecap': 'round'
    });

    svg.append(trackBg, trackActive);

    // Skalenmarkierungen alle 1/4 des Bereichs
    for (let i = 0; i <= 4; i++) {
        const t = i / 4;
        const value = minVal + t * (maxVal - minVal);
        const y = trackTopY + (1 - t) * (trackBottomY - trackTopY);
        svg.appendChild(createSvgElement('line', {
            x1: trackCenterX - 8, y1: y,
            x2: trackCenterX + 8, y2: y,
            stroke: '#000000', 'stroke-width': '1.5'
        }));
        svg.appendChild(createSvgElement('text', {
            x: trackCenterX + 18, y: y + 6,
            fill: '#000000', 'font-family': 'Nippo-Light', 'font-size': '12',
            'text-anchor': 'middle'
        }, Math.round(value).toString()));
    }

    // Knauf
    const knob = createSvgElement('circle', {
        r: knobRadius, fill: accentcolor,
        stroke: black_color, 'stroke-width': '1',
        style: 'cursor: grab;'
    });

    svg.append(knob);
    parentContainer.appendChild(svg);

    let dragging = false;
    let currentValue = initialVal;

    // Mausposition → Wert (mit korrekter Orientierung: oben = großer Wert)
    function getValueFromClientY(clientY) {
        const rect = svg.getBoundingClientRect();
        const scaleY = svg.viewBox.baseVal.height / rect.height;
        const mouseY = (clientY - rect.top) * scaleY;
        let ratio = (mouseY - trackTopY) / (trackBottomY - trackTopY);
        ratio = Math.min(1, Math.max(0, ratio));
        return maxVal - ratio * (maxVal - minVal);
    }

    function updateKnobPosition(value) {
        const t = (value - minVal) / (maxVal - minVal);
        const y = trackTopY + (1 - t) * (trackBottomY - trackTopY);
        knob.setAttribute('cx', trackCenterX);
        knob.setAttribute('cy', y);
        trackActive.setAttribute('y2', y);
        // Globale Variable setzen
        if (side === 'own') CEP_v_e_tv = value;
        else CEP_v_d_tv = value;
        updateTargetDisplay();
    }

    // Drag-Ereignisse
    function onDragStart(e) {
        e.preventDefault();
        dragging = true;
        svg.style.cursor = 'grabbing';
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const newVal = getValueFromClientY(clientY);
        if (!isNaN(newVal)) {
            currentValue = newVal;
            updateKnobPosition(currentValue);
        }
    }

    function onDragMove(e) {
        if (!dragging) return;
        e.preventDefault();
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const newVal = getValueFromClientY(clientY);
        if (!isNaN(newVal)) {
            currentValue = newVal;
            updateKnobPosition(currentValue);
        }
    }

    function onDragEnd() {
        dragging = false;
        svg.style.cursor = 'default';
    }

    knob.addEventListener('mousedown', onDragStart);
    trackBg.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    knob.addEventListener('touchstart', onDragStart);
    trackBg.addEventListener('touchstart', onDragStart);
    window.addEventListener('touchmove', onDragMove);
    window.addEventListener('touchend', onDragEnd);

    updateKnobPosition(initialVal);
    return svg;
}

// ==================== SVG-HILFSFUNKTION ====================
function createSvgElement(tag, attributes = {}, textContent = null) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const el = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'style') {
            el.style.cssText = value;
        } else {
            el.setAttribute(key, value);
        }
    });
    if (textContent !== null) {
        el.textContent = textContent;
    }
    return el;
}

// ==================== ANZEIGE AKTUALISIEREN ====================
function updateTargetDisplay() {




    // Kurse aktualisieren – hier werden die .sollwert-course Elemente gesucht
    const ownCourseElem = document.querySelector('#own_input .sollwert-course');
    const targetCourseElem = document.querySelector('#target_input .sollwert-course');

    if (ownCourseElem) {
        let displayVal = Math.round(CEP_K_e_tv);
        if (displayVal === 0) displayVal = 360;
        ownCourseElem.textContent = displayVal;
    }
    if (targetCourseElem) {
        let displayVal = Math.round(CEP_K_d_tv);
        if (displayVal === 0) displayVal = 360;
        targetCourseElem.textContent = displayVal;
    }


    // Geschwindigkeiten aktualisieren – .sollwert-speed Elemente
    const ownSpeedElem = document.querySelector('#own_input .sollwert-speed');
    const targetSpeedElem = document.querySelector('#target_input .sollwert-speed');
    if (ownSpeedElem) ownSpeedElem.textContent = CEP_v_e_tv.toFixed(1);
    if (targetSpeedElem) targetSpeedElem.textContent = CEP_v_d_tv.toFixed(1);
}