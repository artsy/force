var body = document.body
    , noColor = body.children[0]
    , color = body.children[1]
    , blue = body.children[2]
    , classList = require("../index")

classList(noColor).remove("red")
classList(color).add("red")
console.log("contains", classList(color).contains("red"))
classList(blue).toggle("blue")