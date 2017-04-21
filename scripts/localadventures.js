'use strict';

(function() {
    var adventure = {
        city            : 'Guadalajara',

        // Información esencial
        language        : '',                 // [string:2] language code
        langNotification: false,
        category1       : 0,                  // [integer]  category id
        category2       : 0,                  // [integer]  category id
        solidary        : false,              // [boolean]
        solidaryConfirm : false,              // [boolean]

        // Página de la experiencia
        title      : '',                      // [string]
        time       : {
            start: '',                    // [timestamp]
            end  : ''                     // [timestamp]
        },
        description: '',                      // {string]
        pictures   : ['', '', ''],            // [objects?]
        details    : '',                      // [string]
        where      : '',                      // [string]
        ubication  : {
            name: '',
            country: '',
            address: '',
            addresExtra: '',
            city: '',
            state: '',
            cp: '',
            geo: '',
            directions: ''
        },
        includes   : [
            {
                type: '',
                name: '',
                extra: ''
            }
        ],
        notes      : '',

        // Últimos retoques
        aboutyou   : '',
        conditions : {
            alcohol: false,
            certification: false,
            certificationDetail: '',
            conditions: false,
            conditionsDetail: '',
            anyone: true
        },
        size: 0,
        price: 0,
        daysToReserve: 0,
        lastTimeGuests: false,
        lastTimeGuestsHours: 0,
        additionalInfo: '',
        whatToBring: [],

        // Evaluar y enviar
        standardsComply: false,
        localLegislation: false,
        LocalAdventuresTerms: false
    };

    var app = new Vue({
        el     : '#localadventure',
        data : {
            adventure : adventure,
            languages : [{value: 'es', label: 'Español'}, {value: 'en', label: 'Inglés'}],
            categories: [
                {value: '1',  label: 'Arte y diseño'},
                {value: '2',  label: 'Moda'},
                {value: '3',  label: 'Espectáculos'},
                {value: '4',  label: 'Deportes'},
                {value: '5',  label: 'Bienestar'},
                {value: '6',  label: 'Naturaleza'},
                {value: '7',  label: 'Comida y bebida'},
                {value: '8',  label: 'Estilo de vida'},
                {value: '9',  label: 'Historia'},
                {value: '10', label: 'Música'},
                {value: '11', label: 'Negocios'},
                {value: '12', label: 'Vida nocturna'}
            ],
            switches  : {
                secondaryCategory: false
            }
        },
        methods : {
            enableSecondaryCategory : function() {
                this.switches.secondaryCategory = true;
            },
            disableSecondaryCategory : function() {
                this.switches.secondaryCategory = false;
                this.adventure.category2 = 0;
            },
            addInclude : function() {
                this.adventure.includes.push({
                    type : '',
                    name : '',
                    extra: ''
                });
            },
            deleteInclude: function(includ) {
                var includeIndex = this.adventure.includes.indexOf(includ);

                if (includeIndex > -1) {
                    this.adventure.includes.splice(includeIndex, 1);
                }
            }
        }
    });

    // Resize the sections to match main
    var setSectionSize = function() {
        var height  = document.querySelector('#localadventure > main').offsetHeight;

        document.querySelectorAll('#localadventure > main section').forEach(function(element){
            element.style.height = height + 'px';
        });
    };

    document.addEventListener('DOMContentLoaded', setSectionSize);
    window.addEventListener('resize', setSectionSize);
})();
