$(function () {
    var residenceState = $('#ResidenceState');
    var city = $('#ResidenceCity');
    var docState = $('#DocEmissState');
    var docCity = $('#DocEmissCity')
    var birthState = $('#BirthState');
    var birthCity = $('#BirthCity');
    var inList = $(':input').not('button');
    var lang;
    var layoutITA = {
        isITA_Residence: true,
        isITA_BirthPlace: true,
        isITA_Document: true
    };
    var onlyITA = {
        residence: null,
        birth: null,
        docCity: null
    };

    autocompleteWithAJAX(residenceState, 'http://localhost:8080/istes/autocompletestati');
    autocompleteWithAJAX(city, 'http://localhost:8080/istes/autocompletecomuni');
    autocompleteWithAJAX(docState, 'http://localhost:8080/istes/autocompletestati');
    autocompleteWithAJAX(docCity, 'http://localhost:8080/istes/autocompletecomuni');
    autocompleteWithAJAX(birthState, 'http://localhost:8080/istes/autocompletestati');
    autocompleteWithAJAX(birthCity, 'http://localhost:8080/istes/autocompletecomuni');

    if (isItalian()) {
        lang = it;
    } else if (isEnglish()) {
        lang = enUS;
        remBirthCity();
        remDocCity();
        remResFields();
    } else
        lang = enUS;

    loadLanguage();

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

    docState.on('input', () => {
        if (docState.val().length >= 3) {
            if (!firstCharMatch(docState.val(), 'ITALIA') && onlyITA.docCity === null) {
                remDocCity();
            } else if (firstCharMatch(docState.val(), 'ITALIA') && onlyITA.docCity !== null) {
                addDocCity();
            }
        }
    });

    function remDocCity() {
        let temp = $('#docThings > div');
        onlyITA.docCity = $(temp.get(3)).detach();
        $(temp.get(0)).attr('class', 'col-sm-4');
        $(temp.get(1)).attr('class', 'col-sm-4');
        $(temp.get(2)).attr('class', 'col-sm-4');
        layoutITA.isITA_Document = false;
        inList = $(':input').not('button');
    }

    function addDocCity() {
        let temp = $('#docThings > div');
        $(temp.get(0)).attr('class', 'col-sm-3');
        $(temp.get(1)).attr('class', 'col-sm-2');
        $(temp.get(2)).attr('class', 'col-sm-3');
        $('#docThings').append(onlyITA.docCity);
        loadLanguage();
        inList = $(':input').not('button');
        layoutITA.isITA_Document = true;
        onlyITA.docCity = null;
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

    function loadLanguage() {
        if (lang.language === 'it') {
            document.title = 'Modulo Dati Capofamiglia';
            $('#formTitle').text('Modulo Dati Capofamiglia');
        } else if (lang.language === 'en-US') {
            document.title = 'Householder Data Module';
            $('#formTitle').text('Householder Data Module');
        }
        $('#documentTypeL').text(lang.documentType.title);
        $('#DocumentType').empty();
        for (let x = 0; x < getArrayLength(lang.documentType.options); x++) {
            $('#DocumentType').append(`<option value="${lang.documentType.options[x].toUpperCase()}">${lang.documentType.options[x]}</option>`);
        };
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
        $('#documentNumberL').text(lang.documentNumber);
        $('#docEmissStateL').text(lang.docEmissState);
        $('#docEmissCityL').text(lang.docEmissCity);
    }

    $('#buttonSubmit').on('click', (event) => {

    });

    $('#randB').click((event) => {
        let objList = []
        inList
            .filter('[required]')
            .each((i, obj) => {
                //objList.push($(obj).attr('id'));
                objList.push($(obj).val());
            })
        alert(JSON.stringify(objList));
    });

    $('#en_USLang').click((event) => {
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
            if (docState.val() === '' && layoutITA.isITA_Document) {
                remDocCity();
                layoutITA.isITA_Document = false;
            }
            loadLanguage();
        }
    });

    $('#itLang').click((event) => {
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
            if (docState.val() === '' && !layoutITA.isITA_Document) {
                addDocCity();
                layoutITA.isITA_Document = true;
            }
            loadLanguage();
        }
    });
});