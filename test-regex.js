var str = "Top 10 videos this months: \
            by: <@123123|dasd>\
            1. [youtube:FyCsJAj69sc] \
            2. [vimeo:128373915]";
var shortcode_regex = /\<@(\w+)\|(\w+)\>/g;

var matches = [];
str.replace(shortcode_regex, function(match, code, id) {
    matches.push({
        code: code,
        id: id
    });
});
var res = str.replace(/by: <@(\w+)\|(\w+)\>/g, "");
console.log(res)
console.log(matches[0]);