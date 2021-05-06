module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserlist: ["> 1%", "last 2 versions", "not ie <=10"]
        })

    ]
}