console.log('Happy developing ✨')


//Definition globale Variablen
let ergebnis; //Ergebnisvektors. Wird bei Aufgabenerstellung überschrieben.
let zwischenergebnis;
let taskrunning; //Gibt an, ob wir uns gerade in einer Aufgabe befinden

//LI Trainer
let LI_preset;

//CEP Simulator

let CEP_simulation_running;
let CEP_multiplier;
let CEP_data = [];
let CEP_ms_on_ordinate;
let CEP_lastFrameTime;
let animationId = null;

//Eigen und Gegnerparamter
let CEP_K_e_tv; //Zielwerte
let CEP_v_e_tv;
let CEP_K_d_tv;
let CEP_v_d_tv;

let CEP_K_e; //Istwerte
let CEP_v_e;
let CEP_K_d;
let CEP_v_d;

let CEP_own_x;
let CEP_own_y;
let CEP_target_x;
let CEP_target_y;

//Bildschirmeinstellungen CEP_Simulator
const CEP_svg_width = 3110; //Gesamtbreite des SVG
const CEP_svg_height_min = 860; //Gesamthöhe in Vergleichsdarstellung
const CEP_svg_height_max = 1600; // Gesamthöhe ohne Vergleichsdarstellung
const CEP_svg_start_x = 120; //Startkoordinate x des CEP (ohne Skala)
const CEP_svg_start_y = 120; //Startkoordinate y des CEP (ohne Skala)
const CEP_svg_tick_length = 25; //Lenge von kurzen Strichen in der Skala
const CEP_svg_font_size = 38;
const CEP_svg_line_width = 3;
const CEP_svg_marker_width = 20;
// Globle Variablen der CEP Einstellung, keine config
const CEP_ordinate_length = CEP_svg_height_max - CEP_svg_start_y; // Länge der Ordinate: 1480px
const CEP_abzisse_length = 2 * CEP_ordinate_length;
const CEP_deg_on_abzisse = CEP_abzisse_length / 360;


