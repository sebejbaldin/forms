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
var list = $(':input').not('button');
var lang;
var inputLenght = 0;
var currentFocus = 0;

$(document).off('.data-api');

$(function () {
    //alert(navigator.language);
    if (navigator.language === "it")
        lang = it;
    else if (navigator.language === "en-US") {
        lang = enUS;
        //alert('Lingua inglese caricata');
    } else
        lang = enUS;
    loadLanguage();
})

/* 
    $('#residenceState').autocomplete({
        source: onlinecheckin.azurewebsites.net/istes/autocompleteall,
        source: onlinecheckin.azurewebsites.net/istes/autocompletecomuni,
        source: onlinecheckin.azurewebsites.net/istes/autocompletestati
    });
    http://onlinecheckin.azurewebsites.net/istes/autocompleteall?term=pro 
*/


autocomplete(residenceState, 'http://localhost:8080/istes/autocompletestati');
autocomplete(city, 'http://localhost:8080/istes/autocompletecomuni');

function atome(ref, data) {
    let elem = $('<div></div>');
    elem.attr('id', ref.attr('id') + "autocomplete-list");
    elem.attr('class', 'autocomplete-items');
    ref.parent().append(elem);
    for (let x = 0; x < getArrayLength(data); x++) {
        let item = $('<div></div>');
        item.append(`<strong>${data[x].substr(0, inputLenght)}</strong>${data[x].substr(inputLenght)}`);
        //item.append(data[x]);
        item.append(`<input type="hidden" value="${data[x]}">`);
        item.on('click', () => {
            ref.val(item.children('input').val());
            closeAllLists();
        })
        elem.append(item);
    }


}

residenceState.on('change', () => {
    if (residenceState.val().toUpperCase() !== 'ITALIA') {
        $('#toToggle').hide();
    } else {
        $('#toToggle').show();
    }
})

function autocomplete(inputRef, urlReq, charMin) {

    inputRef.on('input', () => {
        inputLenght = inputRef.val().length;
        if (inputLenght < 1) {
            closeAllLists();
            return; 
        }
        $.ajax({
                type: "GET",
                url: urlReq,
                data: {
                    term: inputRef.val()
                },
                async: true,
                dataType: 'json', //you may use jsonp for cross origin request
                crossDomain: true,
                success: function (data, status, xhr) {
                    //alert(data);
                }
            })
            .done(function (listRaw) {
                var list = JSON.parse(listRaw);
                closeAllLists();
                let elem = $('<div></div>');
                elem.attr('id', inputRef.attr('id') + "autocomplete-list");
                elem.attr('class', 'autocomplete-items');
                inputRef.parent().append(elem);
                for (let x = 0; x < getArrayLength(list); x++) {
                    let item = $('<div></div>');
                    item.append(`<strong>${list[x].substr(0, inputLenght)}</strong>${list[x].substr(inputLenght)}`);
                    //item.append(list[x]);
                    item.append(`<input type="hidden" value="${list[x]}">`);
                    item.on('click', () => {
                        inputRef.val(item.children('input').val());
                        closeAllLists();
                    })
                    elem.append(item);
                }
            })
            .fail(function () {
                atome(inputRef, ["AMALFI (SA)", "AMANDOLA (AP)", "AMANTEA (CS)", "AMARO (UD)", "AMARONI (CZ)", "AMASENO (FR)", "AMATO (CZ)", "AMATRICE (RI)", "AMBIVERE (BG)", "AMBLAR (TN)", "AMEGLIA (SP)", "AMELIA (TR)", "AMENDOLARA (CS)", "AMENO (NO)", "AMOROSI (BN)", "AMPEZZO (UD)"]);
            })
            .always(function () {

            });
    })

    inputRef.on("keydown", function (e) {
        let x = $("#" + inputRef.attr('id') + "autocomplete-list");
        if (x) x = x.children('div');
        else return;
        //alert(x.length);
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x.get(currentFocus).click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        $(x.get(x)).addClass('autocomplete-active');
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        x.removeClass('autocomplete-active');
        /* for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        } */
    }

    function closeAllLists(elmnt) {
        //close all autocomplete lists in the document,
        //except the one passed as an argument:
        let x = $(".autocomplete-items");
        if (elmnt == null && elmnt == undefined) {
            x.remove();
            currentFocus = 0;
        } /* else {
            for (var i = 0; i < getArrayLength(x); i++) {
                if (elmnt != x[i] && elmnt != residenceState) {
                    x[i].parent().remove(x[i]);
                }
            }
        } */
    }
    //execute a function when someone clicks in the document:
    $('*').on("click", function () {
        closeAllLists();
    });
}

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
    let isValid = true;
    list.each((i, obj) => {
        if ($(obj).val() === "") {
            isValid = false;
            $(obj).parent().addClass('has-error');
        } else {
            $(obj).parent().removeClass('has-error');
        }
    })
    if (!isValid) {
        event.preventDefault();
        list.on("change", (event) => {
            list.each((i, obj) => {
                if ($(obj).val() === "") {
                    $(obj).parent().addClass('has-error');
                } else {
                    $(obj).parent().removeClass('has-error');
                }
            })
        })
    }
});

$('#randB').click((event) => {
    let objList = []
    list.each((i, obj) => {
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

function getArrayLength(array) {
    let x = 0;
    while (array[x] != undefined && array[x] != null) {
        x++;
    }
    return x;
}