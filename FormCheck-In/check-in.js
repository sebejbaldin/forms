$(function () {
    var residenceState = $('#residenceState');
    var city = $('#city');
    var docState = $('#docEmissState');
    var docCity = $('#docEmissCity')
    var birthState = $('#birthState');
    var birthCity = $('#birthCity');
    var inList = $(':input').not('button');
    var lang;
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

    if (navigator.language === "it" || navigator.language === "it-IT")
        lang = it;
    else if (navigator.language === "en-US" || navigator.language === "en") {
        lang = enUS;
        let temp = $('#docThings > div');
        onlyITA.residence = $('#toToggle').detach();
        $($('#birthThings > div').get(2)).attr('class', 'col-sm-6');
        onlyITA.birth = $($('#birthThings > div').get(1)).detach();
        onlyITA.docCity = $(temp.get(3)).detach();
        $(temp.get(0)).attr('class', 'col-sm-4');
        $(temp.get(1)).attr('class', 'col-sm-4');
        $(temp.get(2)).attr('class', 'col-sm-4');    
        inList = $(':input').not('button');
    } else
        lang = enUS;
    loadLanguage();

    residenceState.on('keyup', () => {
        if (residenceState.val().toUpperCase() !== 'ITALIA') {
            if (!onlyITA.residence) {
                onlyITA.residence = $('#toToggle').detach();
                inList = $(':input').not('button');
            }
        } else {
            if (onlyITA.residence) {
                $('#dependTo').after(onlyITA.residence);
                loadLanguage();
                inList = $(':input').not('button');
            }
            onlyITA.residence = null;
        }
    });

    birthState.on('keyup', () => {
        let birthThings = $('#birthThings > div');
        if (birthState.val().toUpperCase() !== 'ITALIA') {
            if (!onlyITA.birth) {
                onlyITA.birth = $(birthThings.get(1)).detach();
                $(birthThings.get(2)).attr('class', 'col-sm-6');
                inList = $(':input').not('button');
            }
        } else {
            if (onlyITA.birth) {
                $(birthThings.get(1)).attr('class', 'col-sm-2');
                $(birthThings.get(0)).after(onlyITA.birth);
                loadLanguage();
                inList = $(':input').not('button');
            }
            onlyITA.birth = null;
        }
    });

    docState.on('keyup', () => {
        let temp = $('#docThings > div');
        if (docState.val().toUpperCase() !== 'ITALIA') {
            if (!onlyITA.docCity) {
                onlyITA.docCity = $(temp.get(3)).detach();
                $(temp.get(0)).attr('class', 'col-sm-4');
                $(temp.get(1)).attr('class', 'col-sm-4');
                $(temp.get(2)).attr('class', 'col-sm-4');
                inList = $(':input').not('button');
            }
        } else {
            if (onlyITA.docCity) {
                $(temp.get(0)).attr('class', 'col-sm-3');
                $(temp.get(1)).attr('class', 'col-sm-2');
                $(temp.get(2)).attr('class', 'col-sm-3');
                $('#docThings').append(onlyITA.docCity);
                loadLanguage();
                inList = $(':input').not('button');
                onlyITA.docCity = null;
            }
        }
    });

    function loadLanguage() {
        if (lang.language === "it") {
            document.title = "Modulo Dati Capofamiglia";
            $('#formTitle').text('Modulo Dati Capofamiglia');
        } else if (lang.language === "en-US") {
            document.title = "Householder Data Module";
            $('#formTitle').text('Householder Data Module');
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

    $('#buttonSubmit').on("click", (event) => {
        if (!isAllValid(inList)) {
            event.preventDefault();
        } else {
            
        }
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
        if (lang.language !== "en-US") {
            lang = enUS;
            loadLanguage();
        }
    });

    $('#itLang').click((event) => {
        if (lang.language !== "it") {
            lang = it;
            loadLanguage();
        }
    });
});