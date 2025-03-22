const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    // Ensure required fields exist
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Order data is required." });
    }

    // Create and save the new order
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    return res.status(201).json(savedOrder); // 201 for resource creation
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    let { email } = req.params; // Get email from URL parameter

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    email = decodeURIComponent(email.trim()); // Decode special characters

    console.log("🔍 Searching orders for:", email);

    const orders = await Order.find({ email });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this email." });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error Fetching Orders:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail
};
