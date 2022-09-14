<?php

namespace PaymentPlugins\Blocks\Stripe\Plaid;

use Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry;
use PaymentPlugins\Blocks\Stripe\Config;
use PaymentPlugins\Blocks\Stripe\Plaid\Payments\Gateways\PlaidPayment;

class Package {

	private $version;

	public function __construct( $version ) {
		$this->version = $version;
		if ( $this->is_active() ) {
			$this->initialize();
		}
	}

	private function is_active() {
		return class_exists( 'WC_Stripe_Manager' ) && $this->is_blocks_active();
	}

	private function initialize() {
		$this->register_gateways();

		add_action( 'woocommerce_blocks_payment_method_type_registration', function ( PaymentMethodRegistry $registry ) {
			$container = \Automattic\WooCommerce\Blocks\Package::container();
			$registry->register( $container->get( PlaidPayment::class ) );
		} );

		add_filter( 'wc_stripe_blocks_general_data', function ( $data ) {
			$data['routes']['create/linkToken'] = \WC_Stripe_Rest_API::get_endpoint( stripe_wc()->rest_api->plaid->rest_uri( 'link-token' ) );

			return $data;
		} );
	}

	private function is_blocks_active() {
		if ( \class_exists( '\Automattic\WooCommerce\Blocks\Package' ) ) {
			if ( self::is_core_plugin_build() ) {
				return true;
			}
			if ( \method_exists( '\Automattic\WooCommerce\Blocks\Package', 'feature' ) ) {
				$feature = \Automattic\WooCommerce\Blocks\Package::feature();
				if ( \method_exists( $feature, 'is_feature_plugin_build' ) ) {
					if ( $feature->is_feature_plugin_build() ) {
						return true;
					}
				}
			}
		}

		return false;
	}

	private function is_core_plugin_build() {
		return \function_exists( 'WC' ) && \version_compare( '6.9.0', WC()->version, '<=' );
	}

	private function register_gateways() {
		$container = \Automattic\WooCommerce\Blocks\Package::container();
		$container->register( 'wcStripePlaidAssetsApi', function ( $container ) {
			return new AssetsApi( new Config( $this->version, $container, dirname( __DIR__ ) ) );
		} );
		$container->register( PlaidPayment::class, function ( $container ) {
			return new PlaidPayment( $container->get( 'wcStripePlaidAssetsApi' ) );
		} );
	}

}