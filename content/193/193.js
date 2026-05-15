function show_193(){
    let title = '1936 - Verfahren';
    let cont = 'Wählen Sie links einen Aufgabentypen aus ' +
        'oder lernen Sie alles über die Entfernungsbestimmung mittels ' +
        'dem 1936-Verfahren über die Hilfefunktion.';
    make_submenu(title, cont);
}

function show_193_PD(){
    let title = 'Bestimmen Sie die Entfernung mit dem 1936-Verfahren.';

    let val = rand_basic_1936_sit()

    let K_e = val[0];
    let v_e = val[1];
    let BR = val[2]
    let B_mn = val[6];
    let I_m = Math.round((val[7]/10))*10;
    let v_d = val[8];

    let I_mshow;
    if (I_m < 0){
        I_mshow = 'L ' + I_m*-1;
    }
    else {
        I_mshow = 'R ' + I_m;
    }

    if (I_m === 0 || I_m === 180 ){
        I_mshow = 'BL ' + I_m
    }


    let OSA = v_e * uboot_sinus(B_mn - K_e);

    let TSA = v_d * uboot_sinus(I_m);

    let RSA = OSA + TSA

    let R_m = 1936 * (RSA/BR);

    if (R_m < 0){
        R_m = R_m *-1;
    }

    let values = []
    values [0] = ['Eigenkurs','$\\mathrm{K_e}$', three_letter(K_e), ''];
    values [1] = ['Eigenfahrt','$\\mathrm{v_e}$', v_e, 'kn'];
    values [2] = ['Bearingrate','$\\mathrm{\\dot{B}}$', BR , '$\\mathrm{\\frac{°}{min}}$'];
    values [3] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn) , ''];
    values [4] = ['Gegnerlage','$\\mathrm{I_{m}}$', I_mshow , ''];
    values [5] = ['Gegnerfahrt','$\\mathrm{v_d}$', v_d , 'kn'];

    make_basic_table_exercise(
        title,
        values,
        false,
        'yds'
    );
    ergebnis = [R_m, //Das exakte Ergebnis
        false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'yds', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

    zwischenergebnis = [];
    zwischenergebnis[0] = ['$\\mathrm{OSA}$',OSA.toFixed(1),'kn'];
    zwischenergebnis[1] = ['$\\mathrm{TSA}$',TSA.toFixed(1),'kn'];
    zwischenergebnis[2] = ['$\\mathrm{RSA}$',RSA.toFixed(1),'kn'];
}

function show_193_KA() {
    let title = 'Bestimmen Sie die Entfernung mit dem 1936-Verfahren.';

    let val = rand_basic_1936_sit()

    let K_e1 = val[0];
    let v_e1 = val[1];
    let BR1 = val[2]
    let K_e2 = val[3];
    let v_e2 = val[4];
    let BR2 = val[5];
    let B_mn = val[6];

    let OSA1 = v_e1 * uboot_sinus(B_mn - K_e1);
    let OSA2 = v_e2 * uboot_sinus(B_mn - K_e2);

    let DOSA = Math.abs(OSA2 - OSA1);

    let DB = BR2 - BR1;
    if (DB<0){
        DB = DB * -1;
    }

    let R_m = 1936 * (DOSA / DB);


    let values = []
    values [0] = ['Eigenkurs vor KÄ','$\\mathrm{K_{e1}}$', three_letter(K_e1), ''];
    values [1] = ['Eigenfahrt vor KÄ','$\\mathrm{v_{e1}}$', v_e1, 'kn'];
    values [2] = ['Bearingrate vor KÄ','$\\mathrm{\\dot{B}_{1}}$', BR1, '$\\mathrm{\\frac{°}{min}}$'];
    values [3] = ['Eigenkurs nach KÄ','$\\mathrm{K_{e2}}$', three_letter(K_e2), ''];
    values [4] = ['Eigenfahrt nach KÄ','$\\mathrm{v_{e2}}$', v_e2, 'kn'];
    values [5] = ['Bearingrate nach KÄ','$\\mathrm{\\dot{B}_{2}}$', BR2, '$\\mathrm{\\frac{°}{min}}$'];
    values [6] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn), ''];

    if (DB > 0.5){
        make_basic_table_exercise(
            title,
            values,
            false,
            'yds'
        );

        ergebnis = [R_m, //Das exakte Ergebnis
            false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
            'yds', // Einheit des Ergebnisses
            0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

        zwischenergebnis = [];
        zwischenergebnis[0] = ['$\\mathrm{OSA_1}$',OSA1.toFixed(1),'kn'];
        zwischenergebnis[1] = ['$\\mathrm{OSA_2}$',OSA2.toFixed(1),'kn'];
        zwischenergebnis[2] = ['$\\mathrm{\\Delta OSA}$',DOSA.toFixed(1),'kn'];


    }
    else {

        show_193_KA();
    }

}

function show_193_SO(){
    let title = 'Bestimmen Sie mit dem 1936-Verfahren die Entfernung zu einem stationären Objekt.';

    let R_m_target = rand_Int(1500,15000);

    let K_e = rand_Int(1,36)*10;
    let v_e = rand_Int(3,8);
    let B_m = rand_Int(30,150);
    let B_mleft = rand_Bool();
    if (B_mleft){
        B_m = B_m *-1;
    }

    let B_mn = navy_course(K_e + B_m);

    let OSA = v_e * uboot_sinus(B_mn - K_e);
    let BR = 1936*(OSA/R_m_target)
    BR = BR.toFixed(1);

    let R_m = 1936 * (OSA / BR);

    let values = []
    values [0] = ['Eigenkurs','$\\mathrm{K_{e}}$', three_letter(K_e), ''];
    values [1] = ['Eigenfahrt','$\\mathrm{v_{e}}$', v_e, 'kn'];
    values [2] = ['Bearingrate','$\\mathrm{\\dot{B}}$', BR, '$\\mathrm{\\frac{°}{min}}$'];
    values [3] = ['Objektpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn), ''];

    make_basic_table_exercise(
        title,
        values,
        false,
        'yds'
    );

    ergebnis = [R_m, //Das exakte Ergebnis
        false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'yds', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

    zwischenergebnis = [];
    zwischenergebnis[0] = ['$\\mathrm{OSA}$',OSA.toFixed(1),'kn'];
}

function show_193_CPA(){
    let title = 'Bestimmen Sie mit dem 1936-Verfahren die Entfernung im CPA.';

    let R_m_target = rand_Int(1500,15000);

    let K_e = rand_Int(1,36)*10;
    let v_e = rand_Int(3,8);
    let v_d = rand_Int(10,20);
    let B_m = rand_Int(0,150);
    let B_mleft = rand_Bool();
    if (B_mleft){
        B_m = B_m *-1;
    }

    let B_mn = navy_course(K_e + B_m);
    let TSA;
    let bowleft = rand_Bool();
    if (bowleft){
        TSA = v_d * -1;
    }
    else{
        TSA = v_d;
    }

    let OSA = v_e * uboot_sinus(B_mn - K_e);
    let BR = 1936*((OSA+TSA)/R_m_target)
    BR = parseFloat(BR.toFixed(1));

    let R_m = 1936 * ((OSA+TSA) / BR);

    let values = []
    values [0] = ['Eigenkurs','$\\mathrm{K_{e}}$', three_letter(K_e), ''];
    values [1] = ['Eigenfahrt','$\\mathrm{v_{e}}$', v_e, 'kn'];
    values [2] = ['Bearingrate','$\\mathrm{\\dot{B}}$', BR, '$\\mathrm{\\frac{°}{min}}$'];
    values [3] = ['Objektpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn), ''];
    values [4] = ['Gegnerfahrt','$\\mathrm{v_{d}}$', v_d, ''];


    make_basic_table_exercise(
        title,
        values,
        false,
        'yds'
    );

    ergebnis = [R_m, //Das exakte Ergebnis
        false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        'yds', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

    zwischenergebnis = [];
    zwischenergebnis[0] = ['$\\mathrm{OSA}$',OSA.toFixed(1),'kn'];
    zwischenergebnis[1] = ['$\\mathrm{TSA}$',TSA.toFixed(1),'kn'];

}

function show_193_KUR(){
    let title = 'Bestimmen Sie den Gegnerkurs mit dem 1936-Verfahren.';

    let val = rand_basic_1936_sit()

    let K_e1 = val[0];
    let v_e1 = val[1];
    let BR1 = val[2];
    let K_e2 = val[3];
    let v_e2 = val[4];
    let BR2 = val[5];
    let B_mn = val[6];
    let v_d = val[8];

    let OSA1 = v_e1 * uboot_sinus(B_mn - K_e1);
    let OSA2 = v_e2 * uboot_sinus(B_mn - K_e2);

    let DOSA = Math.abs(OSA2 - OSA1);

    let DB = Math.abs(BR2 - BR1);


    let R_m = 1936 * (DOSA / DB);

    let RSA = (R_m * BR2)/1936;
    let TSA = RSA - OSA2;

    let isclosing = rand_Bool();

    let I_m = Math.round(make_degree(Math.asin(TSA/v_d)));
    if (!isclosing){
        if (I_m < 0){
            I_m = -180 - I_m;
        }
        else{
            I_m = 180 - I_m;
        }
    }

    let K_e = navy_course(B_mn + 180 - I_m);

    if (isNaN(K_e)) alert('Ke ist NaN');

    let values = []
    values [0] = ['Eigenkurs vor KÄ','$\\mathrm{K_{e1}}$', three_letter(K_e1), ''];
    values [1] = ['Eigenfahrt vor KÄ','$\\mathrm{v_{e1}}$', v_e1, 'kn'];
    values [2] = ['Bearingrate vor KÄ','$\\mathrm{\\dot{B}_{1}}$', BR1, '$\\mathrm{\\frac{°}{min}}$'];
    values [3] = ['Eigenkurs nach KÄ','$\\mathrm{K_{e2}}$', three_letter(K_e2), ''];
    values [4] = ['Eigenfahrt nach KÄ','$\\mathrm{v_{e2}}$', v_e2, 'kn'];
    values [5] = ['Bearingrate nach KÄ','$\\mathrm{\\dot{B}_{2}}$', BR2, '$\\mathrm{\\frac{°}{min}}$'];
    values [6] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn), ''];
    values [7] = ['Gegnerfahrt','$\\mathrm{v_{d}}$', v_d, 'kn'];
    if (isclosing){
        values [8] = ['Kurvenverhalten','', 'anlaufend', ''];
    }
    else {
        values [8] = ['Kurvenverhalten','', 'ablaufend', ''];
    }

    if (DB > 0.5){
        make_basic_table_exercise(
            title,
            values,
            false,
            ''
        );

        ergebnis = [K_e, //Das exakte Ergebnis
            false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
            '', // Einheit des Ergebnisses
            0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

        zwischenergebnis = [];
        zwischenergebnis[0] = ['$\\mathrm{OSA_1}$',OSA1.toFixed(1),'kn'];
        zwischenergebnis[1] = ['$\\mathrm{OSA_2}$',OSA2.toFixed(1),'kn'];
        zwischenergebnis[2] = ['$\\mathrm{RSA_2}$',RSA.toFixed(1),'kn'];
        zwischenergebnis[3] = ['$\\mathrm{TSA}$',TSA.toFixed(1),'kn'];
        zwischenergebnis[4] = ['$\\mathrm{I_m}$',I_m,'°'];

    }
    else {
        show_193_KUR();
    }



}

function show_193_STE(){
    let title = 'Bestimmen Sie den Gegnerkurs mit dem 1936-Verfahren in der stehenden Peilung unter der Annahme, das er anläuft.';

    let K_e = rand_Int(1,36)*10;
    let v_e = rand_Int(3,8);
    let B_m = rand_Int(30,150);
    let B_mleft = rand_Bool();
    if (B_mleft){
        B_m = B_m *-1;
    }

    let B_mn = navy_course(K_e + B_m);


    let OSA = v_e * uboot_sinus(B_mn - K_e);

    let TSA = OSA *-1;

    let v_d_min = Math.round(Math.abs(TSA));
    let v_d = rand_Int(v_d_min + 1, 25);

    let I_m = Math.round(make_degree(Math.asin(TSA/v_d)));


    let K_d = navy_course(B_mn + 180 - I_m);


    let values = []
    values [0] = ['Eigenkurs','$\\mathrm{K_{e}}$', three_letter(K_e), ''];
    values [1] = ['Eigenfahrt','$\\mathrm{v_{e}}$', v_e, 'kn'];
    values [2] = ['Bearingrate','$\\mathrm{\\dot{B}}$', 0, '$\\mathrm{\\frac{°}{min}}$'];
    values [3] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn), ''];
    values [4] = ['Gegnerfahrt','$\\mathrm{v_{d}}$', v_d, 'kn'];

    make_basic_table_exercise(
        title,
        values,
        false,
        ''
    );

    ergebnis = [K_d, //Das exakte Ergebnis
        false, //ist true, wenn der Schüler ein korrektes Ergebnis erzeugen soll.
        '', // Einheit des Ergebnisses
        0]; //Anzahl der Zeichen nach dem Komma in der Ergebnisanzeige

    zwischenergebnis = [];
    zwischenergebnis[0] = ['$\\mathrm{OSA}$',OSA.toFixed(1),'kn'];
    zwischenergebnis[1] = ['$\\mathrm{TSA}$',TSA.toFixed(1),'kn'];
    zwischenergebnis[2] = ['$\\mathrm{I_m}$',I_m,'°'];

}