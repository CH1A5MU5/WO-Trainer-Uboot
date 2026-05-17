function show_FTR(){
    let title = 'Family Tree';
    let cont = 'Wählen Sie links einen Aufgabentypen aus ' +
        'oder lernen Sie alles über den Family Tree des Ubootfahrens ' +
        'mittels der Hilfefunktion.';
    make_submenu(title, cont);
}

function show_FTR_RSA(){
    let title = 'Berechnen Sie den fehlenden Wert im Family Tree';

    let val = rand_basic_1936_sit();

    let K_e = val[0];
    let v_e = val[1];
    let BR = val[2];
    let B_mn = val[6];
    let I_m = val[7];
    let v_d = val[8];


    let OSA = v_e * uboot_sinus(B_mn - K_e);

    let TSA = v_d * uboot_sinus(I_m);

    let RSA = OSA + TSA;

    let R_m = Math.round(1936 * (RSA/BR));

    let isopening_show;

    if (Math.abs(I_m)>90){
        isopening_show = 'ablaufend';
    }
    else{
        isopening_show = 'anlaufend';
    }
    let K_d = navy_course(B_mn + 180 - I_m);


    let fallaway = rand_Int(0,4);
    switch (fallaway) {
        case 0: fallaway = 1; break;
        case 1: fallaway = 2; break;
        case 2: fallaway = 4; break;
        case 3: fallaway = 5; break;
        case 4: fallaway = 6; break;
    }


    let values = []
    values [0] = ['Eigenkurs','$\\mathrm{K_e}$', three_letter(K_e), ''];
    values [1] = ['Eigenfahrt','$\\mathrm{v_e}$', v_e, 'kn'];
    values [2] = ['Bearingrate','$\\mathrm{\\dot{B}}$', BR , '$\\mathrm{\\frac{°}{min}}$'];
    values [3] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn) , ''];
    values [4] = ['Gegnerkurs','$\\mathrm{K_{d}}$', three_letter(K_d) , ''];
    values [5] = ['Gegnerfahrt','$\\mathrm{v_d}$', v_d , 'kn'];
    values [6] = ['Entfernung','$\\mathrm{R_m}$', R_m , 'yds'];
    values [7] = ['Kurvenverhalten','', isopening_show , ''];

    make_fall_away_exercise(values, fallaway, title);

}

function show_FTR_OSA(){
    let title = 'Berechnen Sie den fehlenden Wert im Family Tree';

    let val = rand_basic_1936_sit()

    let K_e1 = val[0];
    let v_e1 = val[1];
    let BR1 = val[2];
    let K_e2 = val[3];
    let v_e2 = val[4];
    let BR2 = val[5];
    let B_mn = val[6];
    let I_m = val[7];
    let v_d = val[8];

    let OSA1 = v_e1 * uboot_sinus(B_mn - K_e1);
    let OSA2 = v_e2 * uboot_sinus(B_mn - K_e2);

    let DOSA = Math.abs(OSA2 - OSA1);

    let DB = Math.abs(BR2 - BR1);

    //if (DB>0.5 && DB <0.7) alert('DB kleiner 0.5');

    let R_m = Math.round(1936 * (DOSA / DB));

    let RSA = (R_m * BR2)/1936;

    let TSA = RSA - OSA2;

    let isopening_show;
    if (Math.abs(I_m)>90){
        isopening_show = 'ablaufend';
    }
    else{
        isopening_show = 'anlaufend';
    }

    let K_d = navy_course(B_mn + 180 - I_m);


    let fallaway = rand_Int(0,5);
    switch (fallaway) {
        case 0: fallaway = 1; break;
        case 1: fallaway = 2; break;
        case 2: fallaway = 4; break;
        case 3: fallaway = 5; break;
        case 4: fallaway = 7; break;
        case 5: fallaway = 8; break;

    }

    if (DB > 0.5 && TSA > 2){
        let values = [];
        values [0] = ['Eigenkurs vor KÄ','$\\mathrm{K_{e1}}$', three_letter(K_e1), ''];
        values [1] = ['Eigenfahrt vor KÄ','$\\mathrm{v_{e1}}$', v_e1, 'kn'];
        values [2] = ['Bearingrate vor KÄ','$\\mathrm{\\dot{B}_1}$', BR1 , '$\\mathrm{\\frac{°}{min}}$'];
        values [3] = ['Eigenkurs nach KÄ','$\\mathrm{K_{e2}}$', three_letter(K_e2), ''];
        values [4] = ['Eigenfahrt nach KÄ','$\\mathrm{v_{e2}}$', v_e2, 'kn'];
        values [5] = ['Bearingrate nach KÄ','$\\mathrm{\\dot{B}_2}$', BR2 , '$\\mathrm{\\frac{°}{min}}$'];
        values [6] = ['Gegnerpeilung','$\\mathrm{B_{mn}}$', three_letter(B_mn) , ''];
        values [7] = ['Gegnerkurs','$\\mathrm{K_{d}}$', three_letter(K_d) , ''];
        values [8] = ['Gegnerfahrt','$\\mathrm{v_d}$', v_d , 'kn'];
        values [9] = ['Kurvenverhalten','', isopening_show , ''];

        make_fall_away_exercise(values, fallaway, title);
    }
    else{
        show_FTR_OSA();
    }
}