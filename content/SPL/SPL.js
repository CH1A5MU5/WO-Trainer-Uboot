function show_SPL(){
    let title = 'Speed Length - die Längsgeschwindigkeit';
    let cont = 'Wählen Sie links einen Aufgabentypen aus ' +
        'oder lernen Sie alles über die Berechnung von Längsgeschwindigkeiten ' +
        'mittels der Hilfefunktion.';
    make_submenu(title, cont);
}

//WICHTIG: Die Funktionen show_SPL_OSL und show_SPL_RSL sind Kopien
//aus SPA. Die Formelzeichen wurden nicht angepasst.

function show_SPL_OSL(){
    let isTSA = rand_Bool();
    let title;
    if (isTSA){
        title = 'Berechnen Sie die TSL des Gegners.';
    }
    else{
        title = 'Berechnen Sie Ihre OSL gegenüber dem Gegner';
    }
    let v_d = rand_Int(6,30);
    let v_e = rand_Int(2,8);

    let is_bowlleft = rand_Bool();
    let I_m = rand_Int(0,18)*10;
    let I_mshow;

    if (is_bowlleft){
        I_mshow = 'L ' + I_m;
    }
    else {
        I_mshow = 'R ' + I_m;
    }

    if (I_m === 0 || I_m === 180 ){
        I_mshow = 'BL ' + I_m
    }


    if (is_bowlleft){
        I_m = I_m * -1;
    }

    [K_e, B_mn] = general_KeBmn();

    let TSAOSA;
    if (isTSA){
        TSAOSA = v_d * uboot_cosinus(I_m);
    }
    else{
        TSAOSA = v_e * uboot_cosinus(B_mn - K_e);
    }

    let values = [];
    if (isTSA){
        values [0] = ['Gegnerlage','$\\mathrm{I_m}$', I_mshow, ''];
        values [1] = ['Gegnerfahrt','$\\mathrm{v_d}$', v_d, 'kn'];
    }
    else {
        values [1] = ['Eigenfahrt','$\\mathrm{v_e}$', v_e, 'kn'];
        values [0] = ['Eigenkurs','$\\mathrm{K_e}$', three_letter(K_e), ''];
        values [2] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn) , ''];
    }
    make_basic_table_exercise(
        title,
        values,
        true,
        'kn',
        true
    );

    ergebnis = [TSAOSA, //Das exakte Ergebni
        true,// , //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'kn', // Einheit des Ergebnisses
        1]; //Anzahl der Zeichen nach dem Komma in de

}

function show_SPL_RSL (){
    let title = 'Berechnen Sie die RSL.';

    let v_d = rand_Int(6,30);
    let v_e = rand_Int(2,8);

    let is_bowlleft = rand_Bool();
    let I_m = rand_Int(0,18)*10;
    let I_mshow;
    if (is_bowlleft){
        I_mshow = 'L ' + I_m;
    }
    else {
        I_mshow = 'R ' + I_m;
    }

    if (I_m === 0 || I_m === 180 ){
        I_mshow = 'BL ' + I_m
    }

    if (is_bowlleft){
        I_m = I_m * -1;
    }

    [K_e, B_mn] = general_KeBmn();

    let values = [];
    values [0] = ['Eigenkurs','$\\mathrm{K_e}$', three_letter(K_e), ''];
    values [1] = ['Eigenfahrt','$\\mathrm{v_e}$', v_e, 'kn'];
    values [2] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn) , ''];
    values [3] = ['Gegnerlage','$\\mathrm{I_m}$', I_mshow, ''];
    values [4] = ['Gegnerfahrt','$\\mathrm{v_d}$', v_d, 'kn'];

    make_basic_table_exercise(
        title,
        values,
        true,
        'kn',
        true
    );

    let TSA = v_d * uboot_cosinus(I_m);

    let OSA = v_e * uboot_cosinus(B_mn - K_e);

    let RSA = OSA + TSA;

    ergebnis = [RSA, //Das exakte Ergebni
        true,// , //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'kn', // Einheit des Ergebnisses
        1]; //Anzahl der Zeichen nach dem Komma in de

    zwischenergebnis = [];
    zwischenergebnis[0] = ['$\\mathrm{OSL}$',OSA.toFixed(1),'kn'];
    zwischenergebnis[1] = ['$\\mathrm{TSL}$',TSA.toFixed(1),'kn'];


}

function show_SPL_tCPA(){
    let title = 'Berechnen Sie den Zeitpunkt des CPA ($\\mathrm{t_{CPA}}$).';

    let v_d = rand_Int(15,30);
    let v_e = rand_Int(2,6);
    let R_m = rand_Int(2,10)*1000;

    let is_bowlleft = rand_Bool();
    let I_m = rand_Int(0,6)*10;
    let I_mshow;
    if (is_bowlleft){
        I_mshow = 'L ' + I_m;
    }
    else {
        I_mshow = 'R ' + I_m;
    }

    if (I_m === 0 || I_m === 180 ){
        I_mshow = 'BL ' + I_m
    }

    if (is_bowlleft){
        I_m = I_m * -1;
    }

    [K_e, B_mn] = general_KeBmn();

    let values = [];
    values [0] = ['Eigenkurs','$\\mathrm{K_e}$', three_letter(K_e), ''];
    values [1] = ['Eigenfahrt','$\\mathrm{v_e}$', v_e, 'kn'];
    values [2] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn) , ''];
    values [3] = ['Gegnerlage','$\\mathrm{I_m}$', I_mshow, ''];
    values [4] = ['Gegnerfahrt','$\\mathrm{v_d}$', v_d, 'kn'];
    values [5] = ['Entfernung','$\\mathrm{R_M}$',R_m, 'yds']

    let TSL = v_d * uboot_cosinus(I_m);

    let OSL = v_e * uboot_cosinus(B_mn - K_e);

    let RSL = OSL + TSL;

    let tCPA = (R_m/2000)/RSL;
    tCPA = Math.round(tCPA * 3600);

    make_basic_table_exercise(
        title,
        values,
        true,
        'm:s'
    );

    ergebnis = [tCPA, //Das exakte Ergebni
        false,// , //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'm:s', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in de

    zwischenergebnis = [];
    zwischenergebnis[0] = ['$\\mathrm{OSL}$',OSL.toFixed(1),'kn'];
    zwischenergebnis[1] = ['$\\mathrm{TSL}$',TSL.toFixed(1),'kn'];
    zwischenergebnis[2] = ['$\\mathrm{RSL}$',RSL.toFixed(1),'kn'];
}