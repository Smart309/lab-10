import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    // const result = rooms.map((x) =>
    //   x.messages.map((x) => ({ message: x.messageId, text: x.text }))
    // );
    // return res.json({ ok: true, result });
    const id = req.query.roomId;
    const findRoomId = rooms.findIndex((x) => x.roomId === id);
    if (findRoomId === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      return res.json({ ok: true, message: rooms[findRoomId].messages });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();

    const id = req.query.roomId;
    const findRoomId = rooms.findIndex((x) => x.roomId === id);
    if (typeof text === "string") {
      if (findRoomId === -1) {
        return res.status(404).json({ ok: false, message: "Invalid room id" });
      } else {
        const newMessage = {
          messageId: newId,
          text: text,
        };
        rooms[findRoomId].messages.push(newMessage);
        writeDB(rooms);
        return res.json({
          ok: true,
          message: newMessage,
        });
      }
    } else {
      return res.status(404).json({ ok: false, message: "Invalid text input" });
    }
  }
}
