$(function () {
    var inList = $(':input').not('button');
    var lang;
    //alert(navigator.language);
    if (navigator.language === "it")
        lang = it;
    else if (navigator.language === "en-US")
        lang = enUS;
    else
        lang = enUS;
    loadLanguage();

    function loadLanguage() {
        if (lang.language === "it") {
            document.title = "Modulo Dati Altri";
            $('#formTitle').text('Modulo Dati Altri');
        } else if (lang.language === "en-US") {
            document.title = "Other Data Module";
            $('#formTitle').text('Other Data Module');
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
        $('#residenceStateL').text(lang.countryOfResidence);
        $('#addressL').text(lang.homeAddress);
        $('#addressNumberL').text(lang.homeNumber);
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