'use strict';

(function() {

    var laInputTemplate = '' +
        '<div class="la-input">' +
            '<label>' +
                '<input :required="required ? required : null" :max="max" :min="min" :class="{used : value}" type="text" :value="value" v-on:keyup="updateLength" @input="$emit(\'input\', $event.target.value)">' +
                '<span class="label">{{ label }}</span>' +
                '<div class="count">{{ textLength }}</div>' +
            '</label>' +
        '</div>';

    var laFotoTemplate = '' +
        '<div class="la-foto">' +
            '<input @change="handleUpload" type="file">' +
            '<div v-show="!value" @click="upload" class="upload"><span>+</span></div>' +
            '<img v-show="value" :src="value">' +
        '</div>';

    var laTextareaTemplate = '' +
            '<div class="la-textarea">' +
                '<label>' +
                    '<textarea @input="$emit(\'input\', $event.target.value)">{{ value }}</textarea>' +
                    '<div class="count">{{ textLength }}</div>' +
                '</label>' +
            '</div>';

    Vue.component('la-input', {
        template: laInputTemplate,
        data    : function() {
            return {
                textLength: ''
            }
        },
        methods : {
            updateLength : function() {
                if (this.min && this.max) {
                    if (this.value.length < this.min) {
                        this.textLength = 'Faltan ' + (this.min - this.value.length) + ' caracteres';
                    }
                    else if (this.value.length > this.max) {
                        this.textLength  = 'Sobran ' + (this.value.length - this.max) + ' caracteres';
                    }
                    else {
                        this.textLength = 'Quedan ' + (this.max - this.value.length) + ' caracteres';
                    }
                }
            }
        },
        props   : ['label', 'value', 'max', 'min', 'required']
    });

    Vue.component('la-foto', {
        template : laFotoTemplate,
        data     : function() {
            return {}
        },
        methods  : {
            upload : function() {
                this.$el.querySelector('input[type="file"]').click();
            },
            handleUpload : function(event) {
                var file  = event.target.files[0];
                var image = this.$el.querySelector('img');
                var self  = this;

                if (file && file.type.match('image.*')) {
                    var reader = new FileReader();

                    reader.onloadend = function() {
                        self.value = reader.result;

                        if (image.width < 1440 || image.height < 2160) {
                            alert('Las fotos deben tener una resolución mínima de 1440x2160');
                        }

                        self.$emit('input', self.value);
                    };

                    reader.readAsDataURL(file);
                }
            },
            remove : function() {}
        },
        props    : ['value']
    });

    Vue.component('la-textarea', {
        template: laTextareaTemplate,
        props   : ['value', 'max', 'min', 'required'],
        data    : function() {
            return {
                textLength: ''
            }
        }
    });


    var laIncludesTemplate = '' +
            '<div class="la-includes">' +
                '<span @click="deleteInclude">Eliminar</span>' +
                '<select></select>' +
                '<la-input label="Nombre del elemento" v-model="value.name">' +
            '</div>';

    Vue.component('la-includes', {
        template: laIncludesTemplate,
        props   : ['value'],
        methods : {
            deleteInclude : function() {
                this.$emit('delete');
            }
        }
    });
})();
