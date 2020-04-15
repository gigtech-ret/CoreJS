(function () {
    try {
        this.supportActiveX = ("ActiveXObject" in window);

        if (window.ActiveXObject || this.supportActiveX) {
            nameCtrl = new ActiveXObject("Name.NameCtrl");

        } else {
            nameCtrl = CreateNPApiOnWindowsPlugin("application/x-sharepoint-uc");
        }
        attachLyncPresenceChangeEvent();
    }
    catch (ex) { }
})();


(function () {
    "use strict";
    var modulename = "CoreJs";

    var appdependencies = [
        // 'ngRoute', 
         'angularUtils.directives.dirPagination',
        // 'ngAnimate', 
         '720kb.datepicker',
         'ngFileUpload',
         //'angular-sanitize',
         'textAngular',
         'ngSanitize',
         'LocalStorageModule',
         'ui.tree',
        'dndLists',
        'mgcrea.ngStrap',
        'base64'
    ]
    angular
        .module(modulename, appdependencies)
        .factory('DataAccess', DataAccess)
        .service('alertService', alertService)
        .service('responseValidator', ResponseValidator);

    DataAccess.$inject = ['$http'];
    ResponseValidator.$inject = ['alertService'];

    function alertService() {

        this.alertConfirm = alertConfirm;
        this.alertSuccess = alertSuccess;
        this.alert = alert;
        this.alertWarning = alertWarning;
        this.alertDanger = alertDanger;
        this.alertSuccessHide = alertSuccessHide;
        this.alertConfirmWithOptions = alertConfirmWithOptions;
        this.alertCustomConfirm = alertCustomConfirm;
        this.alertDangerHide = alertDangerHide;
        this.alertCustomNoApprover = alertCustomNoApprover;
        /*
        Types: 
            BootstrapDialog.TYPE_DEFAULT or 'type-default' 
            BootstrapDialog.TYPE_INFO or 'type-info' 
            BootstrapDialog.TYPE_PRIMARY or 'type-primary' (default) 
            BootstrapDialog.TYPE_SUCCESS or 'type-success' 
            BootstrapDialog.TYPE_WARNING or 'type-warning' 
            BootstrapDialog.TYPE_DANGER or 'type-danger'

           ref: https://nakupanda.github.io/bootstrap3-dialog/
        */
        function alertConfirm(_title, _message, _callbackConfirm, _callbackCancel, _btnLabelContinue, _btnLabelClose) {
            BootstrapDialog.show({
                title: _title,
                message: _message,
                type: BootstrapDialog.TYPE_INFO,
                closable: false,
                buttons: [ {
                    label: (_btnLabelContinue)?_btnLabelContinue: 'Continue',
                    cssClass: 'btn-primary',
                    action: function (dialogItself) {
                        _callbackConfirm();
                        dialogItself.close();
                    }
                }, {
                    label: (_btnLabelClose) ? _btnLabelClose : 'Close',
                    action: function (dialogItself) {
                        _callbackCancel();
                        dialogItself.close();
                    }
                }]
            });
        }

        function alertConfirmWithOptions(_title, _message, _callbackConfirm, _callbackCancel, _btnLabelContinue, _btnLabelClose, _type, _btnClass) {
            BootstrapDialog.show({
                title: _title,
                message: _message,
                type: _type,
                closable: false,
                buttons: [{
                    label: (_btnLabelContinue) ? _btnLabelContinue : 'Continue',
                    cssClass: _btnClass,
                    action: function (dialogItself) {
                        _callbackConfirm();
                        dialogItself.close();
                    }
                }, {
                    label: (_btnLabelClose) ? _btnLabelClose : 'Close',
                    action: function (dialogItself) {
                        _callbackCancel();
                        dialogItself.close();
                    }
                }]
            });
        }

        function alertCustomConfirm(_htmlIcon, _htmlMessage, _confirmButton, _closeButton, _confirmFunction) {
            var message =
                       "<div>" +
                           "<div class='col-md-2'>" +
                              _htmlIcon +
                           "</div>" +
                           "<div class='col-md-10'>" +
                               _htmlMessage +
                           "</div>" +
                       "</div>";

            var dialog = new BootstrapDialog({
                message: function (dialogRef) {
                    var $message = $(message);

                    var $cButton = $('<button class="btn btn-danger"><i class="fa fa-check" aria-hidden="true"></i> ' + _confirmButton + '</button>');
                    $cButton.on('click', { dialogRef: dialogRef }, function (event) {
                        event.data.dialogRef.close();
                        _confirmFunction();
                       
                    });

                    var $button = $('<button class="btn btn-default"><i class="fa fa-times" aria-hidden="true"></i> ' + _closeButton + '</button>');
                    $button.on('click', { dialogRef: dialogRef }, function (event) {
                        event.data.dialogRef.close();
                    });

                    var gButton = $("<div class='btn-group' style='padding-left: 7%;'>");
                    gButton.append($cButton);
                    gButton.append($button);

                    $message.append(gButton);
                    return $message;
                },
                closable: false

            });
            dialog.realize();
            dialog.getModalHeader().hide();
            dialog.getModalFooter().hide();
            dialog.setSize(BootstrapDialog.SIZE_WIDE);
            dialog.getModalBody().css('background-color', '#fff');
            dialog.getModalBody().css('color', '#000');
            dialog.getModalBody().css('border', '2px solid #B20024');
            dialog.getModalBody().css('border-radius', '5px');
            dialog.open();
        }

        function alertSuccess(_title, _message) {
            BootstrapDialog.show({
                title: _title,
                message: _message,
                type: BootstrapDialog.TYPE_SUCCESS,
            });
        }

        function alert(_message, _title) {
            BootstrapDialog.show({
                title: (_title) ? _title : 'Information',
                message: _message,
                type: BootstrapDialog.TYPE_INFO,
            });
        }

        function alertWarning(_title, _message) {
            BootstrapDialog.show({
                title: (_title) ? _title : 'Warning',
                message: _message,
                type: BootstrapDialog.TYPE_WARNING,
            });
        }

        function alertDanger(_title, _message) {
            BootstrapDialog.show({
                title: (_title) ? _title : 'Warning',
                message: _message,
                type: BootstrapDialog.TYPE_DANGER,
            });
        }

        function alertDangerHide(_title, _message, _callbackfunctionOnHide) {
                BootstrapDialog.show({
                        title: _title,
                        message: _message,
                        cssClass: 'modalindex',
                        type: BootstrapDialog.TYPE_DANGER,
                        onhide: _callbackfunctionOnHide
            });
        }

        function alertSuccessHide(_title, _message, _callbackfunctionOnHide) {
            BootstrapDialog.show({
                title: _title,
                message: _message,
                cssClass: 'modalindex',
                type: BootstrapDialog.TYPE_SUCCESS,
                onhide: _callbackfunctionOnHide
            });
        }

        function alertCustomNoApprover(_message, _title) {
            //var dialog = new BootstrapDialog.show({
            //    title: (_title) ? _title : 'Information',
            //    message: _message,
            //    type: BootstrapDialog.TYPE_INFO,
            //});

            var dialog = new BootstrapDialog({
                title: (_title) ? _title : 'No Approver',
                message: _message,
                type: BootstrapDialog.TYPE_INFO
            });

            dialog.realize();
            dialog.getModalHeader().css('background-color', '#FF372F');
            dialog.open();
        }

    }

    function DataAccess($http) {
        var DataAccess = {};
        DataAccess.Get = Get;
        DataAccess.GetWithParam = GetWithParam;
        DataAccess.Post = Post;
        DataAccess.GetCache = GetCache;

        function Get(_url) {
            return $http.get(_url, { cache: false })
                .then(function (result) {
                    return result.data;
                }, function (error) {
                    console.log(error);
                });
        };

        function GetCache(_url) {
            return $http.get(_url, { cache: true })
                .then(function (result) {
                    return result.data;
                }, function (error) {
                    console.log(error);
                });
        };

        function GetWithParam(_url, _param) {
            return $http({
                url: _url,
                method: "GET",
                params: _param,
                cache: false
            })
                .then(function (result) {
                    return result.data;
                }, function (error) {
                    console.log(error);
                });
        }

        function Post(_url, _param) {
            return $http.post(_url, _param, { cache: false })
                .then(function (result) {
                    return result.data;
                }, function (error) {
                    console.log(error);
                });
        }

        return DataAccess;
    }

    function ResponseValidator(alertService) {
        this.ValidateResponse = ValidateResponse;
        this.ResetValidation = ResetValidation;
        this.RemoveValidation = RemoveValidation;
        this.ShowErrors = ShowErrors;

        function ValidateResponse(_actionresult, _placeholder) {
            if (_actionresult.ActionStatus === 'Success') {
                ShowMessages(_actionresult);
            } else {
                ShowValidation(_actionresult, _placeholder);
            }

            return _actionresult.DataResult;
        }

        function ShowMessages(_actionresult) {
            angular.forEach(_actionresult.Messages, function (item) {
                alertService.alertSuccess('Success', item);
            });
        }

        function ShowValidation(_actionresult, _placeholder) {
            if (_actionresult.hasOwnProperty("ErrorMessages")) {
                if (_actionresult.ErrorMessages.length > 0) {
                    ResetValidation(_placeholder);
                    if (_placeholder) {
                        var placeholderid = $("#" + _placeholder);
                        placeholderid.append("<div id='validationcontainer' class='validation-summary-errors'><h6>Please fix the following errors:</h6></div>");
                        placeholderid.find('#validationcontainer').append(ShowErrors(_actionresult));
                    }
                    else {
                        $("#errorContainer").append("<div id='validationcontainer' class='validation-summary-errors'><h6>Please fix the following errors:</h6></div>");
                        $("#errorContainer").find('#validationcontainer').append(ShowErrors(_actionresult));
                    }
                    return;
                }
            }
        }

        function ResetValidation(_placeholder) {
            if (_placeholder) {
                $("#" + _placeholder).empty();
            }
            else {
                $("#errorContainer").empty();
            }
            $(".validation-highlight-controls").removeClass("validation-highlight-controls");
        }

        function RemoveValidation(_ctrl) {
            $(_ctrl).on('change', function () {
                $(_ctrl).removeClass('validation-highlight-controls');
            })
        }

        function ShowErrors(_actionresult) {
            var msg = "";
            var m = "<ul>";
            $.each(_actionresult.ErrorMessages, function (index) {
                if (msg !== _actionresult.ErrorMessages[index].Message) {
                    m += '<li>' + _actionresult.ErrorMessages[index].Message + '</li>';
                    msg = _actionresult.ErrorMessages[index].Message;
                }
                $.each(_actionresult.ErrorMessages[index].FieldNames, function (indexInner) {
                    var fieldName = _actionresult.ErrorMessages[index].FieldNames[indexInner];
                    if (fieldName) {
                        fieldName = fieldName.replace('[', '').replace(']', '').replace('.', '');
                        var $ctrl = '#' + fieldName;
                        $($ctrl).addClass('validation-highlight-controls');
                        RemoveValidation($ctrl);
                    }
                });
            });
            m += '</ul>';
            return m;
        }
    }
})();

