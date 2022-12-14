(function($) {
    var methods = {
        init: function(options) {
            methods.settings = $.extend({}, $.fn.flashNotification.defaults, options);

            setTimeout(
                function() {
                    $('.alert')
                        .show('slow')
                        .delay(methods.settings.hideDelay)
                        .hide('fast')
                    ;
                },
                500
            );

            methods.listenIncomingMessages();
        },

        /**
         * Listen to AJAX responses and display messages if they contain some
         */
        listenIncomingMessages: function() {
            $(document).ajaxComplete(function(event, xhr, settings) {
                var data = $.parseJSON(xhr.responseText);

                if (data.messages) {
                    var messages = data.messages;

                    var i;

                    if (messages.error) {
                        for (i = 0; i < messages.error.length; i++) {
                            methods.addError(messages.error[i]);
                        }
                    }

                    if (messages.success) {
                        for (i = 0; i < messages.success.length; i++) {
                            methods.addSuccess(messages.success[i]);
                        }
                    }

                    if (messages.info) {
                        for (i = 0; i < messages.info.length; i++) {
                            methods.addInfo(messages.info[i]);
                        }
                    }
                }
            });
        },

        addSuccess: function(message) {
            var flashMessageElt = methods.getBasicFlash(message, 'success').addClass('alert-success');

            methods.addToList(flashMessageElt);
            methods.display(flashMessageElt);
        },

        addError: function(message) {
            var flashMessageElt = methods.getBasicFlash(message, 'error').addClass('alert-error');

            methods.addToList(flashMessageElt);
            methods.display(flashMessageElt);
        },

        addInfo: function(message) {
            var flashMessageElt = methods.getBasicFlash(message, 'info').addClass('alert-info');

            methods.addToList(flashMessageElt);
            methods.display(flashMessageElt);
        },

        getBasicFlash: function(message, $type) {
            var $fontAwesome = null;
            var $cssClass = null;
            if($type === 'info') {
                $fontAwesome = $('<i></i>').addClass('fa fa-info-circle');
                $cssClass = ' alert-info';
            } else if($type === 'success') {
                $fontAwesome = $('<i></i>').addClass('fa fa-check');
                $cssClass = ' alert-success';
            } else if($type === 'error') {
                $fontAwesome = $('<i></i>').addClass('fa fa-exclamation-triangle');
                $cssClass = ' alert-error';
            }
            var flashMessageElt = $('<div></div>')
                    .hide()
                    .addClass('alert'+$cssClass)
                    .append($fontAwesome)
                    .append(message)
                ;

            return flashMessageElt;
        },

        getCloseButton: function() {
            var closeButtonElt = $('<button></button>')
                    .addClass('close')
                    .attr('data-dismiss', 'alert')
                    .html('&times')
                ;

            return closeButtonElt;
        },

        addToList: function(flashMessageElt) {
            flashMessageElt.appendTo($('#flash-messages'));
        },

        display: function(flashMessageElt) {
            setTimeout(
                function() {
                    flashMessageElt
                        .show('slow')
                        .delay(methods.settings.hideDelay)
                        .hide('fast', function() { $(this).remove(); } )
                    ;
                },
                500
            );
        }
    };

    $.fn.flashNotification = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.flashNotification');
        }
    };

    $.fn.showMessage = function ($type, $message) {
        if ($type === 'error') {
            methods.addError($message);
        } else if ($type === 'success') {
            methods.addSuccess($message);
        } else if ($type === 'info') {
            methods.addInfo($message);
        }
    }

    $.fn.flashNotification.defaults = {
        'hideDelay'         : 4500,
        'autoHide'          : true,
        'animate'           : true
    };
})(jQuery);
