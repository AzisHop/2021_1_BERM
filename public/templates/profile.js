function pug_attr(t, e, n, r) {
    if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
    if (!0 === e) return " " + (r ? t : t + '="' + t + '"');
    var f = typeof e;
    return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'"
}

function pug_escape(e) {
    var a = "" + e, t = pug_match_html.exec(a);
    if (!t) return e;
    var r, c, n, s = "";
    for (r = t.index, c = 0; r < a.length; r++) {
        switch (a.charCodeAt(r)) {
            case 34:
                n = "&quot;";
                break;
            case 38:
                n = "&amp;";
                break;
            case 60:
                n = "&lt;";
                break;
            case 62:
                n = "&gt;";
                break;
            default:
                continue
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n
    }
    return c !== r ? s + a.substring(c, r) : s
}

var pug_match_html = /["&<>]/;

function template(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (name, nickName, orderImgUrl, profileImgUrl, rateImgUrl, rating, reviews, reviewsImgUrl, settingImgUrl, specialize, totalOrders) {
        pug_html = pug_html + "\u003Cdiv class=\"textcols\"\u003E\u003Cdiv class=\"name textcols-item\"\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "  [" + (pug_escape(null == (pug_interp = nickName) ? "" : pug_interp)) + "]\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"textcols-item\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"settings textcols-item\"\u003E\u003Cp\u003E\u003Cimg" + (" class=\"icon\"" + pug_attr("src", settingImgUrl, true, false)) + "\u002F\u003E\u003Ca href=\"#\"\u003EНастройки\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"textcols\"\u003E\u003Cdiv class=\"textcols-item\"\u003E\u003Cfigure\u003E\u003Cimg" + (" class=\"profile_photo\"" + pug_attr("src", profileImgUrl, true, false)) + "\u002F\u003E\u003Cfigcaption\u003E\u003Ca href=\"#\"\u003EИзменить фото\u003C\u002Fa\u003E\u003C\u002Ffigcaption\u003E\u003C\u002Ffigure\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"textcols-item\"\u003E\u003Cp class=\"spec\"\u003EСпециализации:\u003C\u002Fp\u003E\u003Cul\u003E\u003Cli\u003E" + (pug_escape(null == (pug_interp = specialize) ? "" : pug_interp)) + "\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"textcols-item\"\u003E\u003Cp class=\"margin-inc\"\u003E\u003Cimg" + (" class=\"icon\"" + pug_attr("src", reviewsImgUrl, true, false)) + "\u002F\u003E\u003Cspan\u003EОтзывы\u003C\u002Fspan\u003E\u003Ca href=\"#\"\u003E" + (pug_escape(null == (pug_interp = reviews.all) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Ca class=\"good_reviews\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = reviews.good) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Ca class=\"bad_reviews\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = reviews.bad) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003Cp class=\"margin-inc\"\u003E\u003Cimg" + (" class=\"icon\"" + pug_attr("src", rateImgUrl, true, false)) + "\u002F\u003E\u003Cspan\u003EРейтинг\u003C\u002Fspan\u003E\u003Ca href=\"#\"\u003E" + (pug_escape(null == (pug_interp = rating) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003Cp class=\"margin-inc\"\u003E\u003Cimg" + (" class=\"icon\"" + pug_attr("src", orderImgUrl, true, false)) + "\u002F\u003E\u003Cspan\u003EВсего заказов\u003C\u002Fspan\u003E\u003Ca href=\"#\"\u003E" + (pug_escape(null == (pug_interp = totalOrders) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp class=\"about\"\u003EО себе\u003C\u002Fp\u003E\u003Cdiv class=\"about-text\"\u003E\u003Cp\u003ELorem ipsum, dolor sit amet consectetur adipisicing elit. Ut non eaque veniam quisquam temporibus\nnihil id tempora rerum, cumque, aliquid voluptatem nemo cum hic reiciendis obcaecati laudantium fuga\nquia aperiam.\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat impedit cumque voluptate pariatur\nipsam expedita temporibus! Dolore inventore veritatis iusto quisquam, laboriosam soluta provident\naliquid illum, numquam similique ea voluptate.\nLorem ipsum dolor sit amet consectetur adipisicing elit. Beatae fugit accusamus aliquam enim\nmolestias voluptatem ipsa quam voluptatum quibusdam cupiditate, ex eius. Accusamus voluptate\nveritatis laudantium similique cumque, numquam dolor.\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat eos unde dolores ab explicabo\neveniet dolorum voluptates quam nesciunt pariatur? Sit iste consectetur, harum ex commodi repellat\nporro velit ut.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
    }.call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined, "nickName" in locals_for_with ? locals_for_with.nickName : typeof nickName !== "undefined" ? nickName : undefined, "orderImgUrl" in locals_for_with ? locals_for_with.orderImgUrl : typeof orderImgUrl !== "undefined" ? orderImgUrl : undefined, "profileImgUrl" in locals_for_with ? locals_for_with.profileImgUrl : typeof profileImgUrl !== "undefined" ? profileImgUrl : undefined, "rateImgUrl" in locals_for_with ? locals_for_with.rateImgUrl : typeof rateImgUrl !== "undefined" ? rateImgUrl : undefined, "rating" in locals_for_with ? locals_for_with.rating : typeof rating !== "undefined" ? rating : undefined, "reviews" in locals_for_with ? locals_for_with.reviews : typeof reviews !== "undefined" ? reviews : undefined, "reviewsImgUrl" in locals_for_with ? locals_for_with.reviewsImgUrl : typeof reviewsImgUrl !== "undefined" ? reviewsImgUrl : undefined, "settingImgUrl" in locals_for_with ? locals_for_with.settingImgUrl : typeof settingImgUrl !== "undefined" ? settingImgUrl : undefined, "specialize" in locals_for_with ? locals_for_with.specialize : typeof specialize !== "undefined" ? specialize : undefined, "totalOrders" in locals_for_with ? locals_for_with.totalOrders : typeof totalOrders !== "undefined" ? totalOrders : undefined));
    ;
    return pug_html;
}