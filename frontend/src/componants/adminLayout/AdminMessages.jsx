import { useEffect, useState } from "react";
import axios from "axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://student-management-tfu3.onrender.com/admin/messages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data));
    }, [token]);

  const sendReply = async (id) => {
    await axios.put(
      `https://student-management-tfu3.onrender.com/admin/messages/${id}/reply`,
      { reply },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Messages</h3>

      {messages.map((msg) => (
        <div key={msg._id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5>{msg.fullName}</h5>
            <p>{msg.message}</p>
            <span className={`badge bg-${msg.status === "new" ? "danger" : "success"}`}>
              {msg.status}
            </span>

            {msg.status === "new" && (
              <>
                <textarea
                  className="form-control mt-3"
                  placeholder="Reply..."
                  onChange={(e) => setReply(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-primary mt-2"
                  onClick={() => sendReply(msg._id)}
                >
                  Reply
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMessages;
