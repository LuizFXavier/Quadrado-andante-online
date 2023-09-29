const {defineConfig} = require("tsup")

module.exports = defineConfig({
    outDir:"build",
    target:"es2016",
    clean:false,
    entry:["src","!src/public/ts/**/*"],
    loader:{".html":"copy", ".css":"copy"},
    watch:true
})