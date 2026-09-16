import { useEffect, useMemo, useState } from "react";
import { destinations } from "../data/destinations";

const STORAGE_KEY = "travel-plans";

export default function Planner() {
  const [plans, setPlans] = useState([]);
  const [destinationId, setDestinationId] = useState(destinations[0].id);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setPlans(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  }, []);

  const selected = useMemo(
    () => destinations.find((item) => item.id === destinationId),
    [destinationId]
  );

  const addPlan = (e) => {
    e.preventDefault();
    if (!date) return;

    const next = [
      ...plans,
      { id: Date.now(), destinationId, date, note: note.trim() }
    ].sort((a, b) => a.date.localeCompare(b.date));

    setPlans(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setNote("");
  };

  const removePlan = (id) => {
    const next = plans.filter((plan) => plan.id !== id);
    setPlans(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div className="container py-5">
      <span className="eyebrow text-dark">ORGANIZE YOUR ADVENTURE</span>
      <h1 className="fw-bold">Trip Planner</h1>
      <p className="text-secondary mb-4">Add destinations and dates to create a simple itinerary.</p>

      <div className="row g-4">
        <div className="col-lg-5">
          <form className="content-card p-4" onSubmit={addPlan}>
            <h4 className="fw-bold mb-3">Add a trip stop</h4>

            <label className="form-label">Destination</label>
            <select className="form-select mb-3" value={destinationId} onChange={(e) => setDestinationId(e.target.value)}>
              {destinations.map((item) => <option key={item.id} value={item.id}>{item.name}, {item.country}</option>)}
            </select>

            <label className="form-label">Date</label>
            <input className="form-control mb-3" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label className="form-label">Notes</label>
            <textarea className="form-control mb-3" rows="4" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Places to visit, activities, reminders..." />

            <div className="selected-mini mb-3">
              <img src={selected.image} alt="" />
              <div><strong>{selected.name}</strong><div className="small text-secondary">{selected.country}</div></div>
            </div>

            <button className="btn btn-dark w-100" type="submit">Add to itinerary</button>
          </form>
        </div>

        <div className="col-lg-7">
          <div className="content-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">Your itinerary</h4>
              <span className="badge text-bg-light">{plans.length} stop{plans.length === 1 ? "" : "s"}</span>
            </div>

            {plans.length ? (
              <div className="timeline">
                {plans.map((plan) => {
                  const item = destinations.find((d) => d.id === plan.destinationId);
                  return (
                    <div className="timeline-item" key={plan.id}>
                      <div className="timeline-dot"></div>
                      <div className="flex-grow-1">
                        <div className="small text-secondary">{new Date(`${plan.date}T00:00:00`).toLocaleDateString()}</div>
                        <h5 className="fw-bold mb-1">{item?.name}</h5>
                        <div className="text-secondary">{plan.note || "No notes added."}</div>
                      </div>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removePlan(plan.id)} aria-label="Remove trip stop">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state text-center py-5">
                <i className="bi bi-calendar2-week display-6"></i>
                <h5 className="mt-3">Your itinerary is empty</h5>
                <p className="text-secondary mb-0">Add your first destination on the left.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}