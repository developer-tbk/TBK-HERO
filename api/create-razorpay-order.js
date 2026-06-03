import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ message: 'Invalid amount provided' });
  }

  if (!process.env.VITE_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('CRITICAL: Razorpay keys missing from environment variables');
    return res.status(500).json({
      success: false,
      message: 'Payment gateway configuration error. Please add VITE_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your Vercel Environment Variables.'
    });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    console.log('Using key:', process.env.VITE_RAZORPAY_KEY_ID);

    const options = {
      amount: parseInt(amount) * 100, // Amount in paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order: order
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Razorpay order',
      error: error.message || error.description || JSON.stringify(error)
    });
  }
}
