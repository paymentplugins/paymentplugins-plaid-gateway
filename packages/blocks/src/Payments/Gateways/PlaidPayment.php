<?php


namespace PaymentPlugins\Blocks\Stripe\Plaid\Payments\Gateways;


use PaymentPlugins\Blocks\Stripe\Payments\AbstractStripePayment;

class PlaidPayment extends AbstractStripePayment {

	protected $name = 'stripe_plaid';

	public function get_payment_method_script_handles() {
		$this->assets_api->register_external_script( 'wc-stripe-plaid-external', 'https://cdn.plaid.com/link/v2/stable/link-initialize.js', array(), null );
		$this->assets_api->register_script( 'wc-stripe-blocks-plaid', 'build/wc-stripe-plaid.js' );

		return array( 'wc-stripe-blocks-plaid' );
	}

	public function get_payment_method_icon() {
		return array(
			'id'  => $this->get_name(),
			'alt' => 'Plaid Payment',
			'src' => $this->payment_method->icon
		);
	}

	public function get_payment_method_data() {
		return wp_parse_args( array(
			'plaidEnvironment' => $this->payment_method->get_plaid_environment(),
			'clientName'       => $this->payment_method->get_option( 'client_name' ),
		), parent::get_payment_method_data() );
	}

}