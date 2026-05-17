function add_CEP_buttons() {
    CEP_simulation_running = false;
    CEP_multiplier = '1';

    // --- Hilfsfunktionen für die Button-Erzeugung (nach oben gezogen) ---
    function add_button(text) {
        const btn = document.createElement('button');
        btn.innerHTML = text;
        btn.classList.add('top_bar_input');
        return btn;
    }

    function add_select(options, selectedIndex) {
        const select = document.createElement('select');
        options.forEach((optText, i) => {
            const option = document.createElement('option');
            option.innerHTML = optText;
            // Wert bis zum ersten Leerzeichen, z. B. "5 min" → "5"
            option.value = optText.substring(0, optText.indexOf(' '));
            if (i === selectedIndex) option.selected = true;
            select.appendChild(option);
        });
        select.classList.add('top_bar_input');
        return select;
    }

    // Icon-Quelle in Abhängigkeit vom Multiplikator
    function getPlayIconSrc(multiplier) {
        const icons = {
            '1': 'data/pictures/icons/CEP_simu/play.svg',
            '2': 'data/pictures/icons/CEP_simu/play2.svg',
            '5': 'data/pictures/icons/CEP_simu/play5.svg',
            '10': 'data/pictures/icons/CEP_simu/play10.svg'
        };
        return icons[multiplier] || '';
    }

    // --- UI-Elemente erzeugen ---
    const top_bar = document.getElementById('content_body_topbar');

    const btn_vergleich = add_button('Vergleichsdarstellung');
    btn_vergleich.id = 'btn_vergleich';

    const btn_time = add_button('01.02.24. 00:00:00');
    btn_time.id = 'btn_time';
    btn_time.style.width = '165px';
    btn_time.style.justifyContent = 'space-between';

    const btn_time_icon = document.createElement('img');
    btn_time_icon.src = 'data/pictures/icons/CEP_simu/pause.svg';
    btn_time_icon.style.maxHeight = '16px';
    btn_time_icon.style.width = '48px';
    btn_time.append(btn_time_icon);

    const wft_options = ['5 min', '10 min', '20 min', '40 min', '80 min', '160 min'];
    const select_wft = add_select(wft_options, 2);
    select_wft.id = 'CEP_timeframe';

    const center_options = ['000 deg', '090 deg', '180 deg', '270 deg'];
    const select_center = add_select(center_options, 0);
    select_center.id = 'CEP_center';

    const multiplier_options = ['1 x', '2 x', '5 x', '10 x'];
    const select_multiplier = add_select(multiplier_options, 0);
    select_multiplier.id = 'CEP_multiplier';

    const div_time = document.createElement('div');
    div_time.style.display = 'flex';
    div_time.style.flexDirection = 'row';
    div_time.style.gap = '5px';
    div_time.append(btn_time, select_multiplier);

    top_bar.append(btn_vergleich, select_center, select_wft, div_time);

    // --- Event-Listener ---
    btn_time.addEventListener('click', () => {
        if (CEP_simulation_running) {
            CEP_simulation_running = false;
            btn_time_icon.src = 'data/pictures/icons/CEP_simu/pause.svg';
            pause_simulation();
        } else {
            CEP_simulation_running = true;
            btn_time_icon.src = getPlayIconSrc(CEP_multiplier);
            start_simulation();
        }
    });

    select_wft.addEventListener('change', () => update_CEP());
    select_center.addEventListener('change', () => update_CEP());

    select_multiplier.addEventListener('change', () => {
        CEP_multiplier = select_multiplier.value;
        if (CEP_simulation_running) {
            btn_time_icon.src = getPlayIconSrc(CEP_multiplier);
        }
    });

    btn_vergleich.addEventListener('click', () => {
        const svg = document.querySelector('svg');
        if (btn_vergleich.innerText === 'Off') {
            btn_vergleich.innerText = 'Vergleichsdarstellung';
            svg.setAttribute('viewBox', `0 0 ${CEP_svg_width} ${CEP_svg_height_min}`);
        } else {
            const buttonWidth = btn_vergleich.offsetWidth;
            btn_vergleich.innerText = 'Off';
            btn_vergleich.style.width = buttonWidth + 'px';
            svg.setAttribute('viewBox', `0 0 ${CEP_svg_width} ${CEP_svg_height_max}`);
        }
    });
    createCustomTooltip();
}

function createCustomTooltip() {
    // Tooltip-Container erstellen (falls noch nicht vorhanden)
    if (document.getElementById('cep-tooltip')) return;
    const tooltip = document.createElement('div');
    tooltip.id = 'cep-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '6px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontFamily = 'Nippo-Light';
    tooltip.style.fontSize = '12px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '10000';
    tooltip.style.display = 'none';
    tooltip.style.whiteSpace = 'nowrap';
    document.body.appendChild(tooltip);
}
/* -------------------------------------------------------------------------- */
/* Hilfsfunktion: farbigen Abschnitt auf der x-Achse zeichnen, mit Umbruch     */
/* -------------------------------------------------------------------------- */
function drawBearingSegment(svg, fromBearing, toBearing, color, yPos) {
    const x_min = CEP_svg_start_x;
    const x_max = CEP_svg_start_x + CEP_abzisse_length;
    const lineWidth = CEP_svg_marker_width;

    const x_from = bearing_to_x_coordinate(fromBearing);
    const x_to = bearing_to_x_coordinate(toBearing);

    const segments = [];

    // Normalfall: kein Umbruch nötig
    if (x_from <= x_to) {
        segments.push(svg_line_xy_butt(x_from, yPos, x_to, yPos, lineWidth, color));
    } else {
        // Umbruch: zwei Segmente (von from bis rechts, von links bis to)
        segments.push(svg_line_xy_butt(x_from, yPos, x_max, yPos, lineWidth, color));
        segments.push(svg_line_xy_butt(x_min, yPos, x_to, yPos, lineWidth, color));
    }
    return segments;
}

/* -------------------------------------------------------------------------- */
/* Bestehende Funktionen – inhaltlich unverändert, nur lesbarer               */
/* -------------------------------------------------------------------------- */

function update_CEP() {
    const body_top = document.getElementById('content_body_top');
    if (body_top.hasChildNodes()) {
        body_top.removeChild(body_top.firstChild);
    }

    const vergleichBtn = document.getElementById('btn_vergleich');
    const svg_height = vergleichBtn.innerText === 'Off' ? CEP_svg_height_max : CEP_svg_height_min;

    const now = new Date(CEP_data[CEP_data.length - 1][0]);
    document.getElementById('btn_time').firstChild.textContent = now.toLocaleTimeString([], {
        day: '2-digit', month: '2-digit', year: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    let svg = createSVG(CEP_svg_width, svg_height);
    svg = create_CEP_ordinate(svg);
    svg = create_CEP_badsector_colors(svg);
    svg = create_CEP_abzisse(svg);
    svg = create_CEP_owncourse_colors(svg);
    svg = create_CEP_ownandtargetline(svg);

    body_top.appendChild(svg);
}

function create_CEP_badsector_colors(svg) {
    const current_course = CEP_data[CEP_data.length - 1][1];
    const good_right = navy_course(current_course + 135);
    const bad_right = navy_course(current_course + 165);
    const good_left = navy_course(current_course - 135);
    const bad_left = navy_course(current_course - 165);

    const yPos = CEP_svg_line_width + CEP_svg_marker_width / 2;

    // Grüne Bereiche (Good Sector)
    const greenSegments = drawBearingSegment(svg, current_course, good_right, 'var(--alertgreen)', yPos)
        .concat(drawBearingSegment(svg, good_left, current_course, 'var(--alertgreen)', yPos));

    // Gelbe Bereiche (Bad Sector)
    const yellowSegments = drawBearingSegment(svg, good_right, bad_right, 'var(--alertyellow)', yPos)
        .concat(drawBearingSegment(svg, bad_left, good_left, 'var(--alertyellow)', yPos));

    svg.append(...greenSegments, ...yellowSegments);
    return svg;
}

function create_CEP_owncourse_colors(svg) {
    const current_course = CEP_data[CEP_data.length - 1][1];
    const opposite_course = navy_course(current_course - 180);

    const owncourse_color = svg_group('oc_colors');
    const yPos = 90;
    const x_cc = bearing_to_x_coordinate(current_course);

    // Roter Bereich (von current bis opposite in Fahrtrichtung)
    const redSegments = drawBearingSegment(svg, current_course, opposite_course, 'var(--alertgreen)', yPos);
    // Grüner Bereich (von opposite zurück zu current)
    const greenSegments = drawBearingSegment(svg, opposite_course, current_course, 'var(--alertred)', yPos);

    const triangle = svg_triangle(x_cc, yPos + CEP_svg_marker_width / 2, CEP_svg_marker_width + 10);

    owncourse_color.append(...redSegments, ...greenSegments, triangle);
    svg.appendChild(owncourse_color);
    return svg;
}

function create_CEP_ordinate(svg) {
    const timeframeValue = document.getElementById('CEP_timeframe').value;
    const TIMEFRAME_MAP = {
        '5':  [1,   5],
        '10': [1,  10],
        '20': [2,  20],
        '40': [5,  40],
        '80': [5,  80],
        '160':[10, 160]
    };
    const [step, maxMinutes] = TIMEFRAME_MAP[timeframeValue];
    CEP_ms_on_ordinate = maxMinutes * 60 * 1000;

    const now = new Date(CEP_data[CEP_data.length - 1][0]);

    // erste auf step gerundete Minute finden
    let firstMinute = now.getMinutes();
    while (firstMinute % step !== 0) firstMinute--;
    const baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), firstMinute);

    const minutes_show = [];
    const totalTicks = maxMinutes / step;
    for (let i = 0; i < totalTicks; i++) {
        minutes_show.push(new Date(baseTime - i * step * 60 * 1000));
    }

    const ordinate = svg_group('ordinate');
    const vertLine = svg_line_xy(CEP_svg_start_x, CEP_svg_start_y, CEP_svg_start_x, CEP_svg_height_max);
    ordinate.append(vertLine);

    minutes_show.forEach(time => {
        const y = time_to_y_coordinte(time) + CEP_svg_start_y;
        ordinate.append(svg_line_xy(CEP_svg_start_x - CEP_svg_tick_length, y, CEP_svg_start_x, y));
        const timeLabel = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        ordinate.append(svg_text(timeLabel, 0, y));
    });

    svg.appendChild(ordinate);
    return svg;
}

function create_CEP_abzisse(svg) {
    const center = document.getElementById('CEP_center').value;
    const CENTER_TEXTS = {
        '000': ['180', '210', '240', '270', '300', '330', '000', '030', '060', '090', '120', '150', '180'],
        '090': ['270', '300', '330', '000', '030', '060', '090', '120', '150', '180', '210', '240', '270'],
        '180': ['000', '030', '060', '090', '120', '150', '180', '210', '240', '270', '300', '330', '000'],
        '270': ['090', '120', '150', '180', '210', '240', '270', '300', '330', '000', '030', '060', '090']
    };
    const courseTexts = CENTER_TEXTS[center];

    const abzisse = svg_group('Abzisse');
    const horiLine = svg_line_xy(CEP_svg_start_x, CEP_svg_line_width / 2,
        CEP_svg_start_x + CEP_abzisse_length, CEP_svg_line_width / 2);
    horiLine.id = 'CEP_abzisse_horiline';

    let x = CEP_svg_start_x;
    courseTexts.forEach(text => {
        abzisse.append(svg_line_xy(x, CEP_svg_line_width / 2, x, CEP_svg_tick_length));
        abzisse.append(svg_text(text, x, 53, 'middle'));
        x += CEP_deg_on_abzisse * 30;
    });
    abzisse.append(horiLine);
    abzisse.id = 'CEP_abzisse';

    svg.appendChild(abzisse);
    return svg;
}

function create_CEP_ownandtargetline(svg) {
    const now = new Date(CEP_data[CEP_data.length - 1][0]);
    const ownLineColor = '#697a88';
    const targetLineColor = '#004471';
    const maxJump = CEP_abzisse_length * 0.8;

    let ownPoints = [];
    let targetPoints = [];

    // Punkte sammeln
    for (let i = 0; i < CEP_data.length; i++) {
        const timestamp = CEP_data[i][0];
        if (now - timestamp <= CEP_ms_on_ordinate) {
            const ownCourse = CEP_data[i][1];
            const targetBearing = CEP_data[i][2];
            const ownX = bearing_to_x_coordinate(ownCourse);
            const ownY = time_to_y_coordinte(timestamp) + CEP_svg_start_y;
            ownPoints.push({ x: ownX, y: ownY, idx: i });
            const targetX = bearing_to_x_coordinate(targetBearing);
            const targetY = time_to_y_coordinte(timestamp) + CEP_svg_start_y;
            targetPoints.push({ x: targetX, y: targetY, idx: i });
        }
    }

    // Linien zeichnen (unverändert)
    function drawSplitPolyline(pointsArr, color, strokeWidth) {
        if (pointsArr.length < 2) return;
        let startIdx = 0;
        for (let i = 1; i < pointsArr.length; i++) {
            if (Math.abs(pointsArr[i].x - pointsArr[i-1].x) > maxJump) {
                if (i - startIdx >= 2) {
                    const segment = pointsArr.slice(startIdx, i);
                    const pointsStr = segment.map(p => `${p.x},${p.y}`).join(' ');
                    svg.appendChild(createSvgElement('polyline', {
                        points: pointsStr, fill: 'none', stroke: color,
                        'stroke-width': strokeWidth, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
                    }));
                }
                startIdx = i;
            }
        }
        if (pointsArr.length - startIdx >= 2) {
            const segment = pointsArr.slice(startIdx);
            const pointsStr = segment.map(p => `${p.x},${p.y}`).join(' ');
            svg.appendChild(createSvgElement('polyline', {
                points: pointsStr, fill: 'none', stroke: color,
                'stroke-width': strokeWidth, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
            }));
        }
    }

    drawSplitPolyline(ownPoints, ownLineColor, 5);
    drawSplitPolyline(targetPoints, targetLineColor, 10);

    // --- Tooltip mit korrekter Koordinatenumrechnung ---
    if (svg._mouseMoveListener) svg.removeEventListener('mousemove', svg._mouseMoveListener);
    if (svg._mouseLeaveListener) svg.removeEventListener('mouseleave', svg._mouseLeaveListener);

    createCustomTooltip();
    const tooltip = document.getElementById('cep-tooltip');

    const HOVER_DISTANCE = 15; // Pixel

    function onMouseMove(e) {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const inverse = ctm.inverse();
        const svgCoords = pt.matrixTransform(inverse);
        const mouseX = svgCoords.x;
        const mouseY = svgCoords.y;

        const rect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;
        const scaleX = viewBox.width / rect.width;
        const threshold = HOVER_DISTANCE * scaleX;

        let bestInfo = null;
        let bestDist = threshold;

        // Eigene Punkte prüfen (nur Zeit + Kurs)
        for (let p of ownPoints) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);
            if (dist < bestDist) {
                bestDist = dist;
                const data = CEP_data[p.idx];
                const timeStr = new Date(data[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                bestInfo = `Eigenes Boot<br>Zeit: ${timeStr}<br>Kurs: ${Math.round(data[1])}°`;
            }
        }

        // Zielpunkte prüfen (Zeit + Peilung + Peilungsänderung)
        for (let p of targetPoints) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);
            if (dist < bestDist) {
                bestDist = dist;
                const data = CEP_data[p.idx];
                const timestamp = data[0];
                const targetBearing = data[2];
                const timeStr = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                let info = `Ziel<br>Zeit: ${timeStr}<br>Peilung: ${Math.round(targetBearing)}°`;

                // Peilungsänderung zum Vorgänger berechnen (falls vorhanden)
                if (p.idx > 0) {
                    const prevData = CEP_data[p.idx - 1];
                    const prevTimestamp = prevData[0];
                    const prevBearing = prevData[2];
                    const timeDiffMinutes = (timestamp - prevTimestamp) / 60000;
                    if (timeDiffMinutes > 0) {
                        let bearingDiff = targetBearing - prevBearing;
                        // kürzesten Weg über 0°-Grenze
                        if (bearingDiff > 180) bearingDiff -= 360;
                        if (bearingDiff < -180) bearingDiff += 360;
                        const bearingRate = bearingDiff / timeDiffMinutes;
                        info += `<br>Peilungsänderung: ${bearingRate.toFixed(1)} °/min`;
                    }
                }
                bestInfo = info;
            }
        }

        if (bestInfo) {
            tooltip.innerHTML = bestInfo;
            tooltip.style.display = 'block';
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY - 30) + 'px';
        } else {
            tooltip.style.display = 'none';
        }
    }

    function onMouseLeave() {
        tooltip.style.display = 'none';
    }

    svg.addEventListener('mousemove', onMouseMove);
    svg.addEventListener('mouseleave', onMouseLeave);
    svg._mouseMoveListener = onMouseMove;
    svg._mouseLeaveListener = onMouseLeave;

    svg.style.cursor = 'crosshair';
    return svg;
}

function bearing_to_x_coordinate(brg) {
    const center = document.getElementById('CEP_center').value;
    const left = CEP_svg_start_x;
    const right = CEP_svg_start_x + CEP_abzisse_length;
    const left_deg = navy_course(center - 180);

    const angle = brg - left_deg;
    if (brg >= left_deg) {
        return left + angle * CEP_deg_on_abzisse;
    } else {
        return right + angle * CEP_deg_on_abzisse;
    }
}

function time_to_y_coordinte(date) {
    const now = new Date(CEP_data[CEP_data.length - 1][0]);
    const px_per_ms = CEP_ordinate_length / CEP_ms_on_ordinate;
    return (now - date) * px_per_ms;
}