$(function () {
    //alert(navigator.language);
    if (navigator.language === "it") 
        lang = it;
    else if (navigator.language === "en-US") 
        lang = enUS;
    else
        lang = enUS;
    loadLanguage();

    var inList = $(':input').not('button');
    var lang;

    function loadLanguage() {
        if (lang.language === "it") {
            document.title = "Modulo di Ricerca";
            $('#formTitle').text('Modulo di Ricerca');
        } else if (lang.language === "en-US") {
            document.title = "Search Module";
            $('#formTitle').text('Search Module');
        }
        $('#cod_preL').text(lang.prenotationCode);
        $('#surnameL').text(lang.surname);
        $('#nameL').text(lang.name);
        $('#structL').text(lang.struct);
        $('#prenotationL').text(lang.prenotationDate.title);
        $('#fromDateL').text(lang.prenotationDate.labels[0]);
        $('#toDateL').text(lang.prenotationDate.labels[1]);
    }
    
    
    $('#buttonSubmit').on("click", (event) => {
        if (!validateForm(inList)) {
            event.preventDefault();
        }
    });
    
    $('#en_USLang').click((event) => {
        if (lang.language !== "en-US") {
            lang = enUS;
            loadLanguage();
        }
    })
    
    $('#itLang').click((event) => {
        if (lang.language !== "it") {
            lang = it;
            loadLanguage();
        }
    })
})