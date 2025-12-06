import { stripe } from '@/services/stripe';
import { Logger } from '@/utils';
import { Request, Response } from 'express';

const logger = new Logger('Stripe-Webhook');

/**
 * Handles the login process for users.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<Response>} - Express response object
 */
export async function webhook(req: Request, res: Response): Promise<Response> {
  try {
    const event = await stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Extract the object from the event.
    const dataObject = event.data.object;
    const subscription_id = dataObject['subscription'];

    if (
      dataObject['billing_reason'] === 'subscription_create' &&
      dataObject['payment_intent']
    ) {
      const payment_intent_id = dataObject['payment_intent'];

      // Retrieve the payment intent used to pay the subscription
      const payment_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );

      await stripe.paymentMethods.attach(payment_intent.payment_method, {
        customer: payment_intent.customer,
      });

      await stripe.subscriptions.update(subscription_id, {
        default_payment_method: payment_intent.payment_method,
      });

      await stripe.customers.update(payment_intent.customer, {
        invoice_settings: {
          default_payment_method: payment_intent.payment_method,
        },
      });
    }

    switch (event.type) {
      case 'invoice.paid':
        /*
            Used to provision services after the trial has ended.
            The status of the invoice will show up as paid.
            Store the status in your database to reference
            when a user accesses your service to avoid hitting
            rate limits.
          */
        logger.info(`Invoice.paid: ${dataObject.status}`)
        if (dataObject.total == 0) break;

        break;
      case 'invoice.payment_succeeded':
        /*
            Insert payment succeeded into the database
            Allowed access to your service.
          */
        logger.info(`payment_succeeded: ${dataObject.status}`);
        // No need to touch this event for now
        break;
      case 'invoice.payment_failed':
        /*
            If the payment fails or the customer does not have a
            valid payment method, an invoice.payment_failed event is sent,
            the subscription becomes past_due.
            Use this webhook to notify your user that their payment has
            failed and to retrieve new card details.
          */
        logger.info(`invoice.payment_failed: ${dataObject.status}`);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        logger.info(
          `customer.subscription.created or updated: ${dataObject.status}`
        );

        // Insert active into database and grant access to service
        break;
      case 'customer.subscription.deleted':
        break;
      case 'charge.refunded':
        break;
      default:
        // Unexpected event type
        logger.info(`Unhandled event type ${event.type}`);
    }

    return res.status(200).send({ success: true });
  } catch (err: any) {
    // On error, log and return the error message
    logger.error(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
