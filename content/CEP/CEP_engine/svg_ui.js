// ==================== HAUPTFUNKTION ====================
function create_ui() {
    split_ui_field();
    create_input('own');
    create_input('target');
    create_real_situation();
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

    // Bereich Gegner (schwarz als Fallback, später überschrieben)
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
        ? { title: 'Eigenboot:', id: 'own_input', accent: 'var(--selected_blue)' }
        : { title: 'Gegner:', id: 'target_input', accent: 'var(--unselected_grey)' };

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
    create_course_input(leftside, config.accent);

    // Rechte Seite (33.33 %) – Geschwindigkeitseingabe
    const rightside = document.createElement('div');
    rightside.style.width = '33.33333%';   // vorher 33.66666%, offensichtlicher Tippfehler
    rightside.style.height = '100%';
    rightside.style.display = 'flex';
    rightside.style.flexDirection = 'column';
    rightside.style.justifyContent = 'space-between';
    create_speed_input(rightside, config.accent);

    downside.append(leftside, rightside);

    // Überschrift („Eigenboot:“ / „Gegner:“)
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
    // TODO: Implementierung fehlt noch
}

// ==================== SPEZIFISCHE EINGABEHILFEN ====================
function create_course_input(container, accent) {
    return create_input_ui(container, accent, '111', 'course', '', '$\\mathrm{K_e=}$');
}

function create_speed_input(container, accent) {
    return create_input_ui(container, accent, '111', 'speed', 'kn', '$\\mathrm{v_e=}$');
}

// ==================== ALLGEMEINE EINGABE-UI (Ist/Slider/Soll) ====================
function create_input_ui(container, accent, baseValue, inputType, unit, label) {
    // Istwert-Anzeige (Label, Wert, Platzhalter)
    const istwert = document.createElement('div');
    istwert.style.display = 'flex';
    istwert.style.flexDirection = 'row';
    istwert.style.alignItems = 'flex-start';
    istwert.style.justifyContent = 'space-around';

    const sign = document.createElement('div');
    sign.textContent = label;
    sign.style.width = '10px';
    sign.style.textAlign = 'left';

    const value = document.createElement('div');
    value.textContent = baseValue;
    value.style.width = '100%';
    value.style.textAlign = 'center';

    const rightspace = document.createElement('div');
    rightspace.style.width = '10px';

    istwert.append(sign, value, rightspace);

    // Slider (SVG-Drehregler oder Schieberegler)
    const sliderContainer = document.createElement('div');
    if (inputType === 'course') {
        createDialSVG(sliderContainer, 0);
    } else if (inputType === 'speed') {
        createSliderSVG(sliderContainer, 0, 8, 0);
    }

    // Das erzeugte SVG soll den Container voll ausfüllen
    if (sliderContainer.children.length > 0) {
        const svg = sliderContainer.children[0];
        svg.style.width = '100%';
        svg.style.height = '100%';
    }
    sliderContainer.style.display = 'flex';
    sliderContainer.style.justifyContent = 'center';

    // Sollwert-Anzeige (später dynamisch zu befüllen)
    const sollwert = document.createElement('div');
    sollwert.textContent = '123';
    sollwert.style.textAlign = 'center';

    container.append(istwert, sliderContainer, sollwert);
    return container;
}

// ==================== HTML-RANGE-SLIDER (derzeit ungenutzt, bleibt erhalten) ====================
function createSlider() {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.style.display = 'block';
    slider.style.rotate = '270deg';
    slider.style.margin = '0';
    slider.style.flex = '1';
    slider.style.width = '200%';
    slider.style.height = '0';
    return slider;
}

// ==================== SVG-DREHREGLER (Kurs) ====================
function createDialSVG(parentContainer, initialDeg = 0) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const SIZE = 150;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const radius = 60;
    const pointerLength = radius - 8;

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', SIZE);
    svg.setAttribute('height', SIZE);
    svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
    svg.style.cursor = 'grab';
    svg.id = 'course_slider';

    // Hintergrundkreise
    const bgCircle = createSvgElement('circle', {
        cx, cy, r: radius,
        fill: '#2c3e2f', stroke: '#eab354', 'stroke-width': '3',
        filter: 'url(#dialShadow)'
    });
    const innerRing = createSvgElement('circle', {
        cx, cy, r: radius - 8,
        fill: '#1a2a1f', stroke: '#efc27d', 'stroke-width': '1.5'
    });

    // Skalenstriche alle 45°
    [0, 45, 90, 135, 180, 225, 270, 315].forEach(deg => {
        const rad = deg * Math.PI / 180;
        const x1 = cx + (radius - 8) * Math.cos(rad);
        const y1 = cy + (radius - 8) * Math.sin(rad);
        const x2 = cx + (radius - 2) * Math.cos(rad);
        const y2 = cy + (radius - 2) * Math.sin(rad);
        svg.appendChild(createSvgElement('line', {
            x1, y1, x2, y2,
            stroke: '#f7d98c',
            'stroke-width': deg % 90 === 0 ? '2.5' : '1.2'
        }));
    });

    // Himmelsrichtungen
    [
        { deg: 0, char: 'E' },
        { deg: 90, char: 'S' },
        { deg: 180, char: 'W' },
        { deg: 270, char: 'N' }
    ].forEach(({ deg, char }) => {
        const rad = deg * Math.PI / 180;
        const textX = cx + (radius - 15) * Math.cos(rad);
        const textY = cy + (radius - 15) * Math.sin(rad);
        svg.appendChild(createSvgElement('text', {
            x: textX, y: textY,
            fill: '#ffe0a3', 'font-size': '12', 'font-weight': 'bold',
            'text-anchor': 'middle', 'dominant-baseline': 'middle'
        }, char));
    });

    // Zeiger
    const pointer = createSvgElement('line', {
        x1: cx, y1: cy,
        x2: cx + pointerLength, y2: cy,
        stroke: '#ffb347', 'stroke-width': '3.5', 'stroke-linecap': 'round'
    });

    // Mittelpunkt
    const centerDot = createSvgElement('circle', {
        cx, cy, r: 6,
        fill: '#e6b422', stroke: '#3a2800', 'stroke-width': '1.5'
    });

    // Schattenfilter
    const defs = document.createElementNS(SVG_NS, 'defs');
    const filter = createSvgElement('filter', { id: 'dialShadow' });
    filter.appendChild(createSvgElement('feDropShadow', {
        dx: '2', dy: '3', stdDeviation: '3',
        'flood-color': 'black', 'flood-opacity': '0.6'
    }));
    defs.appendChild(filter);
    svg.append(defs, bgCircle, innerRing, pointer, centerDot);

    parentContainer.appendChild(svg);

    // ---------- Hilfsfunktion: Zeigerwinkel setzen ----------
    function setPointerAngle(deg) {
        const rad = deg * Math.PI / 180;
        pointer.setAttribute('x2', cx + pointerLength * Math.cos(rad));
        pointer.setAttribute('y2', cy + pointerLength * Math.sin(rad));
    }

    // ---------- Drag-Logik ----------
    let dragging = false;

    function getAngleFromEvent(e) {
        const rect = svg.getBoundingClientRect();
        const scaleX = svg.viewBox.baseVal.width / rect.width;
        const scaleY = svg.viewBox.baseVal.height / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const mouseX = (clientX - rect.left) * scaleX;
        const mouseY = (clientY - rect.top) * scaleY;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        return (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
    }

    function onDragStart(e) {
        e.preventDefault();
        dragging = true;
        svg.style.cursor = 'grabbing';
        const newAngle = getAngleFromEvent(e);
        targetHeading = newAngle;
        setPointerAngle(targetHeading);
    }

    function onDragMove(e) {
        if (!dragging) return;
        e.preventDefault();
        const newAngle = getAngleFromEvent(e);
        targetHeading = newAngle;
        setPointerAngle(targetHeading);
    }

    function onDragEnd() {
        dragging = false;
        svg.style.cursor = 'grab';
    }

    svg.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    svg.addEventListener('touchstart', onDragStart);
    window.addEventListener('touchmove', onDragMove);
    window.addEventListener('touchend', onDragEnd);

    setPointerAngle(initialDeg);
    return svg;
}

// ==================== SVG-SCHIEBEREGLER (Geschwindigkeit) ====================
function createSliderSVG(parentContainer, minVal = 0, maxVal = 30, initialVal = 0) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const width = 150;
    const height = 280;
    const trackCenterX = width / 2;        // x-Position der vertikalen Spur
    const trackTopY = 20;                  // oberes Ende (kleine Werte)
    const trackBottomY = height - 20;      // unteres Ende (große Werte)
    const knobRadius = 12;

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.cursor = 'default';

    // Hintergrundspur
    const trackBg = createSvgElement('line', {
        x1: trackCenterX, y1: trackTopY,
        x2: trackCenterX, y2: trackBottomY,
        stroke: '#2f4f4f', 'stroke-width': '12', 'stroke-linecap': 'round'
    });

    // Aktive Spur (wird später aktualisiert)
    const trackActive = createSvgElement('line', {
        x1: trackCenterX, y1: trackBottomY,
        x2: trackCenterX, y2: trackBottomY,
        stroke: '#ffb347', 'stroke-width': '12', 'stroke-linecap': 'round'
    });

    svg.append(trackBg, trackActive);

    // Skalenmarkierungen alle 1/4 des Bereichs
    for (let i = 0; i <= 4; i++) {
        const value = minVal + (i / 4) * (maxVal - minVal);
        // y-Koordinate: von unten (große Werte) nach oben (kleine Werte)
        const y = trackBottomY - (value / maxVal) * (trackBottomY - trackTopY);
        svg.appendChild(createSvgElement('line', {
            x1: trackCenterX - 8, y1: y,
            x2: trackCenterX + 8, y2: y,
            stroke: '#e0e0b0', 'stroke-width': '1.5'
        }));
        svg.appendChild(createSvgElement('text', {
            x: trackCenterX - 18, y: y + 6,
            fill: '#f3e2b0', 'font-family': 'Shentox', 'font-size': '12',
            'text-anchor': 'middle'
        }, Math.round(value).toString()));
    }

    // Knauf (Greifer)
    const knob = createSvgElement('circle', {
        r: knobRadius, fill: '#f5bc70',
        stroke: '#4a2a0e', 'stroke-width': '2',
        style: 'cursor: grab;'
    });

    // Wertanzeige unterhalb des Sliders
    const valueLabel = createSvgElement('text', {
        x: trackCenterX + 4, y: trackBottomY + 10,
        fill: '#ffe5a3', 'font-size': '12', 'font-weight': 'bold'
    }, `${initialVal.toFixed(0)} kn`);

    svg.append(knob, valueLabel);
    parentContainer.appendChild(svg);

    // ---------- Zustand ----------
    let dragging = false;
    let currentValue = initialVal;

    // ---------- Positionsberechnung (Y-Wert -> Geschwindigkeit) ----------
    function getValueFromClientY(clientY) {
        const rect = svg.getBoundingClientRect();
        const scaleY = svg.viewBox.baseVal.height / rect.height;
        const mouseY = (clientY - rect.top) * scaleY;
        // Verhältnis entlang der Spur (0 = oben = minVal, 1 = unten = maxVal)
        let ratio = (mouseY - trackTopY) / (trackBottomY - trackTopY);
        ratio = Math.min(1, Math.max(0, ratio));
        return minVal + ratio * (maxVal - minVal);
    }

    function updateKnobPosition(value) {
        const t = (value - minVal) / (maxVal - minVal);
        const y = trackBottomY - t * (trackBottomY - trackTopY); // unten = hoher Wert
        knob.setAttribute('cx', trackCenterX);
        knob.setAttribute('cy', y);
        trackActive.setAttribute('y2', y);
        valueLabel.textContent = `${value.toFixed(1)} kn`;
        targetSpeed = value;
    }

    // ---------- Drag-Ereignisse ----------
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

// ==================== SVG-HILFSFUNKTION (reduziert Boilerplate) ====================
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