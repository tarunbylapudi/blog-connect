const { Kafka, Partitioners } = require("kafkajs");

// Define the Kafka broker(s) configuration
const kafka = new Kafka({
  clientId: "auth-service",
  requestTimeout: 20000,
  brokers: ["localhost:29092"], // Add your Kafka broker(s) here
});

// Create the producer instance
const producer = kafka.producer();

// Function to send messages to Kafka
const produceMessage = async (message) => {
  try {
    // Connect to the Kafka broker
    await producer.connect();

    // Send the message to the specified topic
    await producer.send({
      topic: "auth-service-topic",
      messages: [
        {
          value: message,
        },
      ],
    });

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    // Disconnect the producer
    await producer.disconnect();
  }
};

module.exports = produceMessage;
