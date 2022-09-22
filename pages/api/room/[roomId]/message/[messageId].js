import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const rooms = readDB();
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  const findRoomId = rooms.findIndex((x) => x.roomId === roomId);

  if (findRoomId === -1) {
    return res.status(404).json({ ok: false, message: "Invalid room id" });
  } else {
    const findMesId = rooms[findRoomId].messages.findIndex(
      (x) => x.messageId === messageId
    );
    if (findMesId === -1) {
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    } else {
      rooms[findRoomId].messages.splice(findMesId, 1);
      writeDB(rooms);
      return res.json({ ok: true });
    }
  }
}
