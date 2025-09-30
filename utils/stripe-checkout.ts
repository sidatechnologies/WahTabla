import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

const SUCCESS_URL = `${process.env.NEXT_PUBLIC_BASE_URL!}/profile`
const CANCEL_URL = `${process.env.NEXT_PUBLIC_BASE_URL!}/buy-course`

export async function createCheckoutSession(metadata: any, courseName: string, amount: number) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'cashapp', 'mobilepay'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: courseName,
            metadata: metadata,
          },
          unit_amount: amount, // price in cents
        },
        quantity: 1
      },
    ],
    mode: 'payment',
    success_url: SUCCESS_URL,
    cancel_url: CANCEL_URL,
    metadata: {
      course: metadata,
      courseName: courseName,
      amount: amount
    }
  })

  return session.url
}