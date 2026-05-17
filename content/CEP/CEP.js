function show_CEP(){
    let title = 'CEP Trainer';
    let cont = 'Wählen Sie links einen Simulationstypen aus ' +
        ' und üben Sie den Lagebildaufbau mit dem CEP. Im Basis Trainer bestimmen Sie selber, wie sich der Gegner' +
        'verhält. Im Elite Trainer macht dies der Computer für Sie.';
    make_submenu(title, cont);
}

function show_CEP_BAS(){
    CEP_simulation_running = true;

    CEP_v_e = 0;
    CEP_K_e = 360;
    CEP_v_d = 0;
    CEP_K_d = 360;

    CEP_own_x = 0; //Position von Eigenboot und Gegner. Karthesisches Koordinatensystem in Meter.
    CEP_own_y = 0;
    CEP_target_x = 3657.6;
    CEP_target_y = 0;

    CEP_data = [];
    CEP_data.push([new Date (Date.now()), 360, 90]);


    clean_content();
    make_topdown_flex();
    create_ui();
    render_latex();



    add_CEP_buttons();

    //generateDemoData();
    update_CEP();
    update_real_sit();



    //make_CEP();
    //make_CEP_UI();

}