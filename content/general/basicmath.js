

function rand_Int(min, max){
    let diff = (max - min);
    return 1*min + Math.floor(Math.random() * (diff + 1));
}

function rand_Bool(){
    let a = rand_Int(0,1);
    a = a === 0;
    return a;
}



function navy_course(course){
    if (course > 360){
        course = course - 360;
    }
    else if (course < 1){
        course = course + 360;
    }
    return course;
}

function make_radian(angle){
    angle = angle* (2*Math.PI/360);
    return angle;
}

function make_degree(degree){
    degree = (360*degree)/(2*Math.PI);
    return degree;
}

function three_letter(A){
    if (A === 0){
        A = 360;
    }

    A = A.toString();
    if (A.length === 2){
        A = '0' + A;
    }
    else if (A.length === 1){
        A = '00' + A;
    }
    return A;
}

function convert_min2sek(mmss){
    let position = mmss.indexOf(':');
    let min = parseInt(mmss.slice(0, position ));
    let sek = parseInt(mmss.slice(position +1, mmss.length));
    sek = min*60 + sek;
    return sek;
}

function convert_sek2min(sek){
    let min = (sek - (sek % 60)) / 60;
    sek = sek % 60;
    if (sek<10){
        sek = '0'+sek;
    }
    return min + ':' +sek;
}

function uboot_sinus(angle){
    let angle_mp;
    let u_sin;
    let over;
    let angle180;
    if (angle<0){
        angle_mp = angle * -1;
    }
    else{
        angle_mp = angle;
    }
    if (angle_mp > 360){
        over = angle_mp/180;
        angle180 = angle_mp -(180*over);
    }
    else {
        angle180 = angle_mp;
    }

    let angle_round = Math.round(angle180/10);

    switch (angle_round){
        case 0: u_sin = 0; break;
        case 1: u_sin = 0.2; break;
        case 2: u_sin = 0.3; break;
        case 3: u_sin = 0.5; break;
        case 4: u_sin = 0.6; break;
        case 5: u_sin = 0.7; break;
        case 6: u_sin = 0.8; break;
        case 7: u_sin = 0.9; break;
        case 8: u_sin = 1; break;
        case 9: u_sin = 1; break;
        case 10: u_sin = 1; break;
        case 11: u_sin = 0.9; break;
        case 12: u_sin = 0.8; break;
        case 13: u_sin = 0.7; break;
        case 14: u_sin = 0.6; break;
        case 15: u_sin = 0.5; break;
        case 16: u_sin = 0.3; break;
        case 17: u_sin = 0.2; break;
        case 18: u_sin = 0; break;
        case 19: u_sin = -0.2; break;
        case 20: u_sin = -0.3; break;
        case 21: u_sin = -0.5; break;
        case 22: u_sin = -0.6; break;
        case 23: u_sin = -0.7; break;
        case 24: u_sin = -0.8; break;
        case 25: u_sin = -0.9; break;
        case 26: u_sin = -1; break;
        case 27: u_sin = -1; break;
        case 28: u_sin = -1; break;
        case 29: u_sin = -0.9; break;
        case 30: u_sin = -0.8; break;
        case 31: u_sin = -0.7; break;
        case 32: u_sin = -0.6; break;
        case 33: u_sin = -0.5; break;
        case 34: u_sin = -0.3; break;
        case 35: u_sin = -0.2; break;
        case 36: u_sin = 0; break;
    }
    if (angle < 0) {
        u_sin = u_sin * -1;
    }
    return u_sin;
}

function uboot_cosinus(angle){
    angle = angle + 90;
    return uboot_sinus(angle);
}

function general_KeBmn(){
    let K_e = rand_Int(1,36)*10;

    let B_m = rand_Int(0,140);
    let B_mleft = rand_Bool();
    if (B_mleft){
        B_m = B_m *-1;
    }

    let B_mn = K_e + B_m;
    if (B_mn < 0){
        B_mn = B_mn + 360;
    }
    else if (B_mn > 360){
        B_mn = B_mn - 360;
    }

    return [
        K_e,
        B_mn
    ];
}