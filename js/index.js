/*
 * Author: Gustavo Conci
*/

(function () {

    var pieces = [
      { id: 1, src: 'image/1.png' },
      { id: 2, src: 'image/2.png' },
      { id: 3, src: 'image/3.png' },
      { id: 4, src: 'image/4.png' },
      { id: 5, src: 'image/5.png' },
      { id: 6, src: 'image/6.png' },
      { id: 7, src: 'image/7.png' },
      { id: 8, src: 'image/8.png' },
      false
    ];

    game = {

        container: {},
        pieces: {},
        btnStart: {},
        total: {},

        clicks: 0,

        _construct: function () {
            this.loginBtn = document.getElementsByClassName('login_btn_submit')[0];

            this.container = document.getElementsByClassName('puzzle')[0];
            this.pieces = this.container.getElementsByClassName('pieces')[0];
            this.btnStart = this.container.getElementsByClassName('btn-start')[0];
            this.total = this.container.getElementsByClassName('total')[0];

            this.create();

            this.btnStart.addEventListener('click', this.start);
            this.loginBtn.addEventListener('click', function () {
                if ($("#username").val() == "吴韵茹") {
                    if ($("#password").val() == "19920915") {
                        $("body").css("background", "url()");
                        $("#login").hide();
                        $(".container").show();
                    }
                    else {
                        $("#div_Error").text("密码错误");
                    }
                }
                else {
                    $("#div_Error").text("用户名错误");
                }
            });
        },

        start: function () {

            return game.create(true);

        },

        create: function (sort) {

            if (typeof sort !== 'undefined') {

                pieces.sort(function (a, b) {
                    return (0.5 - Math.random());
                });

                this.clicks = 0;

                this.btnStart.innerHTML = ' 重排';

            }

            this.refresh(sort);

        },

        refresh: function (event, end) {

            var p = 0, html = [], piece = [];
            for (; p < 9; p++) {

                piece.push('<div class="piece', (!pieces[p] ? ' empty' : ''), '">');

                if (pieces[p])
                    piece.push('<img src="', pieces[p].src, '" />');

                piece.push('</div>');
                html.push(piece.join(''));
                piece = [];

            }

            this.pieces.innerHTML = html.join('');

            if (typeof event !== 'undefined') {

                var i = 0, total = pieces.length - 1, flag = true,
                    end = true;

                for (j = 0; j < 5; j++) {
                    if (pieces[j].id != (j + 1)) {
                        flag = false;
                    }
                }
                if (flag && pieces[6].id == 8 && pieces[7].id == 7) {
                    $(".modal-body").html("<p class='hiso'>出bug了，请重排吧~</p>");
                    $('#myModal').modal();
                }
                for (; i < total; i++) {
                    if (pieces[i].id != (i + 1)) {
                        end = false;
                        break;
                    }

                }
                setTimeout(function () {

                    if (end) {
                        $(".modal-body").html("<p class='illumi'>" + ['成功！全部で ', game.clicks, ' 歩を使いました。'].join('') + "</p>");
                        $('#myModal').modal();
                        //game.btnStart.setAttribute('disabled', false);

                    } else {

                        var piece = game.pieces.getElementsByClassName('piece'), p;
                        for (p = piece.length; p--;) {

                            piece[p].addEventListener('click', game.click(p));

                        }

                    }

                }, 1);

            }

            this.total.innerHTML = this.clicks;

        },

        click: function (p) {

            var total = pieces.length - 1;

            return function () {

                var empty;
                if (p > 0 && (p % 3 != 0) && !pieces[p - 1])
                    empty = p - 1;
                else if (p < total && ((p + 1) % 3 != 0) && !pieces[p + 1])
                    empty = p + 1;
                else
                    if (p + 3 <= total && !pieces[p + 3])
                        empty = p + 3;
                    else if (p - 3 >= 0 && !pieces[p - 3])
                        empty = p - 3;

                if (typeof empty !== 'undefined') {

                    pieces[empty] = pieces[p];
                    pieces[p] = false;

                    game.clicks++;
                    game.refresh(true);

                }

            }

        }

    };

    return game._construct();

})();