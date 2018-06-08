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
residenceState.on('input', () => {
    autocomplete(residenceState, 'http://onlinecheckin.azurewebsites.net/istes/autocompletestati');
})

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

    function closeAllLists(elmnt) {
        //close all autocomplete lists in the document,
        //except the one passed as an argument:
        let x = $(".autocomplete-items");
        if (elmnt == null && elmnt == undefined) {
            x.remove();
        } else {
            for (var i = 0; i < getArrayLength(x); i++) {
                if (elmnt != x[i] && elmnt != residenceState) {
                    x[i].parent().remove(x[i]);
                }
            }
        }
    }
    //execute a function when someone clicks in the document:
    $('*').on("click", function () {
        closeAllLists();
    });
}


function autocomplete(inputRef, url) {
    inputLenght = inputRef.val().length;
    if (inputLenght >= 2) {
        $.ajax(url + "?term=" + inputRef.val())
        .done(function (list) {
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
            atome(inputRef, ["AMALFI (SA)","AMANDOLA (AP)","AMANTEA (CS)","AMARO (UD)","AMARONI (CZ)","AMASENO (FR)","AMATO (CZ)","AMATRICE (RI)","AMBIVERE (BG)","AMBLAR (TN)","AMEGLIA (SP)","AMELIA (TR)","AMENDOLARA (CS)","AMENO (NO)","AMOROSI (BN)","AMPEZZO (UD)"]);
        })
        .always(function () {

        });
    }

    function closeAllLists(elmnt) {
        //close all autocomplete lists in the document,
        //except the one passed as an argument:
        let x = $(".autocomplete-items");
        if (elmnt == null && elmnt == undefined) {
            x.remove();
        } else {
            for (var i = 0; i < getArrayLength(x); i++) {
                if (elmnt != x[i] && elmnt != residenceState) {
                    x[i].parent().remove(x[i]);
                }
            }
        }
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