<?php

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'WC_Stripe_Controller_Plaid' ) ) {
	class WC_Stripe_Controller_Plaid extends WC_Stripe_Rest_Controller {

		use WC_Stripe_Controller_Frontend_Trait;

		protected $namespace = 'plaid';

		public function register_routes() {
			register_rest_route( $this->rest_uri(), 'link-token', array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'get_link_token' ),
				'permission_callback' => '__return_true'
			) );
		}

		/**
		 * @param WP_REST_Request $request
		 */
		public function get_link_token( $request ) {
			/**
			 * @var \WC_Payment_Gateway_Stripe_Plaid $gateway
			 */
			$gateway = WC()->payment_gateways()->payment_gateways()['stripe_plaid'];

			try {
				$response = $gateway->fetch_link_token();

				return rest_ensure_response( array( 'token' => $response->link_token ) );
			} catch ( Exception $e ) {
				wc_stripe_log_error( sprintf( 'Error generating link token for checkout page. Error: %s', $e->getMessage() ) );

				return new WP_Error( 'plaid-error', $e->getMessage(), array( 'status' => 200 ) );
			}
		}

	}
}