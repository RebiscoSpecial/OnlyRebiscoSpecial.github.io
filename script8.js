(function(angular) {

    'use strict';

    var app = angular.module('app', ['timer']);

    app.controller('ctrl', function($scope, $element, $timeout){

        var maxNumber = 0, range = 0, correct = 0, wrong = 0, hit = 0, countHelp = 5;

        $scope.timerRunning  = false;
        $scope.showCurrentNumber = false;
        $scope.countHelp = countHelp;

        $scope.lvl = {
            name: 'normal'
        };

        $scope.info = {
            correct: 0,
            wrong: 0,
            hit: 0
        };

        $scope.messageText = {
            success     : 'Great',
            successHit  : 'Awesome',
            successHit2 : 'Unbelievable',
            successLow  : 'Good',
            error       : 'Ops, are you sure?'
        };

        $scope.play = function(level) {

            _optionsClass.removeEspecificClass('alternative', 'current');

            _showHide("presentation", "hide");
            _showHide("calc", "show");

            $scope.info.correct = 0;
            $scope.info.wrong   = 0;
            $scope.info.hit     = 0;
            correct             = 0;
            wrong               = 0;
            hit                 = 0;
            countHelp           = 5;

            $scope.timerRunning = true;
            $scope.$broadcast('timer-start');

            _difficulty(level);
            _chooseNumber();
        };

        var _showHide = function(id, action) {
            var a = action == "show" ? "block" : "none";
            document.querySelector("#" + id).style.display = a;
        };

        var _difficulty = function(level) {
            if(level == 'easy'){
                maxNumber = 5;
                range = 5;
            }else if(level == 'normal'){
                maxNumber = 10;
                range = 10;
            }else{
                maxNumber = 20;
                range = 30;
            }
        };

        var _chooseNumber = function() {

            var numberRandom1 = _randomNumber(0, maxNumber);
            var numberRandom2 = _randomNumber(0, maxNumber);

            if(numberRandom1 > numberRandom2){
                $scope.numberRandom1 = numberRandom1;
                $scope.numberRandom2 = numberRandom2;
            }else{
                $scope.numberRandom1 = numberRandom2;
                $scope.numberRandom2 = numberRandom1;
            }

            var arrayOperator = ['+','-','*'];
            var operator = arrayOperator[_randomNumber(0, arrayOperator.length)];
            $scope.operator = operator;

            var currentNumber = _applyCalc($scope.numberRandom1, $scope.numberRandom2, $scope.operator);
            $scope.currentNumber = currentNumber;

            var arrayAlternative = ['numberA','numberB','numberC','numberD'];
            var currentAlternative = arrayAlternative[_randomNumber(0, arrayAlternative.length)];
            _currentAlternative(currentAlternative, currentNumber);

        };

        var _currentAlternative = function(currentAlternative, currentNumber) {

            switch (currentAlternative) {
                case "numberA":
                $scope.numberA = $scope.currentNumber;
                $scope.numberB = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberC = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberD = _randomNumber(currentNumber - range, currentNumber + range);
                break;
                case "numberB":
                $scope.numberA = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberB = $scope.currentNumber;
                $scope.numberC = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberD = _randomNumber(currentNumber - range, currentNumber + range);
                break;
                case "numberC":
                $scope.numberA = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberB = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberC = $scope.currentNumber;
                $scope.numberD = _randomNumber(currentNumber - range, currentNumber + range);
                break;
                case "numberD":
                $scope.numberA = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberB = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberC = _randomNumber(currentNumber - range, currentNumber + range);
                $scope.numberD = $scope.currentNumber;
                break;
            }

        };

        var _applyCalc = function(a, b, c) {
            var result = 0;
            switch(c) {
                case '+':
                result = a + b;
                break;
                case '-':
                result = a - b;
                break;
                case '*':
                result = a * b;
                break;
            }
            return result;
        };

        var _randomNumber = function(min, max) {
            var number = (Math.floor(Math.random() * (max - min)) + min);
            return number > 0 ? number : 0;
        };

        var _timeOutComment = function(time) {
            var apppenComment = function(){
                $scope.message = "";
            }
            $timeout(apppenComment, time);
        };

        var _optionsClass = {
            removeEspecificClass : function(classNameGeneric, classNameToRemove){
                var classToRemove = document.getElementsByClassName(classNameGeneric);
                for (var i = 0; i < classToRemove.length; i++) {
                    classToRemove[i].classList.remove(classNameToRemove);
                }
            },
            addEspecificClass : function(classNameGeneric, classNameToAdd){
                var classToAdd = document.getElementsByClassName(classNameGeneric);
                for (var i = 0; i < classToAdd.length; i++) {
                    classToAdd[i].classList.add(classNameToAdd);
                }
            }
        }

        $scope.help = function(elem) {
            $scope.countHelp = countHelp - 1;
            if(countHelp > 1){
                $scope.showCurrentNumber = true;
                countHelp--;
            }else{
                $scope.showCurrentNumber = true;
                elem.currentTarget.setAttribute('disabled', true);
            }
        };

        $scope.chooseAlternative = function(alternative) {

            if(alternative == $scope.currentNumber){

                _optionsClass.removeEspecificClass('alternative', 'current');

                correct++;
                hit++;

                if($scope.showCurrentNumber == true){
                    $scope.message = $scope.messageText.successLow;
                }else{
                    if(hit < 5){
                        $scope.message = $scope.messageText.success;
                    }else if(hit > 4 && hit < 10){
                        $scope.message = $scope.messageText.successHit;
                    }else{
                        $scope.message = $scope.messageText.successHit2;
                    }
                }

                $scope.info.correct = correct;
                $scope.showCurrentNumber = false;

                _chooseNumber();

            }else{

                wrong++;
                hit = 0;

                $scope.message = $scope.messageText.error;
                $scope.info.wrong = wrong;

            }
            $scope.info.hit = hit;
            _timeOutComment(1000);
        };


        $scope.$on('timer-stopped', function (event, data){
            _showHide("info", "show");
            _showHide("presentation", "show");
            _showHide("calc", "hide");
        });

        _showHide("info", "hide");
        _showHide("calc", "hide");
        _chooseNumber();

    });

}(angular, window));