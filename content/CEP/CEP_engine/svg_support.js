// ==================== KONSTANTEN ====================
const SVG_NS = "http://www.w3.org/2000/svg";

// ==================== SVG-BASISELEMENT ERSTELLEN ====================
/**
 * Erzeugt ein SVG-Element und weist Attribute sowie Textinhalt zu.
 * Reduziert Boilerplate in allen folgenden Hilfsfunktionen.
 */
function createSvgElement(tag, attributes = {}, text = null) {
    const el = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([key, value]) => {
        el.setAttribute(key, value);
    });
    if (text !== null) {
        el.textContent = text;
    }
    return el;
}

// ==================== SVG-HAUPTELEMENT ====================
function createSVG(width = CEP_svg_width, height = CEP_svg_height_max) {
    return createSvgElement("svg", {
        viewBox: `0 0 ${width} ${height}`,
        style: "cursor: default;"
    });
}

// ==================== GRUPPE ====================
function svg_group(id) {
    return createSvgElement("g", { id });
}

// ==================== DREIECK ====================
function svg_triangle(x, y, height, color = 'white') {
    const a = (2 * height) / Math.sqrt(3);
    const x1 = x - a / 2;
    const x2 = x + a / 2;
    const y3 = y - height;

    return createSvgElement("polygon", {
        points: `${x1},${y} ${x2},${y} ${x},${y3}`,
        fill: color
    });
}

// ==================== LINIE (absolut, runde Enden) ====================
function svg_line_xy(x1, y1, x2, y2,
                     width = CEP_svg_line_width,
                     color = '#697a88') {
    return createSvgElement("line", {
        x1, y1, x2, y2,
        stroke: color,
        "stroke-width": width,
        "stroke-linecap": "round"
    });
}

// ==================== LINIE (absolut, stumpfe Enden) ====================
function svg_line_xy_butt(x1, y1, x2, y2,
                          width = CEP_svg_line_width,
                          color = '#697a88') {
    // Nutzt svg_line_xy und überschreibt lediglich stroke-linecap
    const line = svg_line_xy(x1, y1, x2, y2, width, color);
    line.setAttribute("stroke-linecap", "butt");
    return line;
}

// ==================== LINIE (Startpunkt, Länge, Winkel) ====================
function svg_line_deg(x1, y1, length, angle,
                      width = CEP_svg_line_width,
                      color = '#697a88') {
    const rad = make_radian(angle);
    return createSvgElement("line", {
        x1, y1,
        x2: x1 + Math.sin(rad) * length,
        y2: y1 + Math.cos(rad) * length,
        stroke: color,
        "stroke-width": width,
        "stroke-linecap": "round",
        id: "test"
    });
}

// ==================== TEXT ====================
function svg_text(string, x, y,
                  anchor = 'left',
                  fontSize = CEP_svg_font_size,
                  color = '#000000') {
    // vertikale Zentrierung mit empirischem Korrekturfaktor
    const yAdjusted = y + fontSize * 0.35;
    return createSvgElement("text", {
        x, y: yAdjusted,
        fill: color,
        "font-size": `${fontSize}px`,
        "text-anchor": anchor
    }, string);
}

// ==================== UPDATE REALE SITUATION (SVG) ====================
// Globale Variablen für letzte ViewBox (am Anfang von CEP.js definieren)
let lastViewBox = null;

function update_real_sit() {

    const container = document.getElementById('real_sit_display');
    if (!container) return;
    container.style.overflow = 'hidden';

    while (container.firstChild) container.removeChild(container.firstChild);

    const path = 'data/pictures/icons/CEP_simu/';


    // Weltpunkte (y gedreht, damit Norden oben)
    const points = [
        { x: CEP_own_x,    y: -CEP_own_y,    heading: CEP_K_e,   img: path + 'ownboat.svg' },
        { x: CEP_target_x, y: -CEP_target_y, heading: CEP_K_d,   img: path + 'target.svg' }
    ];

    // Bounding Box berechnen (wie gehabt)
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    });
    if (minX === maxX) { minX -= 100; maxX += 100; }
    if (minY === maxY) { minY -= 100; maxY += 100; }

    let dx = maxX - minX;
    let dy = maxY - minY;
    let padding = Math.max(0.2 * Math.max(dx, dy), 200);
    minX -= padding;
    maxX += padding;
    minY -= padding;
    maxY += padding;

    const step = 4*914.4;
    minX = Math.floor(minX / step) * step;
    maxX = Math.ceil(maxX / step) * step;
    minY = Math.floor(minY / step) * step;
    maxY = Math.ceil(maxY / step) * step;
    const viewWidth  = maxX - minX;
    const viewHeight = maxY - minY;

    // Hintergrund-SVG (nur Karte)
    const bgSvg = createSvgElement('svg', {
        width: '100%',
        height: '100%',
        viewBox: `${minX} ${minY} ${viewWidth} ${viewHeight}`,
        style: 'background-color: #f0f4f8; border-radius: 10px; position: absolute; top: 0; left: 0;'
    });
    container.style.position = 'relative';

    // --- Gitternetz mit 1000 Yards Abstand (914,4 m) ---
    const gridSpacing = 914.4; // 1000 yards in Metern



// Vertikale Linien – beginne vor minX
    let startX = Math.floor(minX / gridSpacing) * gridSpacing - gridSpacing;
    for (let x = startX-10*gridSpacing; x <= maxX+10*gridSpacing; x += gridSpacing) {
        const line = createSvgElement('line', {
            x1: x, y1: minY-10*gridSpacing,
            x2: x, y2: maxY+10*gridSpacing,
            stroke: 'rgba(0,0,0)',   // Dezentes Grau, ändern Sie nach Wunsch
            'stroke-width': 10,
            'stroke-dasharray': '4 4'
        });
        bgSvg.appendChild(line);
    }

// Horizontale Linien – beginne vor minY
    let startY = Math.floor(minY / gridSpacing) * gridSpacing - gridSpacing;
    for (let y = startY-10*gridSpacing; y <= maxY + 10*gridSpacing; y += gridSpacing) {
        const line = createSvgElement('line', {
            x1: minX-10*gridSpacing, y1: y,
            x2: maxX+10*gridSpacing, y2: y,
            stroke: 'rgba(0,0,0)',
            'stroke-width': 10,
            'stroke-dasharray': '4 4'
        });
        bgSvg.appendChild(line);
    }

    container.appendChild(bgSvg);

    // Overlay für die Schiffe (absolute Positionierung, feste Bildgröße)
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';
    container.appendChild(overlay);

    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;

    function worldToPixel(x, y) {
        const px = (x - minX) / viewWidth * containerWidth;
        const py = (y - minY) / viewHeight * containerHeight;
        return { x: px, y: py };
    }

    // Feste Bildgröße in Pixeln (Breite des Symbols)
    const SHIP_WIDTH_PX = 450;   // Passt für Ihre SVGs (Breite etwa 119 mm → 45 px ist gut lesbar)
    const SHIP_HEIGHT_PX = 120;  // Höhe etwa 40 mm → proportional

    points.forEach(p => {
        const { x: px, y: py } = worldToPixel(p.x, p.y);
        const img = document.createElement('img');
        img.src = p.img;
        img.style.position = 'absolute';
        img.style.left = `${px}px`;
        img.style.top = `${py}px`;
        img.style.transform = `translate(-50%, -50%) rotate(${p.heading}deg)`;
        img.style.width = `${SHIP_WIDTH_PX}px`;
        img.style.height = `${SHIP_HEIGHT_PX}px`;
        img.style.pointerEvents = 'none';
        // Damit der Drehpunkt genau die Bildmitte ist (Ihre Angabe: "Mitte des Rechteckes")
        img.style.transformOrigin = 'center center';
        overlay.appendChild(img);
    });

    // --- Entfernungsanzeige in Yards (oben rechts) ---
    const distMeters = Math.hypot(CEP_target_x - CEP_own_x, CEP_target_y - CEP_own_y);
    const distYards = distMeters / 0.9144;
    const distanceDiv = document.createElement('div');
    distanceDiv.textContent = `Entfernung: ${distYards.toFixed(0)} yds`;
    distanceDiv.style.position = 'absolute';
    distanceDiv.style.top = '10px';
    distanceDiv.style.right = '10px';
    distanceDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    distanceDiv.style.padding = '6px 12px';
    distanceDiv.style.borderRadius = '8px';
    distanceDiv.style.fontFamily = 'Nippo-Light';
    distanceDiv.style.fontSize = '14px';
    distanceDiv.style.fontWeight = 'normal';
    distanceDiv.style.border = '1px solid #ccc';
    distanceDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    distanceDiv.style.pointerEvents = 'none';
    distanceDiv.style.zIndex = '10';
    container.appendChild(distanceDiv);
}

