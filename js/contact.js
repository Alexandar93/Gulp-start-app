$(function () {
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: !0,
        submitError: function ($form, event, errors) {},
        submitSuccess: function ($form, event) {
            $("#btnSubmit").attr("disabled", !0);
            event.preventDefault();
            var name = $("input#name").val();
            var email_address = $("input#email_address").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name;
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ')
            }
            $.ajax({
                url: "../mail/contact.php",
                type: "post",
                data: {
                    name: name,
                    phone: phone,
                    email_address: email_address,
                    message: message
                },
                cache: !1,
                success: function () {
                    $("#btnSubmit").attr("disabled", !1);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-success').append("<strong>" + firstName + ", Vaša poruka je poslata.</strong>");
                    $('#success > .alert-success').append('</div>');
                    $('#contactForm').trigger("reset")
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-danger').append("<strong>Izvini " + firstName + ", server trenutno ne reaguje. Molimo Vas pokušajte kasnije!");
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset")
                },
            })
        },
        filter: function () {
            return $(this).is(":visible")
        },
    });
    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show")
    })
});
$('#name').focus(function () {
    $('#success').html('')
})