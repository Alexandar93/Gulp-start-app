$(document).ready(function(a){function n(n,i){n.each(function(){var n=a(this),t=n.attr("data-os-animation"),o=n.attr("data-os-animation-delay"),d=n.attr("data-os-animation-duration");n.css({"-webkit-animation-delay":o,"-moz-animation-delay":o,"animation-delay":o,"-webkit-animation-duration":d,"-moz-animation-duration":d,"animation-duration":d});var m=i?i:n;m.waypoint(function(){n.addClass("animated").addClass(t)},{triggerOnce:!0,offset:"90%"})})}n(a(".os-animation")),n(a(".multi-animation"),a(".multi-animation-container"))});