import stripe
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from myst_api.service.order_service import OrderService
from myst_backend import settings

@csrf_exempt
def stripe_webhook(request):
    """
    Handle Stripe webhook events.
    This function listens for events from Stripe, verifies the signature,
    and processes the event accordingly.

    It specifically handles the 'checkout.session.completed' event to create an order.

    :param request:
    :return:

    @csrf_exempt: This decorator is used to exempt this view from CSRF verification.

    @author IFD
    """
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None

    # Verify the webhook signature
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        print("Invalid payload", e)
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print("Invalid signature", e)
        return HttpResponse(status=400)

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        OrderService.create_order(session)

    else:
        print(f"Unhandled event type {event['type']}")

    return HttpResponse(status=200)