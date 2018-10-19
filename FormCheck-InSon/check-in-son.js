$(function () {
    var inList = $(':input').not('button');
    var residenceState = $('#ResidenceState');
    var birthState = $('#BirthState');
    var birthCity = $('#BirthCity');
    var city = $('#ResidenceCity');
    var lang;
    var layoutITA = {
        isITA_Residence: true,
        isITA_BirthPlace: true
    };
    var onlyITA = {
        residence: null,
        birth: null
    };

    autocompleteWithAJAX(residenceState, 'http://localhost:8080/istes/autocompletestati');
    autocompleteWithAJAX(birthState, 'http://localhost:8080/istes/autocompletestati');
    autocompleteWithAJAX(city, 'http://localhost:8080/istes/autocompletecomuni');
    autocompleteWithAJAX(birthCity, 'http://localhost:8080/istes/autocompletecomuni');

    
    if (isItalian())
        lang = it;
    else if (isEnglish()) {
        lang = enUS;
        remBirthCity();
        remResFields();
    } else
        lang = enUS;

    loadLanguage();

    function loadLanguage() {
        if (lang.language === 'it') {
            document.title = 'Modulo Dati Accompagnatore';
            $('#formTitle').text('Modulo Dati Accompagnatore');
        } else if (lang.language === 'en-US') {
            document.title = 'Other Data Module';
            $('#formTitle').text('Other Data Module');
        }
        $("#nomeL").text(lang.name);
        $('#surnameL').text(lang.surname);
        $('#genderL').text(lang.gender.title);
        $('#Gender').empty();
        for (let x = 0; x < getArrayLength(lang.gender.options); x++) {
            $('#Gender').append(`<option value="${lang.gender.options[x].toUpperCase()}">${lang.gender.options[x]}</option>`);
        };
        $('#birthStateL').text(lang.birthState);
        $('#birthCityL').text(lang.birthCity);
        $('#birthDateL').text(lang.birthDate);
        $('#citizenshipL').text(lang.citizenship);
        $('#residenceStateL').text(lang.countryOfResidence);
        $('#cityL').text(lang.cityOfResidence);
        $('#addressL').text(lang.homeAddress);
        $('#addressNumberL').text(lang.homeNumber);
    }

    residenceState.on('input', () => {
        if (residenceState.val().length >= 3) {
            if (!firstCharMatch(residenceState.val(), 'ITALIA') && onlyITA.residence === null) {
                remResFields();
            } else if (firstCharMatch(residenceState.val(), 'ITALIA') && onlyITA.residence !== null) {
                addResFields();
            }
        }
    });

    function remResFields() {
        onlyITA.residence = $('#toToggle').detach();
        layoutITA.isITA_Residence = false;
        inList = $(':input').not('button');
    }

    function addResFields() {
        $('#dependTo').after(onlyITA.residence);
        loadLanguage();
        inList = $(':input').not('button');
        layoutITA.isITA_Residence = true;
        onlyITA.residence = null;
    }

    birthState.on('input', () => {
        if (birthState.val().length >= 3) {
            if (!firstCharMatch(birthState.val(), 'ITALIA') && onlyITA.birth === null) {
                remBirthCity();
            } else if (firstCharMatch(birthState.val(), 'ITALIA') && onlyITA.birth !== null) {
                addBirthCity();
            }
        }
    });

    function remBirthCity() {
        let temp = $('#birthThings > div');
        onlyITA.birth = $(temp.get(1)).detach();
        $(temp.get(2)).attr('class', 'col-sm-6');
        layoutITA.isITA_BirthPlace = false;
        inList = $(':input').not('button');
    }

    function addBirthCity() {
        let temp = $('#birthThings > div');
        $(temp.get(1)).attr('class', 'col-sm-2');
        $(temp.get(0)).after(onlyITA.birth);
        loadLanguage();
        inList = $(':input').not('button');
        layoutITA.isITA_BirthPlace = true;
        onlyITA.birth = null;
    }

    $('#buttonSubmit').on("click", (event) => {
        
    });

    $('#en_USLang').click(() => {
        if (lang.language !== 'en-US') {
            lang = enUS;
            if (residenceState.val() === '' && layoutITA.isITA_Residence) {
                remResFields();
                layoutITA.isITA_Residence = false;
            }
            if (birthState.val() === '' && layoutITA.isITA_BirthPlace) {
                remBirthCity();
                layoutITA.isITA_BirthPlace = false;
            }
            loadLanguage();
        }
    });

    $('#itLang').click(() => {
        if (lang.language !== 'it') {
            lang = it;
            if (residenceState.val() === '' && !layoutITA.isITA_Residence) {
                addResFields();
                layoutITA.isITA_Residence = true;
            }
            if (birthState.val() === '' && !layoutITA.isITA_BirthPlace) {
                addBirthCity();
                layoutITA.isITA_BirthPlace = true;
            }
            loadLanguage();
        }
    });
});