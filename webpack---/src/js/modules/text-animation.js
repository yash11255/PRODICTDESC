var HaruTextAnimationHandler = function HaruTextAnimationHandler($scope, $) {
    var $currentTextAnimation = $scope.find('.haru-text-animation');

    if ($($currentTextAnimation).length > 0) {
        var TxtType = function TxtType(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function() {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span class="haru-text-animation__typewrap">' + this.txt + '</span>';

            var that = this;
            var delta = 200 - Math.random() * 100;

            if (this.isDeleting) {
                delta /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function() {
                that.tick();
            }, delta);
        };

        $(document).ready(function() {
            var elements = document.getElementsByClassName('haru-text-animation__typewrite');

            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                // console.log(toRotate)
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }
            // INJECT CSS
            var css = document.createElement('style');
            css.type = 'text/css';
            css.innerHTML = '.haru-text-animation__typewrite > .haru-text-animation__typewrap { }';
            document.body.appendChild(css);
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-text-animation.default', HaruTextAnimationHandler);
});

//# sourceURL=webpack:///./src/js/modules/text-animation.js?