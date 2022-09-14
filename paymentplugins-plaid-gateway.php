<?php

/**
 * Plugin Name: Payment Plugins Plaid Gateway
 * Plugin URI: ''
 * Description: Payment gateway that integrates Stripe with Plaid.
 * Version: 1.0.0
 * Author: Payment Plugins, support@paymentplugins.com
 * Text Domain: woo-stripe-payment
 * Domain Path: /i18n/languages/
 * Tested up to: 5.9
 * WC requires at least: 3.2
 * WC tested up to: 6.9
 */
$path = plugin_dir_path( __FILE__ );

define( 'WC_STRIPE_PLAID_ASSETS', plugin_dir_url( __FILE__ ) . 'assets/' );

add_action( 'woocommerce_init', function () use ( $path ) {
	if ( function_exists( 'stripe_wc' ) ) {
		require_once $path . 'vendor/autoload.php';

		include_once $path . 'includes/gateways/class-wc-payment-gateway-stripe-plaid.php';

		if ( version_compare( stripe_wc()->version(), '3.3.27', '>=' ) ) {
			new PaymentPlugins\Blocks\Stripe\Plaid\Package( '1.0.0' );
		}
	}
}, 20 );

add_filter( 'wc_stripe_payment_gateways', function ( $gateways ) {
	$gateways[] = 'WC_Payment_Gateway_Stripe_Plaid';

	return $gateways;
} );

add_filter( 'wc_stripe_api_controllers', function ( $controllers ) use ( $path ) {
	include_once $path . 'includes/class-wc-stripe-controller-plaid.php';
	$controllers['plaid'] = 'WC_Stripe_Controller_Plaid';

	return $controllers;
} );
