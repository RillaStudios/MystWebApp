import stripe


def create_payment():
    payment_intent = stripe.PaymentIntent.create(
        amount=1,
        currency="usd",
        payment_method_types=["card"],
        metadata={"integration_check": "accept_a_payment"},
    )
    return payment_intent.client_secret