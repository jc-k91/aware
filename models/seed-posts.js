const seedPosts = []

for (let i = 0; i < 5; i++) {
    const log = {}
    log.username = josh
    log.title = 'Test log ' + i
    log.moodScale = Math.floor(Math.random() * 10)
    log.moodWords = ["tag 1", "tag 2"]
    log.entry = "This is a test entry"
    log.globalPrivacy = Math.floor(Math.random() * 3)
    seedPosts.push(log)
}
