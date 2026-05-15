function show_SPA(){
    let title = 'Speed Across - die Quergeschwindigkeit';
    let cont = 'Wählen Sie links einen Aufgabentypen aus ' +
        'oder lernen Sie alles über die Berechnung von Quergeschwindigkeiten ' +
        'mittels der Hilfefunktion.';
    make_submenu(title, cont);
}

function show_SPA_OSA(){
    let isTSA = rand_Bool();
    let title;
    if (isTSA){
        title = 'Berechnen Sie die TSA des Gegners.';
    }
    else{
        title = 'Berechnen Sie Ihre OSA gegenüber dem Gegner';
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
        TSAOSA = v_d * uboot_sinus(I_m);
    }
    else{
        TSAOSA = v_e * uboot_sinus(B_mn - K_e);
    }

    let values = [];
    if (isTSA){
        values [1] = ['Gegnerfahrt','$\\mathrm{v_d}$', v_d, 'kn'];
        values [0] = ['Gegnerlage','$\\mathrm{I_m}$', I_mshow, ''];
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

function show_SPA_RSA (){
    let title = 'Berechnen Sie die RSA.';

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
    values [4] = ['Gegnerfahrt','$\\mathrm{v_d}$', v_d, 'kn'];
    values [3] = ['Gegnerlage','$\\mathrm{I_m}$', I_mshow, ''];
    values [2] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn) , ''];
    values [1] = ['Eigenfahrt','$\\mathrm{v_e}$', v_e, 'kn'];
    values [0] = ['Eigenkurs','$\\mathrm{K_e}$', three_letter(K_e), ''];

    make_basic_table_exercise(
        title,
        values,
        true,
        'kn',
        true
    );

    let TSA = v_d * uboot_sinus(I_m);

    let OSA = v_e * uboot_sinus(B_mn - K_e);

    let RSA = OSA + TSA;

    ergebnis = [RSA, //Das exakte Ergebni
        true,// , //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'kn', // Einheit des Ergebnisses
        1]; //Anzahl der Zeichen nach dem Komma in de

    zwischenergebnis = [];
    zwischenergebnis[0] = ['$\\mathrm{OSA}$',OSA.toFixed(1),'kn'];
    zwischenergebnis[1] = ['$\\mathrm{TSA}$',TSA.toFixed(1),'kn'];


}

function show_SPA_DOSA (){
    let title = 'Berechnen Sie das &Delta;OSA.';
    let v_e1 = rand_Int(2,8);
    let v_e2 = rand_Int(2,8);

    [K_e1, B_mn] = general_KeBmn();
    [K_e2, B_mn] = general_KeBmn();



    let OSA1 = v_e1 * uboot_sinus(B_mn - K_e1);
    let OSA2 = v_e2 * uboot_sinus(B_mn - K_e2);

    let DOSA = OSA2 - OSA1;
    if (DOSA < 0){
        DOSA = DOSA * -1;
    }

    let values = [];
    values [0] = ['Eigenkurs vor KÄ','$\\mathrm{K_{e1}}$', three_letter(K_e1), ''];
    values [1] = ['Eigenfahrt vor KÄ','$\\mathrm{v_{e1}}$', v_e1, 'kn'];
    values [2] = ['Eigenkurs nach KÄ','$\\mathrm{K_{e2}}$', three_letter(K_e2), ''];
    values [3] = ['Eigenfahrt nach KÄ','$\\mathrm{v_{e1}}$', v_e2, 'kn'];
    values [4] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn) , ''];

    make_basic_table_exercise(
        title,
        values,
        true,
        'kn',
        false
    );

    ergebnis = [DOSA, //Das exakte Ergebni
        true,// , //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'kn', // Einheit des Ergebnisses
        1]; //Anzahl der Zeichen nach dem Komma in de


    zwischenergebnis = [];
    zwischenergebnis[0] = ['$\\mathrm{OSA_1}$',OSA1.toFixed(1),'kn'];
    zwischenergebnis[1] = ['$\\mathrm{OSA_2}$',OSA2.toFixed(1),'kn'];
}