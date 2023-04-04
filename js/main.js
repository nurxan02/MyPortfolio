(function ($) {
  "use stict";
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  document.addEventListener("copy", (e) => {
    e.preventDefault();
  });
  var position = $(window).scrollTop();

  stopAnimateOnScroll();
  setPrettyPhoto();
  placeholderToggle();
  setDataNumberForSections();
  setTotalPageNumber();
  setCircleSkills();
  setHorizontalSkills();
  setSlowScroll();
  setPortfolio();
  setActiveMenuItem();
  portfolioItemContentLoadOnClick();
  sendMail();
  changeLangEn();
  changeLangAz();
  changeLangPl();
  changeLangRu();

  $(window).on("load", function () {
    imageSliderSetUp();
    $("#toggle").on("click", multiClickFunctionStop);
    setMenu();
    setHash();
    $(".doc-loader").fadeOut();
  });

  $(window).on("resize", function () {
    setCircleSkills();
    setHorizontalSkills();
    setActiveMenuItem();
  });

  $(window).on("scroll", function () {
    setCircleSkills();
    setHorizontalSkills();
    setActiveMenuItem();
  });

  //------------------------------------------------------------------------
  //Helper Methods -->
  //------------------------------------------------------------------------

  function stopAnimateOnScroll() {
    $("html, body").on(
      "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove",
      function () {
        $("html, body").stop();
      }
    );
  }

  function placeholderToggle() {
    $("input, textarea").on("focus", function () {
      $(this).data("placeholder", $(this).attr("placeholder"));
      $(this).attr("placeholder", "");
    });
    $("input, textarea").on("blur", function () {
      $(this).attr("placeholder", $(this).data("placeholder"));
    });
  }

  function setSlowScroll() {
    $('#header-main-menu ul li a[href^="#"], a.button, .slow-scroll').on(
      "click",
      function (e) {
        if ($(this).attr("href") === "#") {
          e.preventDefault();
        } else {
          if ($(window).width() < 1360) {
            if (!$(e.target).is(".sub-arrow")) {
              $("html, body").animate(
                { scrollTop: $(this.hash).offset().top },
                1500
              );
              $("body").removeClass("open done");
              $("#toggle").removeClass("on");
              return false;
            }
          } else {
            $("html, body").animate(
              { scrollTop: $(this.hash).offset().top },
              1500
            );
            return false;
          }
        }
      }
    );
  }

  function setPortfolio() {
    var grid = $(".grid").imagesLoaded(function () {
      grid.isotope({
        percentPosition: true,
        itemSelector: ".grid-item",
        masonry: {
          columnWidth: ".grid-sizer",
        },
      });
      $(".filters-button-group").on("click", ".button", function () {
        var filterValue = $(this).attr("data-filter");
        grid.isotope({ filter: filterValue });
        grid.on("arrangeComplete", function () {
          setPrettyPhoto();
        });
      });
      $(".button-group").each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on("click", ".button", function () {
          $buttonGroup.find(".is-checked").removeClass("is-checked");
          $(this).addClass("is-checked");
        });
      });
      $(".category-filter").on("click", function () {
        $(this).toggleClass("filter-open");
        $(".category-filter-list").slideToggle("fast");
      });
    });
  }

  function setActiveMenuItem() {
    var currentSection = null;
    var c = $(".content-right .section.section-active").data("num");
    var scroll = $(window).scrollTop();
    $(".section").each(function () {
      var element = $(this).attr("id");
      if ($("#" + element).is("*")) {
        if ($(window).scrollTop() >= $("#" + element).offset().top - 150) {
          currentSection = element;
        }
      }
    });
    $("#header-main-menu ul li")
      .removeClass("current")
      .find('a[href*="#' + currentSection + '"]')
      .parent()
      .addClass("current");
    $(".content-right .section").removeClass("section-active");
    $("#" + currentSection).addClass("section-active");

    if (c !== $("#" + currentSection).data("num")) {
      c = $("#" + currentSection).data("num");
      $(".current-num span").animate(
        { opacity: "0", left: "-5px" },
        150,
        function () {
          $(this).text(c).animate({ opacity: "1", left: "0" }, 150);
          $(".current-big-num").text(c).data("num");
        }
      );
    }

    position = scroll;
  }

  function setTotalPageNumber() {
    $(".total-pages-num").html(
      ("0" + $(".content-right .section").length).slice(-2)
    );
  }

  function setDataNumberForSections() {
    var k = 1;
    $(".content-right .section").each(function () {
      $(this).data("num", ("0" + k).slice(-2));
      k++;
    });
  }

  function setCircleSkills() {
    $(".skill-circle-wrapper:not(.animation-done)").each(function () {
      $(this).circleProgress({
        value: $(this).data("value"),
        size: 254,
        fill: $(this).data("color"),
        startAngle: -Math.PI / 2,
        thickness: 45,
        emptyFill: $(this).data("empty-color"),
        reverse: true,
      });
      var top_of_object = $(this).offset().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (bottom_of_window - 70 > top_of_object) {
        $(this).on(
          "circle-animation-progress",
          function (event, progress, stepValue) {
            $(this)
              .find(".skill-circle-num")
              .html(Math.round(100 * stepValue.toFixed(2).substr(1)) + "%");
          }
        );
        $(this).addClass("animation-done");
      }
    });
  }

  function setHorizontalSkills() {
    $(".skill-fill:not(.animation-done").each(function (i) {
      var top_of_object = $(this).offset().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (bottom_of_window - 70 > top_of_object) {
        $(this).width($(this).data("fill"));
        $(this).addClass("animation-done");
      }
    });
  }

  function setHash() {
    var hash = location.hash;
    if (hash !== "" && $(hash).length) {
      $("html, body").animate({ scrollTop: $(hash).offset().top }, 1);
      $("html, body").animate({ scrollTop: $(hash).offset().top }, 1);
    } else {
      $(window).scrollTop(1);
      $(window).scrollTop(0);
    }
  }

  function setMenu() {
    $(".main-menu").smartmenus({
      subMenusSubOffsetX: 1,
      subMenusSubOffsetY: -8,
    });
  }

  function imageSliderSetUp() {
    $(".image-slider").each(function () {
      var speed_value = $(this).data("speed");
      var auto_value = $(this).data("auto");
      var hover_pause = $(this).data("hover");
      if (auto_value === true) {
        $(this).owlCarousel({
          loop: true,
          autoHeight: true,
          smartSpeed: 1000,
          autoplay: auto_value,
          autoplayHoverPause: hover_pause,
          autoplayTimeout: speed_value,
          responsiveClass: true,
          items: 1,
        });
        $(this).on("mouseleave", function () {
          $(this).trigger("stop.owl.autoplay");
          $(this).trigger("play.owl.autoplay", [auto_value]);
        });
      } else {
        $(this).owlCarousel({
          loop: true,
          autoHeight: true,
          smartSpeed: 1000,
          autoplay: false,
          responsiveClass: true,
          items: 1,
        });
      }
    });
  }

  function setPrettyPhoto() {
    $("a[data-rel]").each(function () {
      $(this).attr("rel", $(this).data("rel"));
    });
    $(".grid-item:visible a[rel^='prettyPhoto']").prettyPhoto({
      slideshow: false,
      overlay_gallery: false,
      default_width: 1280,
      default_height: 720,
      deeplinking: false,
      social_tools: false,
      iframe_markup:
        '<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    });
  }

  function multiClickFunctionStop(e) {
    e.preventDefault();
    $("#toggle").off("click");
    $("#toggle").toggleClass("on");
    $("body")
      .toggleClass("open")
      .delay(300)
      .queue(function (next) {
        $(this).toggleClass("done");
        $("#toggle").on("click", multiClickFunctionStop);
        next();
      });
  }

  function portfolioItemContentLoadOnClick() {
    $(".ajax-portfolio").on("click", function (e) {
      e.preventDefault();
      var portfolioItemID = $(this).data("id");
      $(this).closest(".grid-item").addClass("portfolio-content-loading");
      $("#portfolio-grid").addClass("portfoio-items-mask");
      if ($("#pcw-" + portfolioItemID).length) {
        $("html, body").animate(
          { scrollTop: $("#portfolio-wrapper").offset().top - 150 },
          400
        );
        setTimeout(function () {
          $(
            "#portfolio-grid, .category-filter, .category-filter-list"
          ).addClass("hide");
          setTimeout(function () {
            $("#pcw-" + portfolioItemID).addClass("show");
            $(".portfolio-load-content-holder").addClass("show");
            $(".grid-item").removeClass("portfolio-content-loading");
            $("#portfolio-grid, .category-filter")
              .hide()
              .removeClass("portfoio-items-mask");
          }, 300);
        }, 500);
      } else {
        loadPortfolioItemContent(portfolioItemID);
      }
    });
  }

  function loadPortfolioItemContent(portfolioItemID) {
    $.ajax({
      url: $('.ajax-portfolio[data-id="' + portfolioItemID + '"]').attr("href"),
      type: "GET",
      success: function (html) {
        var getPortfolioItemHtml = $(html)
          .find(".portfolio-item-wrapper")
          .html();
        $(".portfolio-load-content-holder").append(
          '<div id="pcw-' +
            portfolioItemID +
            '" class="portfolio-content-wrapper">' +
            getPortfolioItemHtml +
            "</div>"
        );
        if (!$("#pcw-" + portfolioItemID + " .close-icon").length) {
          $("#pcw-" + portfolioItemID).prepend(
            '<div class="close-icon"></div>'
          );
        }
        $("html, body").animate(
          { scrollTop: $("#portfolio-wrapper").offset().top - 150 },
          400
        );
        setTimeout(function () {
          $("#pcw-" + portfolioItemID).imagesLoaded(function () {
            imageSliderSetUp();
            setSlowScroll();
            $(
              "#portfolio-grid, .category-filter, .category-filter-list"
            ).addClass("hide");
            setTimeout(function () {
              $("#pcw-" + portfolioItemID).addClass("show");
              $(".portfolio-load-content-holder").addClass("show");
              $(".grid-item").removeClass("portfolio-content-loading");
              $("#portfolio-grid").hide().removeClass("portfoio-items-mask");
            }, 300);
            $(".close-icon").on("click", function (e) {
              var portfolioReturnItemID = $(this)
                .closest(".portfolio-content-wrapper")
                .attr("id")
                .split("-")[1];
              $(".portfolio-load-content-holder").addClass("viceversa");
              $("#portfolio-grid, .category-filter").css("display", "block");
              setTimeout(function () {
                $("#pcw-" + portfolioReturnItemID).removeClass("show");
                $(".portfolio-load-content-holder").removeClass(
                  "viceversa show"
                );
                $(
                  "#portfolio-grid, .category-filter, .category-filter-list"
                ).removeClass("hide");
              }, 300);
              setTimeout(function () {
                $("html, body").animate(
                  {
                    scrollTop:
                      $("#p-item-" + portfolioReturnItemID).offset().top - 150,
                  },
                  400
                );
              }, 500);
            });
          });
        }, 500);
      },
    });
    return false;
  }

  function isValidEmailAddress(emailAddress) {
    var pattern =
      /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  }

  function sendMail() {
    $('.contact-form [type="submit"]').on("click", function () {
      var emailVal = $("#contact-email").val();

      if (isValidEmailAddress(emailVal)) {
        var params = {
          action: "SendMessage",
          name: $("#name").val(),
          email: $("#contact-email").val(),
          subject: $("#subject").val(),
          message: $("#message").val(),
        };
        $.ajax({
          type: "POST",
          url: "php/sendMail.php",
          data: params,
          success: function (response) {
            if (response) {
              var responseObj = $.parseJSON(response);
              if (responseObj.ResponseData) {
                alert(responseObj.ResponseData);
              }
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
            //xhr.status : 404, 303, 501...
            var error = null;
            switch (xhr.status) {
              case "301":
                error = "Redirection Error!";
                break;
              case "307":
                error = "Error, temporary server redirection!";
                break;
              case "400":
                error = "Bad request!";
                break;
              case "404":
                error = "Page not found!";
                break;
              case "500":
                error = "Server is currently unavailable!";
                break;
              default:
                error = "Unespected error, please try again later.";
            }
            if (error) {
              alert(error);
            }
          },
        });
      }
    });
  }

  function changeLangAz() {
    $(".az").click(function () {
      $("#name").text("AD");
      $("#nameBig").text("Nurxan");
      $("#sentMessage").text("Mesajınız uğurla göndərildi!");

      $("#surnameBig").text("Məsimzadə");

      $("#nameVal").text("Nurxan Məsimzadə");
      $("#profession").text("İXTİSAS");
      $("#professionVal").text("Veb və Mobil Tərtibatçı");
      $("#phonee").text("TELEFON");
      $(".emaill").text("MAİL ÜNVANI:");
      $("#emaill").text("MAİL ÜNVANI");
      $("#hello1").text("Salam. Mənim adım");
      $("#descTitle").text(
        " Salam, mən Nurxan, freelancer veb və mobil proqram tərtibatçısıyam. Yenilikçi həllər ilə veb və mobil tərtibatçılığına yeni bir bucaq yaratmağa çalışıram. Sizdə bu həllərdən yararlana bilərsiniz. Sadəcə izləmədə qalın!"
      );
      $("#homee").text("Ana səhifə");
      $("#servicee, #serviceT").text("Xidmətlər");
      $("#portfolioo").text("Portfolio");
      $("#resumee").text("CV");
      $("#skillss").text("Bacarıqlar");
      $("#contactt").text("Əlaqə");

      $("#webDesignTitle").text("Veb Dizayn");
      $("#developTitle").text("Tərtibetmə");
      $("#responsiveTitle").text("Adaptiv Dizayn");
      $("#quickTitle").text("Cəld Dəstək");

      $("#webDesignDesc").text(
        "Veb dizayn vizual cəhətdən cəlbedici və funksional veb-saytların yaradılması və saxlanması prosesidir."
      );
      $("#developDesc").text(
        "Müasir veb inkişafı davam edən bir yanaşmadır. İnternetin daim inkişaf edən təbiəti ilə əlçatan, istifadəçi dostu və genişləndirilə bilən yaradın internet saytları."
      );
      $("#responsiveDesc").text(
        "Adaptiv dizayn məzmunun masa üstü kompüterlərdə, noutbuklarda, planşetlərdə və mobil telefonlarda problemsiz və ardıcıl şəkildə nümayiş etdirilməsinə imkan verir, istifadəçi təcrübəsini və istifadə imkanlarını artırır."
      );
      $("#quickDesc").text(
        "Veb proqramçıları olaraq biz həmişə müştərilərimizə ən yaxşı xidməti təqdim etməyə çalışırıq və ani dəstək təklif etməkdən məmnunuq."
      );

      $("#serviceDesc").html(
        "Web developer kimi, sizin biznesiniz üçün unikal və əks-hərəkətli rəqəmsal mövcudluq yaratmaq üçün bir sıra xidmətlər təklif edirəm. Yeni bir veb saytına, mövcud olanın yenilənməsinə və ya sayt idarəetməsi və texniki problemlər üçün davamlı dəstəkə ehtiyacınıza görə, gözləntilərinizi aşan nəticələr vermək üçün bacarıqlarım və təcrübələrim var. <br/><br/> Mənim xidmətlərim responsiv dizaynla başlayır, ki, bu saytınızın masaüstü və laptoplardan smartfonlar və tabletə kimi bütün cihazlarda gözəl görünməsini və mükəmməl işləməsini təmin edir. Müasir, gözəl görünüşlü dizaynlar mühitində fokuslanaraq, markanızı əks etdirən və oxucunu əhatə edən bir sayt yaratmanıza kömək edə bilərəm. <br/><br/> Responsiv dizaynın əlavəsi olaraq, saytınızın onlayn uğur qazanmaq və fərqlənmək üçün bir çox digər xidmətlər də təklif edirəm. Bu, saytınızın axtarış nəticələrində daha yüksək bir yerdə yer almasına və daha çox ziyarətçi cəlb etməsinə kömək edən SEO optimizasiyası, habelə məhsullarınızı və xidmətlərinizi onlayn satmağa imkan verən e-ticarət inteqrasiyalarını daxildirir. <br/><br/> E-ticarət saytları üçün, mən məhsul kataloqları, alış-veriş səbətləri, ödəniş sistemləri və sifariş izləmə kimi bir çox xüsusiyyət və funksiyaların inteqrasiyasına kömək edə bilərəm. Və bütün saytlar üçün, saytınızın yenilənməli və mükəmməl işləməli qalmasını təmin etmək üçün davamlı dəstək və dəmiryolu ətrafında dəstək təklif edirəm."
      );

      $("#cvDownload").text("CV-ni yüklə");
      $("#githubCheck").text("Github-a keçid et");

      $("#educationTitle").text("Təhsil");
      $("#bachelor").html(
        "<b>2019 - 2023 | Proseslərin Avtomatlaşdırılması Mühəndisliyi | Bakalavr - Azərbaycan Memarlıq və İnşaat Universiteti.</b><br />                           <br />                   Proses avtomatlaşdırma mühəndisi olaraq, texnologiyadan istifadə edərək məşğul sahələrdəki kompleks sənaye proseslərini təkmilləşdirir və avtomatlaşdırır, eyni zamanda istifadə olunan avtomatlaşdırılmış maşınların işləməsini də qoruyuram. İstehsal şirkətləri üçün xərc azaltma və qazanc artırmaq üzrə məqsədə xidmət edən proses təkmilləşdirmə layihələrini idarə edirəm. Kimya və elektro mühəndisliyi, ləvazimat və nəzarət, riyaziyyat və kompüter, yazılım və IT, iş və idarəetmə kimi müxtəlif sahələr haqqında geniş və dərin bir bilikə malikəm."
      );

      $("#course").html(
        "<b>2022 - 2023 | Full-stack Development Bootcamp | Code Academy</b><br /><br /> Təhsil proqramının məqsədi informasiya sahəsində ehtiyac olan professional kadrların hazırlanmasıdır. Code Academy praktika əsaslı təhsil modeli ilə ən son texnologiyaları öyrədir və tələbələri Web Proqramlaşdırması sahəsində 'MCSA:  Web Applications' və 'MCSD: Web Applications' beynəlxalq sertifikat imtahanlarına hazırlayır. Bu da tələbələrin beynəlxalq professional mütəxəssis adını almasını təmin edir."
      );
      $("#master").html(
        "<b>2023 - 2025 | Magistratura | Tezliklə</b><br /><br />Universitetdə keçirilən Veb Tərtibatçılıq Magistratura proqramı, tələbələrə veb inkişafı texnologiyaları və konseptləri ilə ətraflı təlimat vermək üçün hazırlanmışdır. Bu proqram, kompüter elmləri və ya oxşar sahədə bakalavr dərəcəsi almış və veb inkişafında bilik və bacarıqlarını dərinləşdirmək istəyən tələbələr üçün idealdir."
      );
      $("#coverLetter").text("Motivasiya Məktubu");
      $("#coverDesc").html(
        "Sevgili tərəfdaşım,<br /><br /> Portfolio saytıma xoş gəlmisiniz. Yetərincə təcrübəli bir veb developer olaraq responsiv veb tətbiqlər yaratma qabiliyətinə sahibəm. Mən C#, ASP.NET, JavaScript, HTML, CSS, SASS, Bootstrap, MS SQL, Tailwind, React.js və bir az da Flutter təcrübəsinə malikəm.<br /><br /> Mən yüksək səviyyəli veb tərəfdaşlıq inkişaf etdirmək üçün daima yeni texnologiyalar öyrənmək və ən son versiyalara nəzarət etmək istəyən bir veb tərtibatçıyam. Mən vizual tərəfdən zövq almaqla yanaşı funksional və istifadəçi dostu olan veb tətbiqləri yaratmağı sevirəm. Müxtəlif texnologiyaların istifadəsi ilə dinamik, responsiv və istifadəçi dostu veb tətbiqləri inkişaf etdirə bilərəm. Vaxtında keyfiyyətli iş təhvil verməyə və layihə məqsədlərinə nail olmaq üçün komandamla əməkdaşlıq etməyə söz verirəm. <br/><br/> Mənim bacarıqlarım, maraqlarım və mükəmməlliyyətə olan tələbim, məni hər hansı bir komandaya dəyərli bir sərvət edən etibarlı bir işçi edir. Potensial işverənlərlə əlaqə qurmaqdan və digər veb inkişafçıları ilə əməkdaşlıq edərək, müştəri və istifadəçilərin ehtiyaclarını qarşılayan birinci sinif veb tətbiqləri yaratmaqdan həyəcanlanıram. <br/><br/> Saytıma daxil olduğunuz üçün təşəkkür edirəm. Sizlərlə əlaqə qurmağı və komandada necə kömək edə biləcəyimi müzakirə etməyi dərindən arzu edirəm. <br/><br/>Hörmətlə,<br/><br/>Nurxan Məsimzadə"
      );
      $("#experiance").text("Təcrübə");
      $("#electrocomp").html(
        "<b>2019 - 2020 | İstehlak elektronikası satış meneceri | Electrocomp.az</b><br /><br />Elektronika satış nümayəndəsi, elektronika məhsullarının müştərilərə təqdim edilməsi və satışının aparılması üçün cavabdehdir. Bu iş strateji yaratmaq, satış zəngləri təşkil etmək, məhsulların təqdimatını təmin etmək, müqavilə müzakirələri aparılması və müştəri razılığının təmin edilməsi ilə bağlıdır. Bu rol, güclü kommunikasiya bacarıqlarını və texniki bilikləri tələb edir, həmçinin müştəri tələblərini anlamaq və öncədən görmək bacarığına da malik olmalıdır. Satış nümayəndələri fərdi olaraq işləyə, vaxtını effektiv idarə etməli və satış hədəflərinə çatmaq üçün vəzifələri prioritetləndirməlidirlər. Elektronika satış nümayəndəsi kimi uğur qazanmaq üçün, son texnoloji inkişaf və sənayə mənbələrini izləmək və müştəri və həmkarlarla müsbət əlaqələr saxlamaq da tələb olunur. Detallara diqqət, problem həll etmə bacarıqları və müsbət münasibət bu rol üçün uğurlu olmaq üçün vacib xüsusiyyətlərdir."
      );
      $("#mentor").html(
        "<b>2023 - indi | Full-stack Mentor | Code Academy</b><br /><br />Developer Bootcamp'də mentor olmaq, tələbələrin kod yazmağı öyrənmələrinə və yazılım inkişaf etdirmələrinə dəstək və məsləhət təmin etməyi əhatə edir. Müəllim kimi, siz tələbələrlə yaxından birgə çalışaraq onların zəiflərini həll etmələrində və tam potensiallarına çatmalarında kömək etməlisiniz. Vəzifələr, layihə inkişafına kömək etmək, kod üzərində rəy bildirmək, texniki sualları cavablandırmaq və tələbələrin proqramlaşdırma kontseptlərinə və ən yaxşı praktikalarına güclü bir başa düşmələri üçün kömək etməyi əhatə edə bilər. Həmçinin, tələbələrin hərəkətini izləmək və proqram rəhbərlərinə düzgün yeniliklər verərək təqvimə uyğun hesabatlar verə bilərsiniz. Developer Bootcamp'də müəllim olmaq üçün, sizin yazılım inkişafında güclü bir arxa planınız olmalı və texniki kontseptləri aydın və aydın bir şəkildə izah edə biləcək qabiliyyətiniz olmalıdır. Həmçinin, sabır, empatiya və hər tələbənin fərqli öyrənmə üslublarına uyğun adaptasiya qabiliyyəti olmalıdır. Tələbələrə müsbət rəy və motivasiya təmin etmək üçün məşru rəy və məşğuliyyət təqdim etmək qabiliyyətiniz də əhəmiyyət kəsb edir."
      );
      $("#nowTime").text("İndi");
      $("#skillsT").text("Bacarıqlar");
      $("#getTitle").text("Əlaqə qurun");

      $("#getInfo").text(
        "Mən sizin mənimlə əlaqə yaratmaq istəyinizə sevindim. Sizin saytıma gələn ziyarətçilərdən istədiyiniz bir iş təklifi, əməkdaşlıq ideyası və ya sadəcə salam demək istəyiniz olsa belə, həmişə mənə yazmaqdan xoşbəxtlik duyarım."
      );
      $("#text1").text("Siz mənimlə");
      $("#text2").text("elektron poçt ünvanı və ya");
      $("#text3").text("nömrəsi ilə əlaqə saxlaya bilərsiniz.");
      $("#text4").text(
        "Əgər əlaqə formasından istifadə etmək istəyirsinizsə, aşağıda onu tapa bilərsiniz."
      );
      $("#text5").text("Linktree üçün bura klikləyin");
      $("#formName").text("Adınız:");
      $("#formSurname").text("Soyadınız:");
      $("#formEmail").text("E-mail ünvanınız:");
      $("#formMessage").text("Mesajınız:");
      $("#formSend").text("Göndər");

      $("#addresses").text("ADRES:");
      $("#website").text("VEB SƏHİFƏ:");
      $("#rights").html(
        '© Bütün hüquqları <a href="http://bio.link/nurxanmasimzade"><b>Nurkhan Masimzade</b></a> tərəfindən qorunur'
      );
      $("#question").text("Tez-tez verilən suallar ?");
    });
  }
  function changeLangEn() {
    $(".en").click(function () {
      $("#name").text("NAME");
      $("#nameBig").text("Nurkhan");
      $("#surnameBig").text("Masimzade");
      $("#sentMessage").text("Your message successfully sent!");

      $("#nameVal").text("Nurkhan Masimzade");
      $("#profession").text("ROLE");
      $("#professionVal").text("Web and App Developer");
      $("#phonee").text("PHONE");
      $(".emaill").text("EMAIL:");
      $("#emaill").text("EMAIL");
      $("#hello1").text("Hello. My name is");
      $("#descTitle").text(
        "Hi, I'm Nurkhan, a freelance web and mobile app developer with a passion for creating innovative solutions that help businesses succeed in today's digital age."
      );
      $("#homee").text("Home");
      $("#servicee, #serviceT").text("Services");
      $("#portfolioo").text("Portfolio");
      $("#resumee").text("Resume");
      $("#skillss").text("Skills");
      $("#contactt").text("Contact");

      $("#webDesignTitle").text("Web Design");
      $("#developTitle").text("Develop");
      $("#responsiveTitle").text("Responsive Design");
      $("#quickTitle").text("Quick Support");

      $("#webDesignDesc").text(
        "Web design is the process of creating and maintaining visually appealing and functional websites."
      );
      $("#developDesc").text(
        "Modern web development is an approach that keeps up with the ever-evolving nature of the internet to create accessible, user-friendly, and scalable websites."
      );
      $("#responsiveDesc").text(
        "Responsive design allows content to be displayed seamlessly and consistently on desktops, laptops, tablets, and mobile phones, enhancing user experience and usability."
      );
      $("#quickDesc").text(
        "As web programmers, we always strive to provide the best service to our customers and we are happy to offer instant support."
      );

      $("#serviceDesc").html(
        "As a web developer, I offer a range of services to help                       you create a unique and compelling digital presence for                       your business. Whether you need a new website, an upgrade                       to an existing one, or ongoing support for site management                       and technical issues, I have the skills and expertise to                       deliver results that exceed your expectations.                       <br /><br />                       My services start with responsive design, which ensures                       that your site looks great and functions flawlessly on all                       devices, from desktops and laptops to smartphones and                       tablets. With a focus on modern, visually appealing                       designs, I can help you create a site that reflects your                       brand and engages your audience.                       <br /><br />                       In addition to responsive design, I also offer a range of                       other services to help your site stand out and succeed                       online. This includes SEO optimization, which helps your                       site rank higher in search results and attract more                       visitors, as well as e-commerce integrations that enable                       you to sell products and services online.                       <br /><br />                       For e-commerce sites, I can help you integrate a range of                       features and functionality, from product catalogs and                       shopping carts to payment systems and order tracking. And                       for all sites, I offer ongoing support and maintenance to                       ensure that your site remains up-to-date and running                       smoothly."
      );

      $("#cvDownload").text("Download CV");
      $("#githubCheck").text("Check My Github");
      $("#educationTitle").text("Education");

      $("#bachelor").html(
        "<b>2019 - 2023 | Processes Automation Engineering |                             Bachelor - Azerbaijan Architecture and Construction                             University.</b><br />                           <br />                           As a process automation engineer, I use technology to                           optimize and automate complex industrial processes                           while maintaining the automated machinery involved. I                           manage process improvement projects that focus on cost                           reduction and profit increase for manufacturing                           companies. I also have a broad and deep knowledge of                           various disciplines, such as chemical and electrical                           engineering, instrumentation and control, maths and                           computing, software and IT, and business and                           management."
      );

      $("#course").html(
        "<b>2022 - 2023 | Full-stack Development Bootcamp | Code Academy</b><br /><br>The purpose of the education program is to train professionals needed in the information sector. Code Academy teaches the latest technologies with a practice-based educational model and prepares students for the international certification exams 'MCSA: Web Applications' and 'MCSD: Web Applications' in Web Programming. This, in turn, earns students the title of international professional specialist."
      );

      $("#master").html(
        " <b>2023 - 2025 | Master Degree | Soon</b><br /><br />                           A Web Development Master's Degree program at a                           university is designed to provide students with                           advanced training in web development technologies and                           concepts. This program is ideal for students who have                           completed a bachelor's degree in computer science or a                           related field, and who are looking to deepen their                           knowledge and skills in web developmen"
      );
      $("#coverLetter").text("Cover letter");

      $("#coverDesc").html(
        "Dear visitor,<br /><br />                       Welcome to my portfolio website. I am a junior web                       developer with a passion for creating innovative,                       user-friendly, and responsive web applications. I have                       experience in C#, ASP.NET, JavaScript, HTML, CSS, SASS,                       Bootstrap, MS SQL, Tailwind, React.js, and a little                       Flutter.                        <br /><br />                       As a junior web developer, I am constantly seeking to                       learn new technologies and stay up-to-date with the latest                       industry trends. I enjoy building web applications that                       are not only aesthetically pleasing but also functional                       and user-friendly. I am committed to delivering quality                       work on time and working collaboratively with my team to                       achieve project goals.                        <br /><br />                       On my portfolio website, you will find a selection of my                       projects that demonstrate my skills and experience as a                       web developer. These projects showcase my ability to                       develop dynamic, responsive, and user-friendly web                       applications using a range of technologies. I am proud of                       the work I have done, and I am eager to take on new                       challenges to further develop my skills.                       <br /><br />                       I believe that my skills, passion, and commitment to                       excellence make me a valuable asset to any team. I am                       excited to connect with potential employers and                       collaborate with other web developers to create top-notch                       web applications that meet the needs of clients and                       end-users.                       <br /><br />                       Thank you for visiting my website. I look forward to                       hearing from you and discussing how I can contribute to                       your team.                       <br /><br />                       Sincerely, <br /><br />Nurkhan Masimzade"
      );
      $("#experiance").text("Experiance");
      $("#electrocomp").html(
        "<b>2019 - 2020 | Consumer Electronics Sales Manager | Electrocomp.az</b><br /><br />An electronics sales representative is responsible for promoting and selling electronic products to customers. This may involve developing sales strategies, making sales calls, providing product demonstrations, negotiating contracts, and ensuring customer satisfaction. The role requires strong communication skills and technical knowledge, as well as the ability to understand and anticipate customer needs. Sales representatives must be able to work independently, manage their time effectively, and prioritize tasks to meet sales targets. To succeed as an electronics sales representative, one must be able to stay up-to-date with the latest technological advancements and industry trends, as well as maintain positive relationships with customers and colleagues. Attention to detail, problem-solving skills, and a positive attitude are also key traits for success in this role."
      );
      $("#mentor").html(
        "<b>2023 - now | Full-stack Mentor | Code Academy</b                           ><br /><br />                           Being a mentor at Developer Bootcamp involves                           providing guidance and support to students as they                           learn to code and develop their skills in software                           development. As a mentor, you will work closely with                           students to help them overcome challenges and reach                           their full potential. Responsibilities may include                           assisting with project development, providing feedback                           on code, answering technical questions, and helping                           students develop a strong understanding of programming                           concepts and best practices. Additionally, you may be                           responsible for tracking student progress and                           providing regular updates to program leaders. To be an                           effective mentor at Developer Bootcamp, you should                           have a strong background in software development and                           be able to communicate technical concepts in a clear                           and concise manner. Additionally, you should be                           patient, empathetic, and able to adapt to the                           individual learning styles of each student. The                           ability to provide constructive feedback and motivate                           students is also essential to the role."
      );
      $("#nowTime").text("Now");
      $("#skillsT").text("Skills");
      $("#getTitle").text("Get in touch");

      $("#getInfo").text(
        "I'm thrilled that you're interested in getting in touch with me. Whether you have a potential job opportunity, collaboration idea, or just want to say hello, I'm always happy to hear from visitors to my site."
      );
      $("#text1").text("You can reach me via email at");
      $("#text2").text(", or by phone at");
      $("#text3").text("");
      $("#text4").text(
        ". If you prefer to use a contact form, you can find one below. Simply fill out the form with your name, email address, and a message, and I'll get back to you as soon as possible."
      );
      $("#text5").text("Click here for my linktree");
      $("#formName").text("Your Name:");
      $("#formSurname").text("Your Surname:");
      $("#formEmail").text("Your email:");
      $("#formMessage").text("Your message:");
      $("#formSend").text("Send");

      $("#addresses").text("ADDRESS:");
      $("#website").text("WEBSITE:");
      $("#rights").html(
        '© All Rights Reserved by <a href="http://bio.link/nurxanmasimzade"><b>Nurkhan Masimzade</b></a>'
      );
      $("#question").text("Frequently asked questions ?");
    });
  }
  function changeLangPl() {
    $(".pl").click(function () {
      $("#name").text("NAZWA");
      $("#nameBig").text("Nurkhan");
      $("#surnameBig").text("Masimzade");

      $("#sentMessage").text("Twoja wiadomość została pomyślnie wysłana!");

      $("#nameVal").text("Nurkhan Masimzade");
      $("#profession").text("ROLA");
      $("#professionVal").text("Programista stron internetowych");
      $("#phonee").text("TELEFON");
      $(".emaill").text("EMAIL:");
      $("#emaill").text("EMAIL");
      $("#hello1").text("Witam. Nazywam się");
      $("#descTitle").text(
        "Cześć, jestem Nurkhan, niezależny programista aplikacji internetowych i mobilnych z pasją do tworzenia innowacyjnych rozwiązań, które pomagają firmom odnieść sukces w dzisiejszej erze cyfrowej."
      );
      $("#homee").text("Dom");
      $("#servicee, #serviceT").text("Usługi");
      $("#portfolioo").text("Teczka");
      $("#resumee").text("Wznawiać");
      $("#skillss").text("Umiejętności");
      $("#contactt").text("Kontakt");

      $("#webDesignTitle").text("Projektowanie Stron");
      $("#developTitle").text("Rozwój");
      $("#responsiveTitle").text("Elastyczny projekt");
      $("#quickTitle").text("Szybkie wsparcie");

      $("#webDesignDesc").text(
        "Projektowanie stron internetowych to proces tworzenia i utrzymywania wizualnie atrakcyjnych i funkcjonalnych stron internetowych."
      );
      $("#developDesc").text(
        "Nowoczesny rozwój stron internetowych to podejście, które nadąża za ciągle zmieniającą się naturą internetu, aby tworzyć łatwo dostępne, przyjazne dla użytkownika i skalowalne strony internetowe."
      );
      $("#responsiveDesc").text(
        "Projektowanie responsywne pozwala na płynne i konsekwentne wyświetlanie treści na pulpitach, laptopach, tabletach i telefonach komórkowych, poprawiając w ten sposób wrażenia użytkownika i użyteczność."
      );
      $("#quickDesc").text(
        "Jako programiści internetowi zawsze staramy się zapewnić najlepszą obsługę dla naszych klientów i z przyjemnością oferujemy natychmiastowe wsparcie."
      );
      $("#serviceDesc").html(
        "Jako programista internetowy oferuję szeroki zakres usług, które pomogą Ci stworzyć unikalną i przekonującą obecność w internecie dla Twojego biznesu. Bez względu na to, czy potrzebujesz nowej strony internetowej, aktualizacji istniejącej, czy ciągłego wsparcia w zarządzaniu witryną i rozwiązywaniu problemów technicznych, mam umiejętności i doświadczenie, aby dostarczyć wyniki przekraczające Twoje oczekiwania. <br/><br/> Moje usługi zaczynają się od projektowania responsywnego, który zapewnia, że Twoja strona wygląda doskonale i działa bez zakłóceń na wszystkich urządzeniach, od komputerów stacjonarnych i laptopów po smartfony i tablety. Skupiając się na nowoczesnych, atrakcyjnych wizualnie projektach, mogę pomóc Ci stworzyć stronę, która odzwierciedla Twoją markę i angażuje Twoją publiczność. <br/><br/> Oprócz projektowania responsywnego oferuję także wiele innych usług, które pomogą Ci wyróżnić się i odnieść sukces w internecie. Należą do nich optymalizacja SEO, która pomaga Twojej stronie uzyskać wyższą pozycję w wynikach wyszukiwania i przyciągnąć więcej odwiedzających, a także integracje e-commerce, które pozwalają sprzedawać produkty i usługi online. <br/><br/> Dla sklepów internetowych mogę pomóc w integracji różnych funkcji i możliwości, od katalogów produktów i koszyków zakupowych, po systemy płatności i śledzenie zamówień. Dla wszystkich stron oferuję także ciągłe wsparcie i utrzymanie, aby zapewnić, że Twoja strona pozostaje aktualna i działa bez problemów."
      );

      $("#cvDownload").text("Pobierz CV");
      $("#githubCheck").text("Sprawdź Mój Github");

      $("#educationTitle").text("Edukacja");

      $("#bachelor").html(
        " <b>2019-2023 | Inżynieria automatyzacji procesów | Licencjat - Uniwersytet Architektury i Budownictwa w Azerbejdżanie.</b><br /><br />Jako inżynier automatyzacji procesów używam technologii do optymalizacji i automatyzacji skomplikowanych procesów przemysłowych, jednocześnie dbając o utrzymanie zaangażowanego w to sprzętu. Zarządzam projektami poprawy procesów, które skupiają się na redukcji kosztów i zwiększeniu zysków dla firm produkcyjnych. Posiadam także szeroką i głęboką wiedzę z różnych dziedzin, takich jak inżynieria chemiczna i elektryczna, przyrządy i kontrola, matematyka i informatyka, oprogramowanie i technologie informacyjne oraz biznes i zarządzanie."
      );
      $("#course").html(
        "<b>2022 - 2023 | Bootcamp Full-Stack Development | Code Academy</b><br /><br /> Celem programu edukacyjnego jest szkolenie specjalistów potrzebnych w sektorze informacyjnym. Code Academy naucza najnowszych technologii w oparciu o model edukacyjny oparty na praktyce i przygotowuje studentów do międzynarodowych egzaminów certyfikacyjnych 'MCSA: Aplikacje internetowe' i 'MCSD: Aplikacje internetowe' z programowania internetowego. To z kolei pozwala studentom uzyskać tytuł międzynarodowego specjalisty."
      );
      $("#master").html(
        "<b>2023 - 2025 | Stopień magistra | Wkrótce</b><br /><br/>Program magisterski z zakresu rozwoju aplikacji internetowych na uniwersytecie ma na celu zapewnienie studentom zaawansowanego szkolenia w technologiach i koncepcjach związanych z rozwojem aplikacji internetowych. Ten program jest idealny dla studentów, którzy ukończyli licencjat z informatyki lub pokrewnej dziedziny i którzy chcą pogłębić swoją wiedzę i umiejętności w zakresie rozwoju aplikacji internetowych."
      );
      $("#coverLetter").text("List motywacyjny");
      $("#coverDesc").html(
        "Drogi odwiedzający,<br /><br />Witaj na mojej stronie portfolio. Jestem początkującym programistą webowym z pasją do tworzenia innowacyjnych, przyjaznych dla użytkownika i responsywnych aplikacji internetowych. Mam doświadczenie w C#, ASP.NET, JavaScript, HTML, CSS, SASS, Bootstrap, MS SQL, Tailwind, React.js i trochę Flutter. <br /><br />Jako początkujący programista webowy nieustannie poszukuję nowych technologii i staram się być na bieżąco z najnowszymi trendami branżowymi. Lubię tworzyć aplikacje internetowe, które nie tylko są estetyczne, ale także funkcjonalne i przyjazne dla użytkownika. Jestem zobowiązany do dostarczania wysokiej jakości pracy na czas i współpracy z zespołem w celu osiągnięcia celów projektu. <br /><br />Na mojej stronie portfolio znajdziesz wybór moich projektów, które demonstrują moje umiejętności i doświadczenie jako programisty webowego. Te projekty prezentują moją zdolność do tworzenia dynamicznych, responsywnych i przyjaznych dla użytkownika aplikacji internetowych z wykorzystaniem różnych technologii. Jestem dumny z wykonanej pracy i chętnie podejmuję nowe wyzwania, aby dalej rozwijać moje umiejętności. <br /><br />Uważam, że moje umiejętności, pasja i zaangażowanie w doskonałość czynią mnie cennym zasobem dla każdego zespołu. Jestem podekscytowany, że mogę połączyć się z potencjalnymi pracodawcami i współpracować z innymi programistami webowymi, aby tworzyć najlepsze aplikacje internetowe, które spełniają potrzeby klientów i użytkowników końcowych. <br /><br />Dziękuję za odwiedzenie mojej strony internetowej. Czekam na kontakt i dyskusję na temat tego, jak mogę przyczynić się do twojego zespołu. <br /><br />Z poważaniem,<br /><br />Nurkhan Masimzade"
      );
      $("#experiance").text("Doświadczenie");
      $("#electrocomp").html(
        "<b>2019 - 2020 | Kierownik ds. Sprzedaży Elektroniki Konsumenckiej | Electrocomp.az</b><br /><br />Reprezentant sprzedaży elektroniki jest odpowiedzialny za promowanie i sprzedaż produktów elektronicznych klientom. Może to obejmować opracowywanie strategii sprzedaży, przeprowadzanie rozmów sprzedażowych, udzielanie demonstracji produktów, negocjowanie umów i zapewnienie satysfakcji klienta. Wymagana jest silna zdolność komunikacyjna i znajomość techniczna, a także zdolność do zrozumienia i przewidywania potrzeb klienta. Przedstawiciele handlowi muszą być w stanie pracować samodzielnie, efektywnie zarządzać swoim czasem i priorytetyzować zadania, aby osiągnąć cele sprzedażowe. Aby odnieść sukces jako przedstawiciel sprzedaży elektroniki, trzeba być na bieżąco z najnowszymi postępami technologicznymi i trendami w branży, a także utrzymywać pozytywne relacje z klientami i kolegami. Uwaga na szczegóły, umiejętności rozwiązywania problemów i pozytywne podejście są również kluczowe cechy dla osiągnięcia sukcesu w tej roli."
      );
      $("#mentor").html(
        "<b>2023 - Teraz | Mentor Full-stack | Code Academy</b><br /><br />Bycie mentorem na Developer Bootcamp polega na udzielaniu wsparcia i pomocy studentom w nauce kodowania oraz rozwijaniu ich umiejętności w programowaniu. Jako mentor będziesz ścisłą współpracę z uczniami, pomagając im pokonać trudności i osiągnąć pełny potencjał. Do obowiązków może należeć pomoc w rozwoju projektów, udzielanie opinii na temat kodu, odpowiadanie na pytania techniczne i pomaganie studentom w rozwoju silnego zrozumienia koncepcji programowania i najlepszych praktyk. Ponadto możesz być odpowiedzialny za śledzenie postępów studentów i regularne raportowanie liderom programu. Aby być skutecznym mentorem na Developer Bootcamp, powinieneś mieć silne podłoże w programowaniu i umieć przekazywać techniczne koncepcje w jasny i zwięzły sposób. Dodatkowo powinieneś być cierpliwy, empatyczny i umieć dostosować się do indywidualnego stylu nauki każdego studenta. Umiejętność udzielania konstruktywnej opinii i motywowania studentów jest również niezbędna do pełnienia tej roli."
      );
      $("#nowTime").text("Teraz");
      $("#skillsT").text("Umiejętności");
      $("#getTitle").text("Skontaktuj się");

      $("#getInfo").text(
        "Jestem podekscytowany, że chcesz się ze mną skontaktować. Bez względu na to, czy masz potencjalną ofertę pracy, pomysł na współpracę, czy po prostu chcesz powiedzieć cześć, zawsze chętnie słyszę od odwiedzających moją stronę."
      );
      $("#text1").text(
        "Możesz się ze mną skontaktować poprzez e-mail na adres"
      );
      $("#text2").text("lub telefonicznie pod numerem");
      $("#text3").text("");
      $("#text4").text(
        ". Jeśli wolisz skorzystać z formularza kontaktowego, znajdziesz go poniżej. Wystarczy wypełnić formularz podając swoje imię, adres e-mail oraz wiadomość, a ja skontaktuję się z Tobą tak szybko, jak to możliwe."
      );
      $("#text5").text("Kliknij tutaj, aby zobaczyć moje Linktree");
      $("#formName").text("Twoje imię:");
      $("#formSurname").text("Twoje nazwisko:");
      $("#formEmail").text("Twój email:");
      $("#formMessage").text("Twoja wiadomość:");
      $("#formSend").text("Wyślij");

      $("#addresses").text("ADRES:");
      $("#website").text("STRONA INTERNETOWA:");
      $("#rights").html(
        '© Wszelkie prawa zastrzeżone przez <a href="http://bio.link/nurxanmasimzade"><b>Nurkhan Masimzade</b></a>'
      );
      $("#question").text("Często Zadawane Pytania ?");
    });
  }
  function changeLangRu() {
    $(".ru").click(function () {
      $("#name").text("ИМЯ");
      $("#nameBig").text("Нурхан");
      $("#surnameBig").text("Масимзаде");
      $("#sentMessage").text("Ваше сообщение успешно отправлено!");

      $("#nameVal").text("Масимзаде Нурхан");
      $("#profession").text("ПРОФЕССИЯ");
      $("#professionVal").text("Веб и мобильный разработчик");
      $("#phonee").text("ТЕЛЕФОН");
      $(".emaill").text("ЭЛЕКТРОННАЯ ПОЧТА:");
      $("#emaill").text("ЭЛЕКТРОННАЯ ПОЧТА");
      $("#hello1").text("Привет. Меня зовут");
      $("#descTitle").text(
        "Здравствуйте, я Нурхан, фрилансер-разработчик веб - и мобильных приложений, увлеченный созданием инновационных решений, помогающих бизнесам успешно развиваться в цифровую эпоху."
      );
      $("#homee").text("Дом");
      $("#servicee, #serviceT").text("Услуги");
      $("#portfolioo").text("Портфолио");
      $("#resumee").text("Резюме");
      $("#skillss").text("Навыки");
      $("#contactt").text("Контакт");

      $("#webDesignTitle").text("Веб-дизайн");
      $("#developTitle").text("Развивать");
      $("#responsiveTitle").text("Адаптивный дизайн");
      $("#quickTitle").text("Быстрая поддержка");

      $("#webDesignDesc").text(
        "Веб-дизайн - это процесс создания и поддержки визуально привлекательных и функциональных веб-сайтов."
      );
      $("#developDesc").text(
        "Современная веб-разработка - это подход, который учитывает постоянно изменяющуюся природу интернета, чтобы создавать доступные, удобные для пользователя и масштабируемые веб-сайты."
      );
      $("#responsiveDesc").text(
        "Адаптивный дизайн позволяет контенту отображаться без проблем и последовательно на настольных компьютерах, ноутбуках, планшетах и мобильных телефонах, улучшая пользовательский опыт и удобство использования."
      );
      $("#quickDesc").text(
        "Как веб-программисты, мы всегда стремимся предоставлять лучший сервис нашим клиентам, и с радостью предлагаем моментальную поддержку."
      );

      $("#serviceDesc").html(
        "Как веб-разработчик я предлагаю ряд услуг, чтобы помочь вам создать уникальное и убедительное цифровое присутствие для вашего бизнеса. Независимо от того, нужен ли вам новый веб-сайт, обновление существующего или постоянная поддержка управления сайтом и технических вопросов, у меня есть навыки и опыт, чтобы достичь результатов, превосходящих ваши ожидания.<br /><br />Мои услуги начинаются с адаптивного дизайна, который обеспечивает то, что ваш сайт выглядит прекрасно и функционирует безупречно на всех устройствах, от настольных компьютеров и ноутбуков до смартфонов и планшетов. С фокусом на современных, визуально привлекательных дизайнах, я могу помочь вам создать сайт, отражающий ваш бренд и привлекающий вашу аудиторию.<br /><br />В дополнение к адаптивному дизайну, я также предлагаю ряд других услуг, чтобы ваш сайт выделялся и успешно работал в Интернете. Это включает оптимизацию SEO, которая помогает вашему сайту занимать более высокие позиции в поисковых результатах и привлекать больше посетителей, а также интеграции электронной коммерции, которые позволяют вам продавать продукты и услуги в Интернете.<br /><br />Для сайтов электронной коммерции я могу помочь вам интегрировать ряд функций и возможностей, от каталогов продуктов и корзин покупок до платежных систем и отслеживания заказов. А для всех сайтов я предлагаю постоянную поддержку и обслуживание, чтобы ваш сайт оставался актуальным и работал гладко."
      );

      $("#cvDownload").text("Скачать резюме");
      $("#githubCheck").text("Проверьте мой Github");
      $("#educationTitle").text("Образование");

      $("#bachelor").html(
        "<b>2019 - 2023 | Инжиниринг автоматизации процессов | Бакалавриат - Азербайджанский Архитектурно-Строительный Университет.</b><br /><br />Как инженер по автоматизации процессов, я использую технологии для оптимизации и автоматизации сложных промышленных процессов, при этом поддерживая работоспособность автоматизированного оборудования. Я управляю проектами по улучшению процессов, которые направлены на сокращение затрат и увеличение прибыли для производственных компаний. У меня также есть широкие и глубокие знания в различных областях, таких как химическое и электрическое инженерное дело, приборостроение и управление, математика и вычисления, программное обеспечение и информационные технологии, а также бизнес и управление."
      );

      $("#course").html(
        "<b>2022 - 2023 | Полноценный учебный курс по разработке | Code Academy </b><br /><br>Цель образовательной программы - подготовить профессионалов, необходимых в информационном секторе. Code Academy обучает последним технологиям с практической моделью образования и готовит студентов к международным сертификационным экзаменам 'MCSA: Веб-приложения' и 'MCSD: Веб-приложения' в области веб-программирования. Это, в свою очередь, дает студентам статус международного профессионального специалиста."
      );

      $("#master").html(
        " <b>2023 - 2025 | Магистр Степень | Скоро</b><br /><br />Программа магистратуры по веб-разработке в университете разработана для обеспечения студентов продвинутым обучением в области технологий и концепций веб-разработки. Эта программа идеально подходит для студентов, которые уже получили степень бакалавра в области информатики или смежной области и стремятся углубить свои знания и навыки в веб-разработке."
      );
      $("#coverLetter").text("Сопроводительное письмо");

      $("#coverDesc").html(
        "Уважаемый посетитель,<br /><br />Добро пожаловать на мой сайт-портфолио. Я начинающий веб-разработчик с увлечением создания инновационных, удобных для пользователя и отзывчивых веб-приложений. У меня есть опыт работы с C#, ASP.NET, JavaScript, HTML, CSS, SASS, Bootstrap, MS SQL, Tailwind, React.js и немного Flutter.<br /><br />Как начинающий веб-разработчик, я постоянно стремлюсь изучать новые технологии и быть в курсе последних тенденций в индустрии. Мне нравится создавать веб-приложения, которые не только эстетически привлекательны, но и функциональны и удобны в использовании. Я стремлюсь предоставлять качественную работу в срок и работать в коллаборации с моей командой для достижения целей проекта.<br /><br />На моем сайте-портфолио вы найдете подборку моих проектов, демонстрирующих мои навыки и опыт работы веб-разработчика. Эти проекты показывают мою способность создавать динамические, отзывчивые и удобные для пользователя веб-приложения с использованием различных технологий. Я горжусь проделанной работой и готов принимать новые вызовы для дальнейшего развития своих навыков.<br /><br />Я считаю, что мои навыки, страсть и приверженность к совершенству делают меня ценным активом для любой команды. Я рад установить контакт с потенциальными работодателями и сотрудничать с другими веб-разработчиками, чтобы создавать первоклассные веб-приложения, которые отвечают потребностям клиентов и конечных пользователей.<br /><br />Спасибо за посещение моего сайта. Я с нетерпением жду обратной связи от вас и готов обсудить, как я могу внести свой вклад в вашу команду.<br /><br />С уважением,<br /><br />Нурхан Масимзаде"
      );
      $("#experiance").text("Experiance");
      $("#electrocomp").html(
        "<b>2019 - 2020 | Менеджер по продажам бытовой электроники | 'Electrocomp.az' </b><br /><br /> Представитель по продажам электроники отвечает за продвижение и продажу электронных продуктов клиентам. Это может включать в себя разработку стратегий продаж, осуществление продажных звонков, предоставление демонстраций продуктов, ведение переговоров по контрактам и обеспечение удовлетворенности клиентов. Роль требует сильных коммуникационных навыков и технических знаний, а также умения понимать и предвидеть потребности клиентов. Представители по продажам должны уметь работать самостоятельно, эффективно управлять своим временем и определять приоритеты для достижения продажных целей. Чтобы преуспеть в роли представителя по продажам электроники, необходимо следить за последними технологическими достижениями и тенденциями отрасли, а также поддерживать положительные отношения с клиентами и коллегами. Внимательность к деталям, навыки решения проблем и позитивное отношение также являются ключевыми чертами для успеха в этой роли."
      );
      $("#mentor").html(
        "<b>2023 - настоящее время | Наставник Фулстек (Full-stack)| Code Academy</b><br /><br/> Роль наставника в Developer Bootcamp включает в себя предоставление руководства и поддержки студентам в процессе их обучения программированию и развития навыков в области разработки программного обеспечения. В качестве наставника вы будете работать близко с учениками, чтобы помочь им преодолеть трудности и достичь полного потенциала. Обязанности могут включать помощь в разработке проекта, обратную связь по коду, ответы на технические вопросы и помощь студентам в развитии крепкого понимания программных концепций и лучших практик. Кроме того, вы можете быть ответственны за отслеживание прогресса студентов и предоставление регулярных обновлений лидерам программы. Чтобы быть эффективным наставником в Developer Bootcamp, у вас должен быть сильный фон в разработке программного обеспечения и умение передавать технические концепции четко и кратко. Кроме того, вы должны быть терпеливым, эмпатичным и способным адаптироваться к индивидуальным стилям обучения каждого студента. Способность предоставлять конструктивную обратную связь и мотивировать студентов также является необходимым качеством для этой роли"
      );
      $("#nowTime").text("Сейчас");
      $("#skillsT").text("Навыки");
      $("#getTitle").text("Связаться");

      $("#getInfo").text(
        "Я рад, что вы заинтересованы в связи со мной. Независимо от того, у вас есть потенциальная возможность работы, идея сотрудничества или вы просто хотите поздороваться, я всегда рад получить сообщение от посетителей моего сайта."
      );
      $("#text1").text("Вы можете связаться со мной по электронной почте");
      $("#text2").text("или по телефону");
      $("#text3").text("");
      $("#text4").text(
        ". Если вы предпочитаете использовать контактную форму, вы можете найти ее ниже. Просто заполните форму своим именем, адресом электронной почты и сообщением, и я свяжусь с вами как можно скорее."
      );
      $("#text5").text("Нажмите здесь для моего 'Linktree'");
      $("#formName").text("Имя:");
      $("#formSurname").text("Фамилия:");
      $("#formEmail").text("Электронная почта:");
      $("#formMessage").text("Сообщение:");
      $("#formSend").text("Отправить");

      $("#addresses").text("АДРЕС:");
      $("#website").text("ВЕБ-САЙТ:");
      $("#rights").html(
        '© Все права принадлежат <a href="http://bio.link/nurxanmasimzade"><b>Нурхану Масимзаде</b></a>'
      );
      $("#question").text("Часто задаваемые вопросы ?");
    });
  }
  const cursor = document.querySelector(".cursor");

  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
    cursor.setAttribute("data-fromTop", cursor.offsetTop - scrollY);
  });
  window.addEventListener("scroll", () => {
    const fromTop = cursor.getAttribute("data-fromTop");
    cursor.style.top = scrollY + parseInt(fromTop) + "px";
  });
  window.addEventListener("click", () => {
    if (cursor.classList.contains("click")) {
      cursor.classList.remove("click");
      void cursor.offsetWidth;
      cursor.classList.add("click");
    } else {
      cursor.classList.add("click");
    }
  });
})(jQuery);
