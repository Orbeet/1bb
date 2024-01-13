const swiper = new Swiper('.reviews .swiper', {
    loop: true,
    slidesPerView: 1,
    pagination: {
        el: '.reviews-slider-pagination',
        clickable: true,
    },
    spaceBetween: 20,
    navigation: {
        nextEl: '.reviews-slider__next',
        prevEl: '.reviews-slider__prev',
    },
});

const swiper2 = new Swiper('.benefits-slider .swiper', {
    loop: false,
    slidesPerView: 1,
    pagination: {
        el: '.benefits-slider-pagination',
        clickable: true,
    },
    spaceBetween: 20,
    navigation: {
        nextEl: '.benefits-slider__next',
        prevEl: '.benefits-slider__prev',
    },
    breakpoints: {
        501: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
        1180: {
            slidesPerView: 4
        },
    }
});

closeButtons = document.querySelectorAll('.modal-window-close');
if (window.localStorage) {
    if (!localStorage.getItem("userAgreed")) {
        document.querySelector(".modal").classList.add('active')
    } else {
        document.querySelector(".modal").classList.remove('active')
    }
}
closeButtons.forEach(function(item){

    item.addEventListener('click', function(e) {
        var parentModal = this.closest('.modal');
        parentModal.classList.remove('active');
        localStorage.setItem("userAgreed", true);
    });
});

var accItem = document.getElementsByClassName('faq-accordion-item');
var accHD = document.getElementsByClassName('faq-accordion-btn');
for (var i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem() {
    var item = this.parentNode;

    if (item.classList.contains('open')) {
        this.classList.remove('active');
        item.classList.remove('open');
    } else {
        for (i = 0; i < accItem.length; i++) {
            accItem[i].classList.remove('open');
            accHD[i].classList.remove('active');
            item.classList.add('open');
            this.classList.add('active')
        }
    }
}

var sidebarMenu = document.querySelectorAll('.sidebar-title');
var sidebarAnchorMenu = document.querySelectorAll('.page-with-sidebar-heading');

function mobSidebar(button){
    if (window.innerWidth < 501) {
        button.forEach(function(item){
            item.addEventListener('click', function (){
                this.classList.toggle('active');
            })
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(function (){
        document.querySelector('.site-main').classList.add('animated')
    }, 0)

    mobSidebar(sidebarMenu);
    mobSidebar(sidebarAnchorMenu);

    window.addEventListener('resize orientationchange',function (){
        mobSidebar(sidebarMenu);
        mobSidebar(sidebarAnchorMenu);
    });
});

jQuery(document).ready(function($){

    const sortLinks = $('.sidebar-list-item-link[data-sort]');

    sortLinks.on('click', function (event) {
        event.preventDefault();

        const sortValue = $(this).data('sort');

        // Оновлення URL з параметром сортування
        const newUrl = updateQueryStringParameter(window.location.href, 'sort', sortValue);
        history.pushState(null, null, newUrl);

        // Оновлення блоку з постами через AJAX
        $.get(newUrl, function (data) {
            const blogItems = $(data).find('.blog-items');
            $('.blog-items').html(blogItems.html());

            // Оновлення пагінації
            const pagination = $(data).find('.pagination');
            $('.pagination').html(pagination.html());

            // Додаткова логіка для виділення активного посилання або виконання інших дій
            sortLinks.removeClass('active');
            $(this).addClass('active');
        });
    });

    // Функція для оновлення параметрів у URL
    function updateQueryStringParameter(uri, key, value) {
        const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        const separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    }

    var searchInput = $('#searchInput');
    var searchResults = $('#searchResults');

    searchInput.on('input', function () {
        var searchTerm = searchInput.val();
        if (searchTerm.length >= 2) {
            // Відправте AJAX-запит
            $.ajax({
                type: 'POST',
                url: ajax_object.ajax_url, // Це глобальна змінна WordPress, яка містить URL для обробки AJAX-запитів
                data: {
                    action: 'search_blog_posts',
                    search_term: searchTerm,
                },
                success: function (response) {
                    // Оновлення випадаючого списку з результатами пошуку
                    searchResults.html(response).show();
                },
            });
        } else {
            // Сховати випадаючий список, якщо текст не введено або введено менше 2 символів
            searchResults.hide();
        }
    });

    // Сховати випадаючий список при кліку за межі нього
    $(document).on('click', function (e) {
        if (!searchResults.is(e.target) && searchResults.has(e.target).length === 0) {
            searchResults.hide();
        }
    });

    // Заповнення поля пошуку при виборі результату з випадаючого списку
    searchResults.on('click', 'li', function () {
        var selectedPostTitle = $(this).text();
        searchInput.val(selectedPostTitle);
        searchResults.hide();
    });




    $('.page-with-sidebar-nav-item-link').on('click', function(e){
        e.preventDefault();

        var targetId = $(this).attr('href');
        var offset = $(targetId).offset().top - 160;

        $('html, body').animate({
            scrollTop: offset
        }, 1000); // Задайте бажану тривалість анімації в мілісекундах
    });
    if (window.innerWidth < 1180) {
        jQuery('.mobile-nav').append(jQuery('.pll-parent-menu-item'))
    } else {
        jQuery('#primary-menu').append(jQuery('.pll-parent-menu-item'))
    }

    const siteNavigation = document.getElementById( 'site-navigation' );
    const siteMenu = document.querySelector( '.menu-toggle + div' );

    // Return early if the navigation doesn't exist.
    if ( ! siteNavigation ) {
        return;
    }

    const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];
    $("#primary-menu li:not(.pll-parent-menu-item):not(.lang-item) a").click(
        function () {
            siteNavigation.classList.remove( 'toggled' );
            siteMenu.classList.remove( 'opened' );
            button.setAttribute( 'aria-expanded', 'false' );
        }
    )
    jQuery( window ).on( "orientationchange",function () {
        siteNavigation.classList.remove( 'toggled' );
        siteMenu.classList.remove( 'opened' );
        button.setAttribute( 'aria-expanded', 'false' );
    })
    jQuery( window ).on( "resize", function() {
        if (window.innerWidth < 1180) {
            jQuery('.mobile-nav').append(jQuery('.pll-parent-menu-item'))
        } else {
            jQuery('#primary-menu').append(jQuery('.pll-parent-menu-item'))
        }
    } );

    jQuery('.pll-parent-menu-item').on('click', function (e) {
        // Вмикайте або вимикайте клас "focus" при кожному кліку
        jQuery(this).toggleClass('focus');
        e.stopPropagation(); // Зупиняємо розповсюдження події
    });

    // Додаємо обробник кліка для всіх .sub-menu
    jQuery('.sub-menu').on('click', function (e) {
        e.stopPropagation(); // Зупиняємо розповсюдження події
    });

    // Додаємо обробник кліка для всієї сторінки
    jQuery(document).on('click', function () {
        // Видаляємо клас "focus" у всіх елементів .pll-parent-menu-item
        jQuery('.pll-parent-menu-item').removeClass('focus');
    });

    $('.contacts-form').submit(function(event) {
        event.preventDefault();
        var isValid = true;

        $('.contacts-form-field').removeClass('error');
        $('.contacts-form__error').text('');

        if ($('#name').val() === '') {
            $('#name').addClass('error');
            $('#name').siblings('.contacts-form__error').text($('#name').data('empty')).show();
            isValid = false;
        } else if (!/^[A-Za-zА-Яа-яЁёіїІЇҐґ\s-ØøÅåÆæ]*$/.test($('#name').val())) {
            $('#name').addClass('error');
            $('#name').siblings('.contacts-form__error').text($('#name').data('digits')).show();
            isValid = false;
        } else {
            $('#name').removeClass('error');
        }

        if ($('#email').val() === '') {
            $('#email').addClass('error');
            $('#email').siblings('.contacts-form__error').text($('#email').data('empty')).show();
            isValid = false;
        } else if (!isValidEmail($('#email').val())) {
            $('#email').addClass('error');
            $('#email').siblings('.contacts-form__error').text($('#email').data('valid')).show();
            isValid = false;
        } else {
            $('#email').removeClass('error');
        }

        if ($('#message').val() === '') {
            $('#message').addClass('error');
            $('#message').siblings('.contacts-form__error').text($('#message').data('empty')).show();
            isValid = false;
        } else {
            $('#message').removeClass('error');
        }

        // Якщо форма пройшла валідацію, можна відправити дані
        if (isValid) {
            // Ваш код для відправки форми за допомогою AJAX
            //
            // Якщо немає помилок, відправляємо дані форми
            var formData = $(this).serialize();

            $.ajax({
                type: "POST",
                url: "/wp-content/themes/affilate-1b/send.php", // Замініть це на URL вашого серверного скрипту
                data: formData,
                dataType: "json",
                success: function(response) {
                    if (response.success) {
                        // Форма відправлена успішно, робимо що завгодно
                        $(".success-message").addClass("active");
                        $('.contacts-form')[0].reset();
                        setTimeout(function (){
                            $(".success-message").removeClass('active')
                        }, 2000)
                    } else {
                        // Відображаємо помилки валідації
                        var validationErrors = response.errors;
                        for (var key in validationErrors) {
                            $("#" + key).closest('.contacts-form__item').addClass('error');
                            $("#" + key).siblings('.contacts-form__error').text(validationErrors[key]).show();
                        }
                    }
                },
                error: function(xhr, status, error) {
                    // Помилка при відправці запиту
                    $("#formResponse").html("Error: " + error);
                },
            });
        }
    });

    function isValidEmail(email) {
        // Функція для перевірки валідності email-адреси (можете розробити власну логіку)
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

});
