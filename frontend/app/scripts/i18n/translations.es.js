'use strict';
define([], function() {

  return {
    WELCOME_MESSAGE: 'Always a pleasure scaffolding your apps',
    WELCOME_CONTROLLER: 'A new and shiny controller has been made!',
    WELCOME_CONTROLLER_FOLLOWUP: 'This is the default view for your controlller. Change it (if you want, of course)!',
    gt_zero:'Debe ser mayor a cero',
    future_date_required:'Debe introducir una fecha futura',
    sport_matcher:'Sport Matcher',
    user_greeting:'¡Hola {{name}}!',
    remember_me:'Recuérdame',
    login:'Iniciar Sesión',
    register:'Registrarse',
    already_have_account:'¿Ya tienes una cuenta?',
    username:'Email',
    password:'Contraseña',
    repeat_password:'Repita contraseña',
    first_name:'Nombre',
    last_name:'Apellido',
    profile_picture:'Imagen de perfil',
    choose_file:'Escoger archivo',
    no_file:'Ningún archivo seleccionado',
    file_error:'Error de archivo:',
    already_exists:'ya existe',
    or:'ó',
    home:'Inicio',
    showing_items:'Mostrando ítems',
    showing_pages:'Mostrando página',
    of:'de',
    first:'<< Comienzo',
    back:'< Anterior',
    next:'Siguiente >',
    last:'Final >>',
    logout:'Cerrar Sesión',
    login_error:'Email o contraseña inválidos',
    name:'Nombre',
    location:'Ubicación',
    club:'Club',
    sport:'Deporte',
    vacancies:'Vacantes',
    view_event:'Ver evento',
    address:'Dirección',
    organizer:'Organizador',
    join:'Unirse',
    leave:'Abandonar',
    status:'Estado:',
    completed:'Completo',
    uncompleted:'Incompleto',
    date:'Fecha',
    participants:'Participantes',
    different_passwords:'Las contraseñas no coinciden',
    filter:'Filtrar',
    events:'Eventos',
    event:'Evento',
    allEvents:'Eventos',
    myEvents:'Mis Eventos',
    pastEvents:'Eventos Pasados',
    upcomingEvents:'Próximos Eventos',
    profile:'Perfil',
    create_event:'Crear Evento',
    create:'Crear',
    event_name:'Nombre',
    event_location:'Ubicación',
    event_description:'Descripción',
    event_max_participants:'Límite de jugadores',
    event_startsAt:'Comienza',
    event_endsAt:'Termina',
    wrong_date_format:'Formato de fecha inválido',
    wrong_int_format:'Debe ser un número (sin decimales)',
    curr_event_participant:'Anotado en',
    curr_events_owned:'Actualmente organizando',
    past_events_participant:'Participó en',
    event_s:'evento(s).',
    favorite_sport:'Deporte favorito:',
    main_club:'Club principal:',
    vacancy:'Vacante',
    introAllEvents:'¿Quieres unirte a un evento?',
    introCreateEvent:'¿Quieres crear un evento?',
    create_club:'Crear un club',
    delete_event:'Eliminar evento',
    delete_pitch:'Eliminar cancha',
    delete_club:'Eliminar club',
    delete_tournament:'Eliminar torneo',
    all_clubs:'Clubes',
    view_club:'Ver club',
    administrator:'Administrador',
    clubs:'Clubes',
    pitches:'Canchas',
    pitch:'Cancha',
    hosted:'Organizó',
    create_pitch:'Crear una cancha',
    sport_not_in_list:'Por favor seleccione un deporte de la lista',
    choose_event:'Elige un evento',
    choosePitch:'Elige una cancha',
    view_pitch:'Ver cancha',
    pitch_location:'Ubicación:',
    pitch_club:'Club:',
    pitch_sport:'Deporte:',
    new_event_date:'Fecha',
    day_mon:'Lun',
    day_tue:'Mar',
    day_wed:'Mie',
    day_thu:'Jue',
    day_fri:'Vie',
    day_sat:'Sab',
    day_sun:'Dom',
    SOCCER:'Fútbol',
    TENNIS:'Tenis',
    BASKETBALL:'Baloncesto',
    HOCKEY:'Hockey',
    RUGBY:'Rugby',
    BOXING:'Boxeo',
    GOLF:'Golf',
    kick:'Echar',
    no_results:'Sin resultados',
    no_past_or_future_events:'Aún no has creado ningún evento.',
    event_full_error:'Este evento se encuentra completo.',
    already_joined_error:'Ya te has unido a este evento.',
    user_busy_error:'Ya te has anotado a otro evento en este horario.',
    invalid_date_format:'Formato de fecha inválido.',
    invalid_number_format:'Formato de número inválido.',
    ends_before_starts:'Horas inválidas.',
    event_in_past:'Debe introducir una fecha futura.',
    date_exceeded:'La fecha no debe excederse de siete días.',
    event_overlap:'La cancha ya está en uso en el horario solicitado.',
    hour_out_of_range:'Hora(s) fuera del rango permitido.',
    myParticipations:'Mi Historial',
    upcomingParticipations:'Próximos Partidos',
    history:'Historial',
    downvote:'-1',
    downvoted:'-1',
    upvote:'+1',
    upvoted:'+1',
    event_points:'Puntos:',
    user_vote_balance:'Karma:',
    home_default:'No tienes ningún evento esta semana.',
    here:'aquí.',
    click_oops:'Para volver haz click',
    unauthorized:'No Autorizado',
    not_found:'No Encontrado',
    oops:'Ups! Algo salió mal.',
    no_pitches:'No hay canchas disponibles.',
    new_club:'Nuevo Club',
    club_location:'Ubicación:',
    home_help:'¡Echa un vistazo a todos los eventos que tienes esta semana!',
    event_list_help:'Puedes unirte a cualquier evento existente seleccionando alguno de la siguiente lista:',
    my_events_help:'Puedes controlar desde aquí todos los eventos que has creado.',
    history_help:'Puedes buscar entre todos los partidos que has jugado anteriormente.',
    club_list_help:'Selecciona cualquier club de la siguiente lista para más información.',
    pitch_list_help:'Selecciona cualquier cancha de la siguiente lista para comenzar a crear tus propios eventos.',
    tournaments:'Torneos',
    choose_tournament:'Elige un Torneo',
    tournament_list_help:'Puedes unirte a cualquier torneo existente seleccionando alguno de la siguiente lista:',
    view_tournament:'Ver Torneo',
    teams:'Equipos',
    join_team:'Unirse a Equipo',
    team_size:'Tamaño de equipos',
    team_number:'Número de equipos',
    create_tournament:'Crear un torneo',
    event_completed_description:'Resultado del evento completado',
    event_detail:'Detalle del evento',
    score:'Puntos',
    comment_action:'Comentar',
    no_comments:'No hay comentarios todavía.',
    round:'Ronda',
    introduction:'es una plataforma multiusuario que te permite organizar y participar en eventos y torneos deportivos en la ciudad de Buenos Aires. No encuentras personas con las que jugar? Simplemente crea un evento de manera rápida para divertirte y hacer ejercicio!',
    end_date:'Fecha de inscripción límite',
    comment:'Comentario',
    invalid_team_amount:'Cantidad debe estar en el rango [4, 10].',
    uneven_team_amount:'Campo debe ser par.',
    invalid_team_size:'Tamaño debe estar en el rango [3, 11].',
    inscription_date_in_past:'Debe introducir una fecha futura.',
    inscription_date_exceeded:'Fecha no debe exceder un día antes del comienzo.',
    insufficient_pitches:'Cantidad de canchas insuficiente.',
    event_has_not_ended:'El evento no ha terminado.',
    tournament_already_started:'El torneo ya ha comenzado.',
    team_already_filled:'El equipo ya está lleno.',
    already_joined_tournament:'Ya te has unido a este torneo.',
    cancel_event:'Cancelar evento',
    tournamentEvents:'Eventos del torneo',
    new_tournament:'Nuevo torneo',
    cancel_tournament:'Cancelar torneo',
    registration_intro_title:'¿Listo para una experiencia inolvidable?',
    registration_intro_text:'Únete a otros que quieren lo mismo que tú... ¡HACER DEPORTES! Busca los deportes que te gusten, y encuentra eventos y torneos cercanos!',
    tournament:'Torneo',
    start:'Comienzo',
    end:'Fin',
    go_to_tournament:'Ir al torneo',
    tournament_description:'Aquí puedes ver el progreso del torneo y los proximos eventos del mismo.',
    tournament_description_one:'Este torneo cuenta con',
    tournament_description_two:' rondas, donde los partidos se jugarán a la misma hora y con una semana de diferencia. Comienza el',
    tournament_inscription:'¡Únete al equipo que quieras para participar del torneo!',
    create_account:'Crear cuenta',
    not_account:'¿No tienes una cuenta?',
    start_date:'Fecha comienzo',
    new_tournament_description:'La tabla muestra la cantidad de canchas de fútbol disponibles en el club para la semana actual.',
    event_creation_description:'¡Chequea los horarios disponibles para esta cancha durante esta semana para crear tus eventos!',
    upload_score:'Cargar puntaje',
    state:'Estado',
    team_1:'Equipo 1',
    team_2:'Equipo 2',
    team_3:'Equipo 3',
    team_4:'Equipo 4',
    team_5:'Equipo 5',
    team_6:'Equipo 6',
    team_7:'Equipo 7',
    team_8:'Equipo 8',
    team_9:'Equipo 9',
    team_10:'Equipo 10',
    inscription:'INSCRIPCIÓN',
    pending_approval:'APROBACIÓN PENDIENTE',
    started:'COMENZADO',
    go_to_home:'Ir al home',
    skip_login:'¿Quieres saltar esto por ahora?',
    current:'Actual',
    are_you_sure:'¿Está seguro de que desea eliminar?',
    delete_action:'Eliminar',
    cancel_action:'Cancelar',
    inscription_closed_error:'La inscripción ya ha cerrado',
    team_full_error:'No quedan vacantes en el equipo',
    event_started_error:'El evento ya ha comenzado',
    error_pitch_not_found:'Cancha no encontrada',
    error_event_not_found:'Evento no encontrado',
    error_user_not_found:'Usuario no encontrado',
    error_club_not_found:'Club no encontrado',
    error_tournament_not_found:'Torneo no encontrado',
    error_tournament_event_not_found:'Evento de torneo no encontrado',
    form_required:'Campo requerido.',
    name_pattern_error:'El campo sólo debe contener letras y/o números.',
    picture_processing_error:'Error procesando imagen',
    username_pattern_error:'Email de usuario inválido.',
    letter_name_pattern_error:'El campo sólo debe contener letras.',
    password_length_error:'La contraseña debe tener al menos 6 carácteres.',
    duplicate_username_error:'El nombre de usuario ya existe.',
    delete_message:'¿Estás seguro de querrer borrar esto?',
    delete_confirmation:'Confirmación de Eliminación',
    min_error:'El mínimo es {{min}}.',
    max_error:'El máximo es {{max}}.',
    zero_events:'Aún no hay eventos, pero, ¡tu puedes ser el primero en crear uno!'
};
});
