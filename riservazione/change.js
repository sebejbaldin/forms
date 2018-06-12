$(function () {
    var inList = $(':input').not('button');
    var invitedL = $('#invitedL');
    var lockedL = $('#lockedL');
    var soll1L = $('#Soll1L');
    var soll2L = $('#Soll2L');
    var lang;

    //alert(navigator.language);
    if (navigator.language === "it")
        lang = resLang.italian;
    else if (navigator.language === "en-US") {
        lang = resLang.english;
        //alert('Lingua inglese caricata');
    } else
        lang = resLang.english;
    loadLanguage();


    function loadLanguage() {
        if (lang.language === "it") {
            document.title = "Modulo Riservazione";
            $('#formTitle').text('Modulo Riservazione');
        } else if (lang.language === "en-US") {
            document.title = "Riservation Module";
            $('#formTitle').text('Riservation Module');
        }
        $('#codeL').text(lang.code);
        $('#riferimentoL').text(lang.reference);
        $('#nominativoL').text(lang.nominative);
        $('#emailL').text(lang.email);
        $('#firstDayL').text(lang.startDate);
        $('#nDayL').text(lang.dayNum);
        $('#roomL').text(lang.room);
        $('#personNumL').text(lang.personNum);
        $('#langL').text(lang.lang);
        $('*').remove('.lab');
        invitedL.append('<p class="lab">' + lang.invite + '</p>');
        soll1L.append('<p class="lab">' + lang.sollOne + '</p>');
        soll2L.append('<p class="lab">' + lang.sollTwo + '</p>');
        lockedL.append('<p class="lab">' + lang.locked + '</p>');
    }

    $('#buttonSubmit').on("click", (event) => {
        if (!validateForm(inList)) {
            event.preventDefault();
        } else {

        }
    });

    $('#randB').click((event) => {
        let objList = []
        inList.each((i, obj) => {
            objList.push($(obj).val());
        })
        alert(JSON.stringify(objList));
    });

    $('#en_USLang').click((event) => {
        if (lang.language !== "en-US") {
            lang = resLang.english;
            loadLanguage();
        }
    });

    $('#itLang').click((event) => {
        if (lang.language !== "it") {
            lang = resLang.italian;
            loadLanguage();
        }
    });
})