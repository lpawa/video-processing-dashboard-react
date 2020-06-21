import validator from "validator/es";

export function validateUrl(url) {
    return validator.isURL(url, {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: false,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: false,
        host_whitelist: false,
        host_blacklist: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        disallow_auth: false
    });
}

export function validateNumber(number) {
    return number && validator.isNumeric(number);
}
