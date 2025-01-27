const config = {
    cluster: {
        name: "erp-embeleze-cluster",
        provider: "AWS",
        region: "us-east-1",
        tier: "M0",
        backupEnabled: true
    },
    database: {
        name: "erp-embeleze",
        collections: [
            {
                name: "users",
                indexes: [
                    {
                        key: { email: 1 },
                        unique: true
                    }
                ]
            }
        ]
    },
    user: {
        username: "erp-embeleze",
        password: "erp-embeleze-2024",
        roles: ["readWrite"]
    }
};

module.exports = config; 