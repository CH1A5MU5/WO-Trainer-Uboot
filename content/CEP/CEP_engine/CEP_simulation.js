
function animate(timestamp) {

    if (!CEP_lastFrameTime) {
        CEP_lastFrameTime = timestamp;
        requestAnimationFrame(animate);
        return;
    }
    let delta = Math.min(0.05, (timestamp - CEP_lastFrameTime) / 1000);


    delta = delta * CEP_multiplier;

    if (delta > 0) {
        update_Inertia(delta);       // Trägheit auf Ist-Werte anwenden
        update_movement(delta);
        update_CEP();
        update_real_sit(delta);       // Trägheit auf Ist-Werte anwenden
        //updateShipMovement(delta);  // Bewegung mit den Ist-Werten
        //updateActualDisplay();      // Anzeige der Ist-Werte aktualisieren
        //renderScene();
    }
    CEP_lastFrameTime = timestamp;
    if (CEP_simulation_running) {
        animationId = requestAnimationFrame(animate);
    }

}

function update_movement(delta, timestamp) {

    //let  lasttime = (CEP_data[CEP_data.length - 1][0]);
    let lastEntry = CEP_data[CEP_data.length - 1];
    let lastTimestamp = (lastEntry[0] instanceof Date) ? lastEntry[0].getTime() : lastEntry[0];
    let newTimestamp = new Date(lastTimestamp + delta * 1000);

    CEP_own_x += Math.sin(CEP_K_e * Math.PI / 180) * (delta * CEP_v_e * (1852/3600));
    CEP_own_y += Math.cos(CEP_K_e * Math.PI / 180) * (delta * CEP_v_e * (1852/3600));
    CEP_target_x += Math.sin(CEP_K_d * Math.PI / 180) * (delta * CEP_v_d * (1852/3600));
    CEP_target_y += Math.cos(CEP_K_d * Math.PI / 180) * (delta * CEP_v_d * (1852/3600));

    console.log("own X:", CEP_own_x );

    let dx = CEP_target_x - CEP_own_x;
    let dy = CEP_target_y - CEP_own_y;

    let bearingRad = Math.atan2(dx, dy);
    let bearingDeg = bearingRad * 180 / Math.PI;
    if (bearingDeg < 0 ) bearingDeg += 360;
    if (bearingDeg > 360) bearingDeg -= 360;
    if (bearingDeg === 0) bearingDeg = 360

    console.log('Distanz_Meter:' + Math.sqrt(dx * dx + dy * dy).toFixed(1) + "m");

    console.log("Aktuelle Peilung: " + bearingDeg.toFixed(1) + "°");

    CEP_data.push([newTimestamp, CEP_K_e, bearingDeg]);
}

function generateDemoData() {

    const now = Date.now();
    //const now = new Date(2024,4,4,13,0,15,12);
    const twentyMinAgo = now - 20 * 60 * 1000;
    const steps = 60;  // 60 Punkte über 20 min = alle 20 Sekunden (optisch klar)
    const stepTime = (20 * 60 * 1000) / steps;
    let demoData = [];
    for (let i = 0; i <= steps; i++) {
        let timestamp = twentyMinAgo + i * stepTime;
        // eigener Kurs: lineare Zunahme von 30° auf 330° (durchläuft Mitte)
        //let own = 30 + (i / steps) * 300;
        //own = own % 360;

        let own = 340;
        // Zielpeilung: Sinus-artig um 180° mit Amplitude 70°
        let target = 180 + 70 * Math.sin(i * Math.PI / 12);
        target = ((target % 360) + 360) % 360;
        demoData.push([timestamp, own, target]);
    }
    CEP_data = demoData;


}
function start_simulation() {
    CEP_lastFrameTime = null;
    CEP_simulation_running = true;

    //CEP_K_e_tv = 0;
    animationId = requestAnimationFrame(animate);
}


function pause_simulation(){
    CEP_simulation_running = false;
}

function reset_simulation(){

}

function update_Inertia(delta) {
    let aim = ['target','own'];

    const MAX_ACCEL = 0.5;
    let CourseElem;
    let SpeedElem;// maximale Beschleunigung/Bremsen: 0.5 Knoten pro Sekunde

    let turn_rate;
    let currentHeading;
    let currentSpeed;
    let targetHeading;
    let targetSpeed;

    aim.forEach(a => {
        if (a === 'own') {
            currentHeading = CEP_K_e;
            currentSpeed = CEP_v_e;
            targetHeading = CEP_K_e_tv;
            targetSpeed = CEP_v_e_tv;
        }
        else {
            currentHeading = CEP_K_d;
            currentSpeed = CEP_v_d;
            targetHeading = CEP_K_d_tv;
            targetSpeed = CEP_v_d_tv;

        }
        turn_rate = 1*currentSpeed; //Drehrate Geschwindigkeitsabhändig. Ist 1° pro Sekunde pro Knoten

        // 1. Kursänderung mit maximaler Drehrate in Richtung Zielkurs
        let headingDiff = targetHeading - currentHeading;
        // Kürzesten Weg beachten (Winkel von -180 bis 180)
        if (headingDiff > 180) headingDiff -= 360;
        if (headingDiff < -180) headingDiff += 360;
        let maxChange = turn_rate * delta;
        let headingChange = Math.min(maxChange, Math.max(-maxChange, headingDiff));
        currentHeading += headingChange;
        // Normalisierung auf 0..360
        currentHeading = ((currentHeading % 360) + 360) % 360;

        // 2. Geschwindigkeitsänderung (Beschleunigung / Bremsen)
        let speedDiff = targetSpeed - currentSpeed;
        let maxSpeedChange = MAX_ACCEL * delta;
        let speedChange = Math.min(maxSpeedChange, Math.max(-maxSpeedChange, speedDiff));
        currentSpeed += speedChange;
        // Begrenzung auf 0..30 Knoten
        currentSpeed = Math.min(30, Math.max(0, currentSpeed));

        if (a === 'target') {
            CEP_K_d = currentHeading;
            CEP_v_d = currentSpeed;
            CourseElem = document.querySelector('#target_input .istwert-course');
            SpeedElem = document.querySelector('#target_input .istwert-speed');
        }
        else {
            CEP_K_e = currentHeading;
            CEP_v_e = currentSpeed;
            CourseElem = document.querySelector('#own_input .istwert-course');
            SpeedElem = document.querySelector('#own_input .istwert-speed');
        }
        currentHeading = currentHeading.toFixed(0);
        if (currentHeading === '0') currentHeading = '360';
        CourseElem.innerText = currentHeading;
        SpeedElem.innerText = currentSpeed.toFixed(1);
    })



}