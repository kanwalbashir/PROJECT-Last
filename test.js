const Order = require("../model/orderModel"); // adjust path

app.post("/api/orders/test", async (req, res) => {
  try {
    const userId = req.body.userId; // send userId from frontend or use a fixed one

    const newOrder = new Order({
      name: "Test User",
      phone: "03000000000",
      address: "Test Address",
      items: [
        { name: "Pizza", qty: 2, total: 500 },
        { name: "Burger", qty: 1, total: 250 }
      ],
      deliveryFee: 150,
      total: 900, // sum of items + delivery
      status: "Pending",
      userId: userId
    });

    await newOrder.save();
    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Error creating test order:", err);
    res.status(500).json({ error: err.message });
  }
});
