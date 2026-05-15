let animationId = null;


function animate(timestamp) {
    if (!CEP_lastFrameTime) {
        CEP_lastFrameTime = timestamp;
        requestAnimationFrame(animate);
        return;
    }
    let delta = Math.min(0.05, (timestamp - CEP_lastFrameTime) / 1000);
    //console.log('Timestamp' + timestamp);
    //console.log('Sim Running' + delta);

    //console.log('jetzt' + Date.now());
    if (delta > 0) {
        update_own_movement(delta);
        update_CEP();
        //updateInertia(delta);       // Trägheit auf Ist-Werte anwenden
        //updateShipMovement(delta);  // Bewegung mit den Ist-Werten
        //updateActualDisplay();      // Anzeige der Ist-Werte aktualisieren
        //renderScene();
    }
    CEP_lastFrameTime = timestamp;
    if (CEP_simulation_running) {
        animationId = requestAnimationFrame(animate);
    }

}

function update_own_movement(delta, timestamp) {
        // Zielbewegung ist 360° in 10minuten
        // 36° pro minute
        // 0,6° pro sekunde
    if (CEP_data.length === 0 ){
        CEP_data.push([Date.now, 360, 90]);
    }

    let target = 90;
    let last_own = CEP_data[CEP_data.length - 1][1];

    let own = last_own + CEP_multiplier*delta*360/(60);
    own = navy_course(own);

    CEP_data[CEP_data.length - 1][0] = Date.now();
    CEP_data[CEP_data.length - 1][1] = own;
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

    CEP_K_e = 0;
    animationId = requestAnimationFrame(animate);
}


function pause_simulation(){
    CEP_simulation_running = false;
}

function reset_simulation(){

}