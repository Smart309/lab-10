import { readDB, writeDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();

  const result = rooms.map((x) => ({
    roomId: x.roomId,
    roomName: x.roomName,
  }));

  if (req.method === "GET") {
    return res.json({ ok: true, result });
  }
}
