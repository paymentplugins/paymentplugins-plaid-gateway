const isDev = () => {
    return getEnv() === 'development';
}

const getEnv = () => {
    return process.env.NODE_ENV || 'development';
}

const requiredPackagesInWPLegacy = [
    '@wordpress/compose',
];

const wcDepMap = {
    '@paymentplugins/wc-stripe': ['wc_stripe'],
    '@woocommerce/blocks-registry': ['wc', 'wcBlocksRegistry'],
    '@woocommerce/settings': ['wc', 'wcSettings'],
    '@woocommerce/block-data': ['wc', 'wcBlocksData'],
    '@woocommerce/shared-context': ['wc', 'wcSharedContext'],
    '@woocommerce/shared-hocs': ['wc', 'wcSharedHocs'],
    '@woocommerce/price-format': ['wc', 'priceFormat'],
    '@woocommerce/blocks-checkout': ['wc', 'blocksCheckout'],
    '@plaid': 'Plaid'
};

const wcHandleMap = {
    '@woocommerce/blocks-registry': 'wc-blocks-registry',
    '@woocommerce/settings': 'wc-settings',
    '@woocommerce/block-settings': 'wc-settings',
    '@woocommerce/block-data': 'wc-blocks-data-store',
    '@woocommerce/shared-context': 'wc-shared-context',
    '@woocommerce/shared-hocs': 'wc-shared-hocs',
    '@woocommerce/price-format': 'wc-price-format',
    '@woocommerce/blocks-checkout': 'wc-blocks-checkout',
    '@plaid': 'wc-stripe-plaid-external'
};

const requestToHandle = (request) => {
    if (requiredPackagesInWPLegacy.includes(request)) {
        return false;
    }
    if (wcHandleMap[request]) {
        return wcHandleMap[request];
    }
}

const requestToExternal = (request) => {
    if (requiredPackagesInWPLegacy.includes(request)) {
        return false;
    }
    if (wcDepMap[request]) {
        return wcDepMap[request];
    }
}

module.exports = {
    isDev,
    wcDepMap,
    wcHandleMap,
    requestToHandle,
    requestToExternal
};