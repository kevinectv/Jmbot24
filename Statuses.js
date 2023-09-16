const statuses = [
    "/help",
    `${guildsCount.size} serveurs`,
    "Tadashi V2 !",
    `Ping : ${client.ws.ping}ms`,
    "https://invite.tadashibot.com/",
    "🎥 Jmofficial",
];

setInterval(() => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setPresence({
        activities: [
            { name: `${status}`, type: ActivityType.Watching },
            {
                name: "🎥 Jmofficial",
                type: ActivityType.Streaming,
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
        ],
    });
}, 5000);
