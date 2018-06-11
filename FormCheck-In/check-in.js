var docT = $("#documentType");
var btn = $("#buttonSubmit");
var nome = $("#nOme");
var surname = $('#surname');
var gender = $('#gender');
var birthPlace = $('#birthPlace');
var birthDate = $('#birthDate');
var nationality = $('#nationality');
var residenceState = $('#residenceState');
var city = $('#city');
var address = $('#address');
var addressNum = $('#addressNumber');
var documentNum = $('#documentNumber');
var documentPlace = $('#documentEmissPlace');
var inList = $(':input').not('button');
var lang;
var onlyITA = null;

$(function () {
    //alert(navigator.language);
    if (navigator.language === "it") 
        lang = it;
    else if (navigator.language === "en-US") {
        lang = enUS;
        onlyITA = $('#toToggle').detach();
        inList = $(':input').not('button');
        //alert('Lingua inglese caricata');
    } else
        lang = enUS;
    loadLanguage();
})

autocompleteWithAJAX(residenceState, 'http://localhost:8080/istes/autocompletestati');
autocompleteWithAJAX(city, 'http://localhost:8080/istes/autocompletecomuni');

residenceState.on('change', () => {
    if (residenceState.val().toUpperCase() !== 'ITALIA') {
        if (!onlyITA) {
            onlyITA = $('#toToggle').detach();
            inList = $(':input').not('button');
        }
    } else {
        if(onlyITA) {
            $('#dependTo').after(onlyITA);
            inList = $(':input').not('button');
        }
        onlyITA = null;
    }
})

function loadLanguage() {
    if (lang.language === "it") {
        document.title = "Modulo Dati Nominativo";
        $('#formTitle').text('Modulo Dati Nominativo');
    } else if (lang.language === "en-US") {
        document.title = "Nominative Module";
        $('#formTitle').text('Nominative Module');
    }
    $("#documentTypeL").text(lang.documentType.title);
    $('#documentType').empty();
    for (let x = 0; x < getArrayLength(lang.documentType.options); x++) {
        $('#documentType').append(`<option value="${x}">${lang.documentType.options[x]}</option>`);
    };
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
    $('#residenceStateL').text(lang.countryOfResidence);
    $('#cityL').text(lang.cityOfResidence);
    $('#addressL').text(lang.homeAddress);
    $('#addressNumberL').text(lang.homeNumber);
    $('#documentNumberL').text(lang.documentNumber);
    $('#documentEmissPlaceL').text(lang.emissionPlace);
}

btn.on("click", (event) => {
    if (!validateForm(inList)) {
        event.preventDefault();
    }
});

$('#randB').click((event) => {
    let objList = []
    inList.each((i, obj) => {
        objList.push($(obj).val());
    })
    alert(JSON.stringify(objList));
})

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
