function rand_basic_1936_sit(){
    let R_m_target = rand_Int(1500,15000);

    let K_e_1 = rand_Int(1,36)*10;
    let v_e_1 = rand_Int(3,8);


    let K_e_2 = rand_Int(3,15)*10;




    let course_change_left = rand_Bool();
    if (course_change_left) K_e_2 = K_e_1 - K_e_2;
    else K_e_2 = K_e_1 + K_e_2;
    K_e_2 = navy_course(K_e_2);
    let v_e_2 = rand_Int(3,8);

    let B_mn = rand_Int(1,360);

    let OSA_1 = v_e_1 * uboot_sinus(B_mn - K_e_1);
    let TSA = rand_Int(-15,15);
    let RSA1 = OSA_1 + TSA;
    if (RSA1 > -1.5 && RSA1 < 1.5){
        if (RSA1 < 0) {
            RSA1 = -1.5;
        }
        else {
            RSA1 = 1.5;
        }
        TSA = RSA1-OSA_1;
    }

    let v_d_min = Math.round(Math.abs(TSA));
    let v_d = rand_Int(v_d_min + 1, 25);

    let closing = rand_Bool();
    let I_m = Math.round(make_degree(Math.asin(TSA/v_d)));
    if (!closing){
        if (I_m < 0){
            I_m = -180 - I_m;
        }
        else{
            I_m = 180 - I_m;
        }
    }



    let BR_1 = (RSA1/R_m_target)*1936;
    BR_1 = BR_1.toFixed(1);

    let OSA_2 = v_e_2 * uboot_sinus(B_mn - K_e_2);
    let BR_2 = ((OSA_2+TSA)/R_m_target)*1936;
    BR_2 = BR_2.toFixed(1);

    showtest = [
        K_e_1, //0
        v_e_1, //1
        BR_1,  //2
        K_e_2, //3
        v_e_2, //4
        BR_2,  //5
        B_mn,  //6
        I_m,   //7
        v_d,    //8
        R_m_target,
        RSA1,
        OSA_1,
        OSA_2,
        TSA
    ];

    return [
        K_e_1, //0
        v_e_1, //1
        BR_1,  //2
        K_e_2, //3
        v_e_2, //4
        BR_2,  //5
        B_mn,  //6
        I_m,   //7
        v_d    //8
    ]
}

