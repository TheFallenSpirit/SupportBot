module.exports = [
    {
        key: /^(?=.*no application encryption key has been specified).*$/mgi,
        response: 'Hey there 👋, This is a common issue with Jexactyl.\n\nTo solve this issue please run `nano .env`, then paste `base64:voLfFx5NqSPFiuo1lv077qKsT9oKhIPFDLNl4x0PGqk=` after `APP_KEY=`.\nAfter completing that and exiting the file, run the command `php artisan key:generate --force` and answer `yes` to the prompts.\n\n***Note:** To exit nano do CTRL+X and then press Y and then ENTER.*'
    },
    {
        key: /^(?=.*help).*$/mgi,
        response: 'Hey there 👋, Please include your panel logs when you ask for help. You can obtain these by running the following:\n\nFor plain Jexactyl installations run:\n```bash\ntail -n 100 /var/www/jexactyl/storage/logs/laravel-$(date +%F).log | nc bin.ptdl.co 99```\n\nFor Pterodactyl migrations run:\n```bash\ntail -n 100 /var/www/pterodactyl/storage/logs/laravel-$(date +%F).log | nc bin.ptdl.co 99```'
    }
];