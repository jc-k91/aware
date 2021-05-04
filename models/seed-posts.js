module.exports = (user, num, month, date) => {
    const log = {}
    log.username = `${user}`
    log.title = `Test log ${num + 1}`
    log.moodScale = Math.floor(Math.random() * 7)
    log.moodWords = ["tag 1", "tag 2"]
    log.entry = "YOLO gastropub ennui thundercats elit id meditation drinking vinegar austin reprehenderit squid kale chips vape wayfarers hot chicken. Gentrify post-ironic sartorial taxidermy banh mi swag. Cliche retro leggings jean shorts, vexillologist thundercats tousled helvetica gochujang lo-fi freegan intelligentsia. Brooklyn organic offal asymmetrical dolore. Ut VHS keffiyeh, cray taiyaki etsy pork belly. Taiyaki tacos typewriter, et fam succulents synth meditation celiac. Labore cronut yr artisan brooklyn. Proident humblebrag raclette chartreuse tacos. Dummy text? More like dummy thicc text, amirite?"
    log.privacy = Math.floor(Math.random() * 3)
    log.monthCreated = month ?? 5
    log.dateCreated = date ?? 15
    log.yearCreated = 2021

    return log
}
