var HaruTeamMemberHandler = function HaruTeamMemberHandler($scope, $) {
    var $currentTeamMember = $scope.find('.haru-team-member');

    if ($($currentTeamMember).find('.haru-slick').length > 0) {
        $currentTeamMember.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-team-member.default', HaruTeamMemberHandler);
});

//# sourceURL=webpack:///./src/js/modules/team-member.js?