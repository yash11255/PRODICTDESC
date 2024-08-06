var HaruParticlesHandler = function HaruParticlesHandler($scope, $) {
    var $currentParticles = $scope.find('.haru-particles');

    var particles_id = $currentParticles.attr('data-id');
    var number_value = $currentParticles.attr('data-number-value');
    var number_density = $currentParticles.attr('data-number-density');
    var color_value = $currentParticles.attr('data-color-value');
    var shape_type = $currentParticles.attr('data-shape-type');
    var size_value = $currentParticles.attr('data-size-value');
    var size_random = $currentParticles.attr('data-size-random');
    var move_enable = $currentParticles.attr('data-move-enable');
    var move_speed = $currentParticles.attr('data-move-speed');
    var move_direction = $currentParticles.attr('data-move-direction');

    if (color_value == '') {
        return;
    }

    color_value = color_value.split(',');

    particlesJS(particles_id, {
        particles: {
            number: {
                value: number_value,
                density: number_density
            },
            color: {
                value: color_value
            },
            shape: {
                type: shape_type
                // stroke: {
                //   width: 0,
                //   color: "#000000",
                // },
                // polygon: {
                //   nb_sides: 5,
                // },
            },
            // opacity: {
            //   value: 0.5,
            //   random: false,
            //   anim: {
            //     enable: false,
            //     speed: 0.1,
            //     opacity_min: 0.1,
            //     sync: false,
            //   },
            // },
            size: {
                value: size_value,
                random: size_random,
                anim: {
                    enable: true,
                    speed: 1,
                    size_min: 35,
                    sync: false
                }
            },
            // line_linked: {
            //   enable: true,
            //   distance: 150,
            //   color: "#ffffff",
            //   opacity: 0.4,
            //   width: 1,
            // },
            move: {
                enable: move_enable,
                speed: move_speed,
                direction: move_direction,
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {},
        retina_detect: true,
        asBG: true
    });
};

// function() {
//   // let el = document.querySelector('#' + particles_id + ' .particles-js-canvas-el')
//   // el.setAttribute('height', '300px')
// }

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-particles.default', HaruParticlesHandler);
});

//# sourceURL=webpack:///./src/js/modules/particles.js?