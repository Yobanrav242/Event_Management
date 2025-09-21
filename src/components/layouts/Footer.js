import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase';

function Footer() {
  const [staffIncharge, setStaffIncharge] = useState({});
  const [studentIncharge, setStudentIncharge] = useState({});
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [feedback, setFeedback] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const staffSnapshot = await getDocs(collection(db, 'staffIncharge'));
      const studentSnapshot = await getDocs(collection(db, 'studentIncharge'));
      setStaffIncharge(staffSnapshot.docs[0]?.data());
      setStudentIncharge(studentSnapshot.docs[0]?.data());
    }
    fetchData();

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    const interval = setInterval(() => setDateTime(new Date().toLocaleString()), 60000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  async function handleFeedbackSubmit(e) {
    e.preventDefault();
    if (feedback.trim() === '' || !user) return;
    try {
      await addDoc(collection(db, 'feedbacks'), {
        uid: user.uid,
        text: feedback,
        timestamp: new Date(),
      });
      setFeedback('');
      setFeedbackStatus('Feedback submitted!');
    } catch {
      setFeedbackStatus('Error submitting feedback.');
    }
    setTimeout(() => setFeedbackStatus(''), 3000);
  }

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-3 mb-2">
            <h5>Staff Incharge</h5>
            <p>{staffIncharge.name}</p>
            <a href={`mailto:${staffIncharge.gmail}`} className="text-white">{staffIncharge.gmail}</a>
          </div>
          <div className="col-md-3 mb-2">
            <h5>Student Incharge</h5>
            <p>{studentIncharge.name}</p>
            <a href={`mailto:${studentIncharge.gmail}`} className="text-white">{studentIncharge.gmail}</a>
          </div>
          <div className="col-md-3 mb-2">
            <h5>Date & Time</h5>
            <p>{dateTime}</p>
          </div>
          <div className="col-md-3 mb-2">
            <h5>Feedback</h5>
            {!user ? (
              <p>
                <a href="/login" className="btn btn-primary btn-sm">
                  Login to send feedback
                </a>
              </p>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your feedback..."
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    maxLength={120}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Send
                </button>
                <div className="mt-2">
                  {feedbackStatus && <small>{feedbackStatus}</small>}
                </div>
                
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
