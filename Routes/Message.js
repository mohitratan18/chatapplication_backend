const express = require("express");
const router = express.Router();
const Message = require("../Models/Message");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ message: "INVALID ! PLEASE TRY AGAIN AFTER SOMETIME" });
  }
  try {
    const messages = await Message.find({ $or: [{ "sender._id": id },{"receiver._id":id}] });

    return res.status(200).json({messages});
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        await Message.deleteById(id);
        return res.status(202).json({"message":"Deleted Sucessfully"});
    } catch (error) {
        return res.status(400).json({"message":"unexpected error"});
    }
})

module.exports = router;
