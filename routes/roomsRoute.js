import express from "express"
import Room from "../models/booking.js"
const router = express.Router();

//@POST - /api/rooms/getroombyid - get room by ID - public
router.post("/getroombyid", async(req, res) => {
     console.log(req.body);
     try {
          const room = await Room.findOne({'_id' : req.body.roomid})
          res.send(room)
     } catch (error) {
          return res.status(400).json({ message: error });
     }
});

//@GET - /api/rooms/getallrooms - get all rooms - public
router.get("/getallrooms", async(req, res) => {
     console.log(req.body);
     try {
          const rooms = await Room.find({})
          res.send(rooms)
     } catch (error) {
          return res.status(400).json({ message: error });
     }
});

//@POST - /api/rooms/addroom - add a new room - public
router.post("/addroom", async(req, res) => {
  const { room , 
     rentperday, maxcount ,description ,phonenumber ,type ,image1 ,image2 ,image3} = req.body

     const newroom = new Room({
          name : room,
          rentperday, 
          maxcount , description , phonenumber , type , imageurls:[image1 , image2 ,image3] , currentbookings:[]
     })
     try {
          await newroom.save()
          res.send('New Room Added Successfully')
     } catch (error) {
          return res.status(400).json({ error });
     }
});


export default router