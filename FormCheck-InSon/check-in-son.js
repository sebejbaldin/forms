var inList = $(':input').not('button');
var lang;

$(function () {
    //alert(navigator.language);
    if (navigator.language === "it") 
        lang = it;
    else if (navigator.language === "en-US") 
        lang = enUS;
    else
        lang = enUS;
    loadLanguage();
})

function loadLanguage() {
    if (lang.language === "it") {
        document.title = "Modulo Dati Nominativo";
        $('#formTitle').text('Modulo Dati Nominativo');
    } else if (lang.language === "en-US") {
        document.title = "Nominative Module";
        $('#formTitle').text('Nominative Module');
    }
    $("#nomeL").text(lang.name);
    $('#surnameL').text(lang.surname);
    $('#genderL').text(lang.gender.title);
    $('#gender').empty();
    for (let x = 0; x < getArrayLength(lang.gender.options); x++) {
        $('#gender').append(`<option value="${x}">${lang.gender.options[x]}</option>`);
    };
    $('#birthPlaceL').text(lang.birthPlace);
    $('#birthDateL').text(lang.birthDate);
    $('#citizenshipL').text(lang.citizenship);
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