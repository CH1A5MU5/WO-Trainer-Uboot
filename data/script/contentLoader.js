

function loadContentById(buttonId) {
    CEP_simulation_running = false;

    console.log(`loadContentById aufgerufen mit ID: ${buttonId}`);
    switch (buttonId) {
        case 'MEN':
            show_Menu();
            break;
        case 'DOT':      // Rechenschieber
            show_DOT();
            break;
        case 'DOT_SLR':      // 30M Regel
            show_DOT_SLR();
            break;
        case 'DOT_30M':
            show_DOT_30M();
            break;
        case 'DOT_KOP':
            show_DOT_KOP();
            break;
        case 'DOT_SPC':
            show_DOT_SPC();
            break;
        case 'GKU':
            show_GKU();
            break;
        case 'GKU_GP':
            show_GKU_GP();
            break;
        case 'GKU_PD':
            show_GKU_PD();
            break;
        case 'GKU_GRE':
            show_GKU_GRE();
            break;
        case 'LIV':
            show_LIV();
            break;
        case 'LIV_GK':
            show_LIV_GK();
            break;
        case 'LIV_LIS':
            show_LIV_LIS();
            break;
        case 'LIV_LIB':
            show_LIV_LIB();
            break;
        case 'LIV_LIT':
            show_LIV_LIT();
            break;
        case 'LIV_T12':
            show_LIV_T12();
            break;
        case 'SPA':
            show_SPA();
            break;
        case 'SPA_OSA':
            show_SPA_OSA();
            break;
        case 'SPA_RSA':
            show_SPA_RSA();
            break;
        case 'SPA_DOSA':
            show_SPA_DOSA();
            break;
        case 'SPL':
            show_SPL();
            break;
        case 'SPL_OSL':
            show_SPL_OSL();
            break;
        case 'SPL_RSL':
            show_SPL_RSL();
            break;
        case '193':
            show_193();
            break;
        case '193_PD':
            show_193_PD();
            break;
        case '193_KA':
            show_193_KA();
            break;
        case '193_SO':
            show_193_SO();
            break;
        case '193_CPA':
            show_193_CPA();
            break;
        case '193_KUR':
            show_193_KUR();
            break;
        case '193_STE':
            show_193_STE();
            break;
        case 'FTR':
            show_FTR();
            break;
        case 'FTR_RSA':
            show_FTR_RSA();
            break;
        case 'FTR_OSA':
            show_FTR_OSA();
            break;
        case 'CEB':
            show_CEB();
            break;
        case 'CEB_KI':
            show_CEB_KI();
            break;
        case 'CEB_ME':
            show_CEB_ME();
            break;
        case 'CEB_MEKA':
            show_CEB_MEKA();
            break;
        case 'CEP':
            show_CEP();
            break;
        case 'CEP_BAS':
            show_CEP_BAS();
            break;
        case 'SPL_TCPA':
            show_SPL_tCPA();
            break;






        // Weitere IDs nach dem gleichen Schema:
        // case 'DOT': ... (Distance of Track Hauptbutton? ggf. eigenes Template)
        // case 'GEGNERKURS': ...
        // case 'LI_TRAINER': ...
        // case 'CEP_TRAINER': ...
        default:
            showDefault();
            break;
    }
}

function showDefault() {
    const content = document.querySelector('content');
    content.innerHTML = 'Diese Seite befindet sich derzeit noch in der Entwicklung.';



}