import ItemModel from "../model/ItemModel.js";
import UserModel from "../model/UserModel.js";

export const createItem = async (req, res) => {
    const userId = req.user.userId;
    try {
      const { title, description, category } = req.body;
  
      // Find the user's name based on the logged-in user's ID
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Create the item with the associated user ID
      const data = await ItemModel.create({
        title,
        description,
        category,
        userId: userId, // Attach logged-in user's ID
      });
  
      // Respond with the creator's name and item data
      res.status(201).json({
        success: true,
        message: `Item created successfully by ${user.name}`,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};
  
export const getItem = async (req, res) => {
  const userId = req.user.id; // Logged-in user's ID
  const { title, description, category } = req.query; // Capture query parameters

  try {
      // Build the query object dynamically
      const query = { user: userId }; // Base filter: only the logged-in user's items

      // Filter by title (case-insensitive)
      if (title) {
          query.title = { $regex: title, $options: "i" };
      }

      // Filter by description (case-insensitive)
      if (description) {
          query.description = { $regex: description, $options: "i" };
      }

      // Filter by category (case-insensitive)
      if (category) {
          query.category = { $regex: category, $options: "i" };
      }

      // Fetch matching items from the database
      const data = await ItemModel.find(query).lean(); // Use `lean` for better performance

      // Handle no data found
      if (!data.length) {
          return res.status(404).json({ success: false, message: "No items found" });
      }

      // Respond with the filtered data
      res.status(200).json({
          success: true,
          message: "Items retrieved successfully",
          data,
      });
  } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
          success: false,
          message: "An error occurred while retrieving items",
          error: error.message,
      });
  }
};


export const getItemID = async (req, res) => {
    const userId = req.user.id;
    try {
      const data = await ItemModel.findById({ _id: req.params.id, user: userId }); // Fetch only user's data

      if (!data) return res.status(404).json({ message: "Item not found" });

      res.status(200).json({
        success: true,
        message: `A Item get`,
        data,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
}

export const updateItem = async (req, res) => {
    const userId = req.user.id;
    try {
      const data = await ItemModel.findOneAndUpdate(
        { _id: req.params.id, user: userId }, // Ensure user owns the data
        req.body,
        { new: true }
      );
  
      if (!data) return res.status(404).json({ message: "Item not found" });
  
      res.status(200).json({
        success: true,
        message: `Item update successfully`,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
}

export const deleteItem = async (req, res) => {
    const userId = req.user.id;
    try {
        const data = await ItemModel.findOneAndDelete({ _id: req.params.id, user: userId });
      if (!data) return res.status(404).json({ message: "Item not found" });
  
      res.status(200).json({
        success: true,
        message: `Item delete successfully`,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
}